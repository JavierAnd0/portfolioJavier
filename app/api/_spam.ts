// Anti-spam checks shared by the serverless handler (api/send.ts) and the
// Vite dev middleware. The leading underscore keeps Vercel from exposing this
// file as its own endpoint.

export const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 1000,
  maxLinks: 3,
  /** A human needs at least this long to fill in the form. */
  minFillMs: 3000,
  /** Ignore timestamps older than this (stale tab or forged value). */
  maxFillMs: 24 * 60 * 60 * 1000,
  /** Sends allowed per IP within the window. */
  rateLimit: 3,
  rateWindowMs: 10 * 60 * 1000,
};

export interface SpamFields {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot: hidden from people, bots tend to fill it. Must stay empty. */
  website?: unknown;
  /** Epoch ms when the form was rendered. */
  startedAt?: unknown;
}

export type SpamVerdict =
  /** Looks like a bot: answer with a fake success so it doesn't retry. */
  | { kind: 'drop'; reason: string }
  /** A real problem the visitor can fix. */
  | { kind: 'reject'; status: number; error: string }
  | { kind: 'ok' };

const str = (v: unknown) => (typeof v === 'string' ? v : '');

// Best-effort, per-instance memory. Serverless instances are recycled, so this
// slows down floods from one IP rather than guaranteeing a hard limit.
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < LIMITS.rateWindowMs);
  if (recent.length >= LIMITS.rateLimit) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export function checkSpam(body: SpamFields, ip: string, now = Date.now()): SpamVerdict {
  if (str(body.website).trim() !== '') return { kind: 'drop', reason: 'honeypot' };

  const startedAt = Number(body.startedAt);
  const elapsed = now - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < LIMITS.minFillMs || elapsed > LIMITS.maxFillMs) {
    return { kind: 'drop', reason: `timing (${Number.isFinite(elapsed) ? elapsed : 'missing'} ms)` };
  }

  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject);
  const message = str(body.message);

  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return { kind: 'reject', status: 400, error: 'El mensaje es demasiado largo.' };
  }

  const links = (`${subject} ${message}`.match(/https?:\/\/|www\./gi) ?? []).length;
  if (links > LIMITS.maxLinks) {
    return { kind: 'reject', status: 400, error: 'El mensaje tiene demasiados enlaces.' };
  }

  if (rateLimited(ip || 'unknown', now)) {
    return {
      kind: 'reject',
      status: 429,
      error: 'Enviaste varios mensajes seguidos. Intenta de nuevo en unos minutos.',
    };
  }

  return { kind: 'ok' };
}

/** Client IP from Vercel/proxy headers, falling back to the socket. */
export function clientIp(req: { headers?: Record<string, unknown>; socket?: { remoteAddress?: string } }): string {
  const fwd = req.headers?.['x-forwarded-for'];
  const first = (Array.isArray(fwd) ? fwd[0] : typeof fwd === 'string' ? fwd : '').split(',')[0].trim();
  return first || (req.headers?.['x-real-ip'] as string) || req.socket?.remoteAddress || '';
}

// ---------------------------------------------------------------------------
// Request hardening helpers

const PROD_ORIGINS = ['https://www.javierandrade.dev', 'https://javierandrade.dev'];

/** Origins allowed to call the API: the real domain, this deployment's own URL, and any extras in ALLOWED_ORIGINS. */
export function allowedOrigins(env: Record<string, string | undefined> = process.env): string[] {
  const extra = (env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);
  const self = env.VERCEL_URL ? [`https://${env.VERCEL_URL}`] : [];
  return [...PROD_ORIGINS, ...self, ...extra];
}

/** Escapes text for HTML content and quoted attribute values. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Single-line text: no CR/LF (keeps email headers like Subject clean). */
export const oneLine = (value: unknown) => (typeof value === 'string' ? value : '').replace(/[\r\n]+/g, ' ').trim();

export const EMAIL_RE = /^[^\s@"'<>(),;:\\]+@[^\s@"'<>(),;:\\]+\.[^\s@"'<>(),;:\\]+$/;
