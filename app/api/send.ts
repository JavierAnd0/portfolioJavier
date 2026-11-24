import { Resend } from 'resend';
import { allowedOrigins, checkSpam, clientIp, EMAIL_RE, escapeHtml, oneLine } from './_spam';

export const config = {
  runtime: 'nodejs',
};

export interface ContactRequestBody {
  name: string;
  email: string;
  category?: string;
  subject?: string;
  message: string;
}

export function generateCallingCardHtml({
  name,
  email,
  category,
  subject,
  message,
}: ContactRequestBody): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCategory = escapeHtml(category);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud de Cooperación</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #0e0e11; border: 2px solid #e60012; box-shadow: 8px 8px 0px #e60012; border-radius: 2px; overflow: hidden;">
    
    <!-- Red Header Band with Caution Motif -->
    <div style="background: linear-gradient(135deg, #e60012 0%, #ba000e 100%); padding: 20px 24px; border-bottom: 3px solid #000000;">
      <div style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 10px; font-weight: 800; padding: 4px 10px; letter-spacing: 2px; text-transform: uppercase; font-family: monospace;">
        ★ PHANTOM THIEVES CALLING CARD
      </div>
      <h1 style="color: #ffffff; margin: 12px 0 2px 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; font-weight: 900;">
        Nueva Solicitud de Cooperación
      </h1>
      <div style="color: rgba(255,255,255,0.85); font-size: 12px; font-family: monospace; letter-spacing: 1px;">
        PROTOCOLO METAVERSO // FRECUENCIA 140.85
      </div>
    </div>

    <!-- Body Information -->
    <div style="padding: 24px;">
      <p style="color: #cccccc; font-size: 14px; margin-top: 0; margin-bottom: 20px; line-height: 1.5;">
        Has recibido un nuevo aviso de misión desde el formulario interactivo de tu portfolio.
      </p>

      <!-- Data Table Card -->
      <div style="background-color: #141418; border: 1px solid #27272e; border-left: 4px solid #e60012; padding: 18px 20px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #e60012; font-family: monospace; font-size: 11px; font-weight: bold; width: 140px; text-transform: uppercase; letter-spacing: 1px;">
              Remitente / Alias:
            </td>
            <td style="padding: 6px 0; color: #ffffff; font-weight: 700; font-size: 15px;">
              ${safeName}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #e60012; font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
              Frecuencia / Email:
            </td>
            <td style="padding: 6px 0;">
              <a href="mailto:${safeEmail}" style="color: #ff3344; font-weight: 600; text-decoration: underline;">
                ${safeEmail}
              </a>
            </td>
          </tr>
          ${safeCategory ? `
          <tr>
            <td style="padding: 6px 0; color: #e60012; font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
              Tipo de Contrato:
            </td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; background-color: rgba(230,0,18,0.2); color: #ffffff; border: 1px solid #e60012; padding: 3px 10px; font-weight: 700; font-size: 12px; font-family: monospace; text-transform: uppercase;">
                ${safeCategory}
              </span>
            </td>
          </tr>` : ''}
          ${safeSubject ? `
          <tr>
            <td style="padding: 6px 0; color: #e60012; font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
              Objetivo / Asunto:
            </td>
            <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">
              ${safeSubject}
            </td>
          </tr>` : ''}
        </table>
      </div>

      <!-- Message Details Section -->
      <div style="margin-bottom: 24px;">
        <div style="color: #e60012; font-family: monospace; font-size: 11px; font-weight: bold; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
          [ BRIEFING DE LA MISIÓN / MENSAJE ]
        </div>
        <div style="background-color: #070708; border: 1px solid #222226; border-left: 3px solid #ffffff; padding: 18px; color: #f0f0f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${safeMessage}
        </div>
      </div>

      <!-- Action Button -->
      <div style="text-align: center; margin: 30px 0 10px 0;">
        <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(safeSubject || 'Solicitud de Cooperación - Portfolio')}" style="display: inline-block; background-color: #e60012; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; padding: 14px 28px; box-shadow: 4px 4px 0px #ffffff;">
          RESPONDER AL REMITENTE DIRECTAMENTE
        </a>
      </div>
    </div>

    <!-- Card Footer -->
    <div style="background-color: #070709; border-top: 1px solid #1c1c22; padding: 14px 24px; text-align: center;">
      <p style="margin: 0; color: #666670; font-size: 11px; font-family: monospace; letter-spacing: 0.5px;">
        Transmisión procesada mediante Resend · Portfolio Javier Andrade
      </p>
    </div>
  </div>
</body>
</html>`;
}

// Serverless Handler (Vercel / Node)
export default async function handler(req: any, res: any) {
  // Only this site may call the API. Browsers always send Origin on POST, so a
  // missing or foreign Origin means another site or a script.
  const origin = typeof req.headers?.origin === 'string' ? req.headers.origin : '';
  const originOk = allowedOrigins().includes(origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Cache-Control', 'no-store');
  if (originOk) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    return res.status(originOk ? 204 : 403).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
  }

  if (!originOk) {
    return res.status(403).json({ error: 'Origen no permitido.' });
  }

  if (!String(req.headers?.['content-type'] || '').includes('application/json')) {
    return res.status(415).json({ error: 'Formato no soportado. Envía JSON.' });
  }

  try {
    const raw = req.body && typeof req.body === 'object' ? req.body : {};
    const name = oneLine(raw.name);
    const email = oneLine(raw.email);
    const subject = oneLine(raw.subject);
    const category = oneLine(raw.category);
    const message = typeof raw.message === 'string' ? raw.message : '';

    if (!name || !email || !message.trim()) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios: nombre, correo y mensaje son requeridos.',
      });
    }

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({
        error: 'El formato de correo electrónico no es válido.',
      });
    }

    const verdict = checkSpam(raw, clientIp(req));
    if (verdict.kind === 'drop') {
      console.warn(`[Spam] Mensaje descartado: ${verdict.reason}`);
      return res.status(200).json({ success: true });
    }
    if (verdict.kind === 'reject') {
      return res.status(verdict.status).json({ error: verdict.error });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESEND_TO_EMAIL || 'logijavier@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    // Without a key nothing can be delivered: fail loudly so visitors don't
    // think their message was sent. (Local dev simulation lives in vite.config.ts.)
    if (!apiKey || apiKey.includes('your_api_key_here')) {
      console.error('[Resend Serverless] RESEND_API_KEY no está configurada; no se envió el mensaje.');
      return res.status(503).json({
        error: 'El servicio de mensajes no está disponible en este momento.',
        code: 'not_configured',
      });
    }

    const resend = new Resend(apiKey);
    const emailSubject = subject?.trim()
      ? `[Portfolio] ${category ? `[${category}] ` : ''}${subject}`
      : `[Portfolio] Solicitud de ${name} ${category ? `(${category})` : ''}`;

    const html = generateCallingCardHtml({ name, email, category, subject, message });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      html,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return res.status(502).json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error: any) {
    console.error('[Handler Error]', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
