export const WHATSAPP_NUMBER = "5511932317374";
export const WHATSAPP_DISPLAY = "+55 11 93231-7374";
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
  conversa: "Olá, CRESBI. Gostaria de agendar uma conversa sobre o meu negócio.",
  iniciar: "Olá, CRESBI. Quero iniciar um projeto.",
  raioX: "Olá, CRESBI. Quero o Raio-X dos dados da minha empresa.",
  frente: (frente: string) => `Olá, CRESBI. Quero saber mais sobre ${frente}.`,
  naoSei: "Olá, CRESBI. Quero conversar sobre o meu negócio e entender qual solução faz sentido.",
};
