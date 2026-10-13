// Textos da página. Para trocar a copy, edite aqui; as seções só leem estes dados.

export type Frente = {
  id: string;
  index: string;
  nav: string;
  title: string;
  body: string;
  items: string[];
};

// As quatro frentes da CRESBI, sempre nesta ordem.
export const frentes: Frente[] = [
  {
    id: "sistemas",
    index: "01",
    nav: "sistemas",
    title: "Sistemas sob medida",
    body: "Sistemas internos feitos para o processo de cada empresa, do pedido ao relatório.",
    items: ["Gestão de pedidos e estoque", "Portal do cliente e painel administrativo", "Cresbi Analyzer, analisador de vendas"],
  },
  {
    id: "presenca",
    index: "02",
    nav: "presença",
    title: "Presença digital",
    body: "Site, Google e Instagram trabalhando juntos para a sua empresa ser encontrada e bem apresentada.",
    items: ["Sites e landing pages", "Perfil no Google Meu Negócio", "Instagram e identidade visual"],
  },
  {
    id: "automacoes",
    index: "03",
    nav: "automações",
    title: "Automações",
    body: "Tarefas repetitivas rodando sozinhas, com as ferramentas da empresa conversando entre si.",
    items: ["Relatórios enviados no horário", "Integração entre sistemas e planilhas", "Rotinas no WhatsApp"],
  },
  {
    id: "ia",
    index: "04",
    nav: "ia",
    title: "Implementação de IA",
    body: "IA aplicada a processos reais do negócio, com a equipe treinada para usar no dia a dia.",
    items: ["Mapeamento de onde a IA ajuda", "Assistentes para atendimento e rotinas", "Treinamento da equipe"],
  },
];

export const heroConsole = [
  { name: "sistema_pedidos", status: "online" },
  { name: "site_institucional", status: "publicado" },
  { name: "perfil_google", status: "otimizado" },
  { name: "rotina_relatorios", status: "automatizada" },
  { name: "assistente_ia", status: "em_treinamento", wait: true },
];

export const heroStack = ["python", "sql", "supabase", "whatsapp", "google", "ia"];

export const ticker = [
  "sistemas_sob_medida",
  "presença_digital",
  "sites",
  "google_meu_negócio",
  "instagram",
  "automações",
  "integrações",
  "implementação_de_ia",
  "treinamento_de_equipe",
];

export const fluxo = [
  { system: "whatsapp", event: "pedido_recebido", log: "pedido recebido" },
  { system: "sistema", event: "baixa_no_estoque", log: "estoque atualizado" },
  { system: "planilha", event: "venda_registrada", log: "venda registrada" },
  { system: "relatório", event: "enviado_às_08h", log: "relatório enviado" },
];

// Frente 04: exemplos de uso de IA em processos do dia a dia.
export const usosIa = [
  {
    label: "atendimento",
    title: "Atendimento no WhatsApp",
    body: "Respostas a perguntas frequentes dos clientes, com a equipe assumindo a conversa quando for preciso.",
  },
  {
    label: "documentos",
    title: "Pedidos, notas e e-mails",
    body: "Leitura de documentos que chegam todo dia para preencher planilhas e sistemas sem digitação manual.",
  },
  {
    label: "conteúdo",
    title: "Textos para revisar",
    body: "Rascunhos de posts, descrições de produtos e respostas a avaliações, sempre revisados pela equipe.",
  },
  {
    label: "rotinas_internas",
    title: "Consultas e resumos",
    body: "Resumos de reuniões e relatórios, e respostas a partir das informações da própria empresa.",
  },
];

export const processo = [
  {
    step: "step_01",
    title: "Diagnóstico",
    body: "Entendemos seu processo, seus números e onde a tecnologia gera retorno.",
  },
  {
    step: "step_02",
    title: "Desenho",
    body: "Você aprova a solução e o escopo antes de qualquer linha de código.",
  },
  {
    step: "step_03",
    title: "Construção por etapas",
    body: "Entregamos em partes, para você acompanhar e validar cada uma.",
  },
  {
    step: "step_04",
    title: "Entrega com treinamento",
    body: "A solução vai para o ar documentada, e a equipe aprende a usar.",
  },
  {
    step: "step_05",
    title: "Acompanhamento",
    body: "Seguimos junto depois da entrega, ajustando e melhorando com o uso.",
  },
];

