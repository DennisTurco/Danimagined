import emailjs from "@emailjs/browser";

// Chiavi di EmailJS (dashboard.emailjs.com): sono pubbliche per design, il limite agli abusi
// si imposta dalla dashboard (domini consentiti, rate limit).
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const isEmailjsConfigured = Boolean(serviceId && templateId && publicKey);

// Parametri usati nel template EmailJS: {{subject}}, {{name}}, {{email}}, {{message}}.
export type EmailParams = {
  subject: string;
  name: string;
  email: string;
  message: string;
};

export function sendEmail(params: EmailParams) {
  if (!isEmailjsConfigured) throw new Error("EmailJS non configurato");
  return emailjs.send(serviceId!, templateId!, params, { publicKey: publicKey! });
}
