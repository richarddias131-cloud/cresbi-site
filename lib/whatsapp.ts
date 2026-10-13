export const WHATSAPP_NUMBER = "5511932317374";
export const WHATSAPP_DISPLAY = "+55 11 93231-7374";
export const EMAIL = "contato@cresbi.com.br";
export const INSTAGRAM_HANDLE = "@cresbi.oficial";
export const INSTAGRAM_URL = "https://instagram.com/cresbi.oficial";
export const SITE_URL = "https://cresbi.com.br";

/** Monta o link wa.me, com a mensagem já preenchida quando houver. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const messages = {
  geral: "Olá, CRESBI. Quero conversar sobre um projeto para a minha empresa.",
  iniciar: "Olá, CRESBI. Quero iniciar um projeto.",
  raioX: "Olá, CRESBI. Quero o Raio-X dos dados da minha empresa.",
  frente: (frente: string) => `Olá, CRESBI. Quero saber mais sobre ${frente}.`,
};

export type LeadForm = { nome: string; whatsapp: string; frente: string; mensagem: string };

/** Mensagem do formulário da chamada final. */
export function leadMessage({ nome, whatsapp, frente, mensagem }: LeadForm): string {
  const interesse =
    frente === "Ainda não sei"
      ? "Ainda não sei qual frente faz mais sentido."
      : `Tenho interesse em ${frente}.`;
  const resolver = mensagem.trim().replace(/[.\s]+$/, "");
  return `Olá, CRESBI. Sou ${nome.trim()}. ${interesse} Preciso resolver: ${resolver}. Meu WhatsApp: ${whatsapp.trim()}.`;
}
