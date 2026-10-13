// Textos da página. Para trocar a copy, edite aqui; as seções só leem estes dados.

export type Frente = {
  id: string;
  index: string;
  nav: string;
  title: string;
  body: string;
  items: string[];
};

export const frentes: Frente[] = [
  {
    id: "sistemas",
    index: "01",
    nav: "sistemas",
    title: "Sistemas sob medida",
    body: "Sistemas internos e portais desenhados para o jeito que a sua empresa trabalha.",
    items: ["Gestão de pedidos e estoque", "Portal do cliente", "Painel administrativo"],
  },
  {
    id: "sites",
    index: "02",
    nav: "sites",
    title: "Sites",
    body: "Sites rápidos, bonitos e feitos para transformar visita em contato.",
    items: ["Site institucional", "Landing page de campanha", "Cardápio e catálogo online"],
  },
  {
    id: "presenca",
    index: "03",
    nav: "presença",
    title: "Presença digital",
    body: "Sua empresa encontrada, bem avaliada e reconhecida no Google e no Instagram.",
    items: ["Perfil no Google otimizado", "Identidade visual", "Gestão de avaliações"],
  },
  {
    id: "dados",
    index: "04",
    nav: "dados",
    title: "Dados e BI",
    body: "Dashboards e indicadores que mostram onde está o dinheiro e o que fazer a seguir.",
    items: ["Dashboards de vendas", "Indicadores e metas", "Cresbi Analyzer"],
  },
  {
    id: "automacoes",
    index: "05",
    nav: "automações",
    title: "Automações",
    body: "Rotinas que rodam sozinhas, no horário certo, sem ninguém precisar lembrar.",
    items: ["Relatórios automáticos", "Integração entre sistemas", "Robôs para tarefas repetitivas"],
  },
];

export const heroConsole = [
  { name: "sistema_pedidos", status: "online" },
  { name: "site_institucional", status: "publicado" },
  { name: "perfil_google", status: "otimizado" },
  { name: "rotina_relatorios", status: "automatizada" },
  { name: "dashboard_vendas", status: "processando", wait: true },
];

export const heroStack = ["python", "sql", "supabase", "power_bi", "ia"];

export const ticker = [
  "sistemas_sob_medida",
  "sites",
  "presença_digital",
  "dados_e_bi",
  "automações",
  "integrações",
  "dashboards",
  "relatórios_automáticos",
];

export const fluxo = [
  { system: "whatsapp", event: "pedido_recebido", log: "pedido recebido" },
  { system: "sistema", event: "baixa_no_estoque", log: "estoque atualizado" },
  { system: "planilha", event: "venda_registrada", log: "venda registrada" },
  { system: "relatório", event: "enviado_às_08h", log: "relatório enviado" },
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
    title: "Construção",
    body: "Desenvolvemos, testamos e entregamos documentado.",
  },
  {
    step: "step_04",
    title: "Evolução",
    body: "Acompanhamos o uso e melhoramos com base nos dados.",
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
    body: "Sistema, site, Google, dados e automações com a mesma equipe.",
  },
  {
    index: "03",
    title: "Entrega documentada",
    body: "Você recebe a solução funcionando e o mapa de como ela funciona.",
  },
  {
    index: "04",
    title: "Visão de negócio",
    body: "Pensamos em vendas, margem e tempo, não só em código.",
  },
];

export type Projeto = {
  frente: string;
  cliente: string;
  /** Endereço exibido na barra da "janela". */
  url: string;
  /** Link do projeto (abre em nova aba). */
  link: string;
  resultado: string;
  /** Print em public/projetos/, sem barra inicial, ex.: "projetos/cliente.jpg". */
  imagem?: string;
};

export const projetos: Projeto[] = [
  {
    frente: "Sites",
    cliente: "Ótica Noblesse",
    url: "oticanoblesse.com.br",
    link: "https://oticanoblesse.com.br",
    resultado: "Site da ótica com agendamento de exame de vista pelo WhatsApp.",
    imagem: "projetos/otica-noblesse.jpg",
  },
  {
    frente: "Sites",
    cliente: "B&A Sign",
    url: "richarddias131-cloud.github.io/b-a-site",
    link: "https://richarddias131-cloud.github.io/b-a-site/",
    resultado: "Site da gráfica com os materiais e o pedido de orçamento pelo WhatsApp.",
    imagem: "projetos/ba-sign.jpg",
  },
  {
    frente: "Dados e BI",
    cliente: "Cresbi Analyzer",
    url: "cresbi.com.br/analyzer",
    link: "analyzer/",
    resultado: "Diagnóstico comercial feito a partir da base de vendas da empresa.",
    imagem: "projetos/cresbi-analyzer.jpg",
  },
];

export const faq = [
  {
    q: "Quanto custa um projeto?",
    a: "Cada projeto é sob medida. Depois do diagnóstico, você recebe uma proposta com escopo, prazo e investimento fechados.",
  },
  {
    q: "Quanto tempo leva?",
    a: "Sites e landing pages costumam levar de [X] a [Y] semanas; sistemas e automações dependem do escopo, sempre com prazo definido na proposta.",
  },
  {
    q: "Vocês atendem empresas pequenas?",
    a: "Sim. A CRESBI nasceu para pequenas e médias empresas que querem crescer com tecnologia.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Não. Você fala do seu negócio; nós traduzimos em solução.",
  },
  {
    q: "E depois da entrega?",
    a: "Oferecemos acompanhamento e evolução contínua para a solução crescer junto com a empresa.",
  },
];