export const diferenciais = [
  {
    index: "01",
    title: "Feito para o seu processo",
    body: "Nada de pacote pronto: cada solução nasce do jeito que sua empresa já trabalha.",
  },
  {
    index: "02",
    title: "Um único ponto de contato",
    body: "Sistemas, site, Google, automações e IA com a mesma equipe.",
  },
  {
    index: "03",
    title: "Entrega com treinamento",
    body: "Você recebe a solução funcionando, documentada e com a equipe sabendo usar.",
  },
  {
    index: "04",
    title: "Visão de negócio",
    body: "Pensamos em vendas, margem e tempo, não só em código.",
  },
];

export type Projeto = {
  /** Frente da CRESBI, com o índice. */
  frente: string;
  cliente: string;
  /** Cidade do cliente, quando houver. */
  local?: string;
  /** Endereço exibido na barra da "janela". */
  url: string;
  /** Link do projeto (sites externos abrem em nova aba). */
  link: string;
  resultado: string;
  /** Prints em public/projetos/, sem barra inicial. */
  imagem: string;
  imagemMobile: string;
};

export const projetos: Projeto[] = [
  {
    frente: "02 Presença digital",
    cliente: "Ótica Noblesse",
    local: "Uberlândia/MG",
    url: "oticanoblesse.com.br",
    link: "https://oticanoblesse.com.br",
    resultado: "Site da ótica com agendamento de exame de vista pelo WhatsApp.",
    imagem: "projetos/otica-noblesse.jpg",
    imagemMobile: "projetos/otica-noblesse-mobile.jpg",
  },
  {
    frente: "02 Presença digital",
    cliente: "B&A Sign",
    local: "Extrema/MG",
    url: "richarddias131-cloud.github.io/b-a-site",
    link: "https://richarddias131-cloud.github.io/b-a-site/",
    resultado: "Site da gráfica com os materiais e o pedido de orçamento pelo WhatsApp.",
    imagem: "projetos/ba-sign.jpg",
    imagemMobile: "projetos/ba-sign-mobile.jpg",
  },
  {
    frente: "01 Sistemas sob medida",
    cliente: "Cresbi Analyzer",
    url: "cresbi.com.br/analyzer",
    link: "analyzer/",
    resultado: "Analisador de vendas que aponta clientes em risco e oportunidades de recompra a partir da base da empresa.",
    imagem: "projetos/cresbi-analyzer.jpg",
    imagemMobile: "projetos/cresbi-analyzer-mobile.jpg",
  },
];

export const faq = [
  {
    q: "Quanto custa um projeto?",
    a: "Cada projeto é sob medida. Depois do diagnóstico, você recebe uma proposta com escopo, prazo e investimento fechados.",
  },
  {
    q: "Quanto tempo leva?",
    a: "Sites e landing pages costumam levar de [X] a [Y] semanas; sistemas, automações e projetos de IA dependem do escopo, sempre com prazo definido na proposta.",
  },
  {
    q: "Como funciona a implementação de IA?",
    a: "Começamos pelo diagnóstico dos processos, escolhemos onde a IA faz sentido e implementamos por etapas. A equipe é treinada para usar, e você aprova cada etapa antes de seguir.",
  },
  {
    q: "Vocês atendem empresas pequenas?",
    a: "Sim. A CRESBI nasceu para pequenas e médias empresas que querem crescer com tecnologia.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Não. Você fala do seu negócio; nós traduzimos em solução e treinamos a equipe para usar.",
  },
  {
    q: "E depois da entrega?",
    a: "Seguimos acompanhando o uso, com ajustes e melhorias para a solução evoluir junto com a empresa.",
  },
];
