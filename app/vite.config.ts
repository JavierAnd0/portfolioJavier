import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import type { Plugin } from "vite"
import { Resend } from "resend"
import { checkSpam, clientIp, escapeHtml } from "./api/_spam"

function resendDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'resend-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if ((req.url === '/api/send' || req.url === '/api/contact') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { name, email, subject, message, category } = data;

              if (!name?.trim() || !email?.trim() || !message?.trim()) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: 'Faltan campos obligatorios: nombre, correo y mensaje son requeridos.',
                  })
                );
                return;
              }

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: 'El formato de correo electrónico no es válido.',
                  })
                );
                return;
              }

              const verdict = checkSpam(data, clientIp(req));
              if (verdict.kind !== 'ok') {
                console.log('\x1b[33m%s\x1b[0m', `🛡  [Spam] ${verdict.kind === 'drop' ? `descartado: ${verdict.reason}` : verdict.error}`);
                res.statusCode = verdict.kind === 'drop' ? 200 : verdict.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(verdict.kind === 'drop' ? { success: true } : { error: verdict.error }));
                return;
              }

              const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
              const toEmail = env.RESEND_TO_EMAIL || process.env.RESEND_TO_EMAIL || 'logijavier@gmail.com';
              const fromEmail = env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

              // Simulation mode if no valid API key is present
              if (!apiKey || apiKey.includes('your_api_key_here') || apiKey.trim() === '') {
                console.log(
                  '\x1b[33m%s\x1b[0m',
                  '⚡ [Resend Dev Server] Simulación exitosa: RESEND_API_KEY no configurada aún en .env.'
                );
                console.log('   Payload:', { name, email, category, subject, messageLength: message.length });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    simulated: true,
                    message:
                      '¡Solicitud recibida con éxito en modo simulación! Para enviar correos reales, añade tu RESEND_API_KEY en app/.env.',
                  })
                );
                return;
              }

              const resend = new Resend(apiKey);
              const emailSubject = subject?.trim()
                ? `[Portfolio P5] ${category ? `[${category}] ` : ''}${subject}`
                : `[Portfolio P5] Solicitud de ${name} ${category ? `(${category})` : ''}`;

              const safeName = escapeHtml(name);
              const safeEmail = escapeHtml(email);
              const safeCategory = escapeHtml(category);
              const safeSubject = escapeHtml(subject);
              const safeMessage = escapeHtml(message);

              const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nueva Solicitud de Cooperación</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #0e0e11; border: 2px solid #e60012; box-shadow: 8px 8px 0px #e60012; border-radius: 2px; overflow: hidden;">
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
    <div style="padding: 24px;">
      <p style="color: #cccccc; font-size: 14px; margin-top: 0; margin-bottom: 20px; line-height: 1.5;">
        Has recibido un nuevo aviso de misión desde el formulario interactivo de tu portfolio.
      </p>
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
      <div style="margin-bottom: 24px;">
        <div style="color: #e60012; font-family: monospace; font-size: 11px; font-weight: bold; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
          [ BRIEFING DE LA MISIÓN / MENSAJE ]
        </div>
        <div style="background-color: #070708; border: 1px solid #222226; border-left: 3px solid #ffffff; padding: 18px; color: #f0f0f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${safeMessage}
        </div>
      </div>
      <div style="text-align: center; margin: 30px 0 10px 0;">
        <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(safeSubject || 'Solicitud de Cooperación - Portfolio')}" style="display: inline-block; background-color: #e60012; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; padding: 14px 28px; box-shadow: 4px 4px 0px #ffffff;">
          RESPONDER AL REMITENTE DIRECTAMENTE
        </a>
      </div>
    </div>
    <div style="background-color: #070709; border-top: 1px solid #1c1c22; padding: 14px 24px; text-align: center;">
      <p style="margin: 0; color: #666670; font-size: 11px; font-family: monospace; letter-spacing: 0.5px;">
        Transmisión procesada mediante Resend · Portfolio Javier Andrade
      </p>
    </div>
  </div>
</body>
</html>`;

              const { data: resendData, error: resendError } = await resend.emails.send({
                from: fromEmail,
                to: [toEmail],
                replyTo: email,
                subject: emailSubject,
                html,
              });

              if (resendError) {
                console.error('\x1b[31m%s\x1b[0m', `[Resend Error] ${resendError.message}`);
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: resendError.message || 'Error al enviar correo con Resend.' }));
                return;
              }

              console.log(
                '\x1b[32m%s\x1b[0m',
                `✓ [Resend Dev] Correo enviado exitosamente a ${toEmail} con ID: ${resendData?.id}`
              );
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, id: resendData?.id }));
            } catch (err: any) {
              console.error('[Resend Middleware Error]', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Error interno del servidor.' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [react(), resendDevPlugin(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
