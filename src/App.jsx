import {
  ArrowRight,
  ArrowUpRight,
  ArrowsLeftRight,
  Binoculars,
  Brain,
  CheckCircle,
  Code,
  DownloadSimple,
  Eye,
  GithubLogo,
  HardDrive,
  LinuxLogo,
  LockKey,
  Lightning,
  PlayCircle,
  ShieldCheck,
  TerminalWindow,
} from "@phosphor-icons/react";
import { WorkflowDemo } from "./WorkflowDemo";
import "./workflow-demo.css";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const GITHUB_REPO = "https://github.com/Teolfeu/korda";
const DOWNLOAD_URL = "https://github.com/Teolfeu/korda/releases/download/v0.1.0/Korda-0.1.0-x86_64.AppImage";

const roles = [
  { name: "Orquestrador", tone: "blue", Icon: Brain, text: "Entende o objetivo, organiza o plano e coordena os agentes conectados." },
  { name: "Executor", tone: "orange", Icon: Lightning, text: "Executa tarefas no terminal e devolve evidências do trabalho." },
  { name: "Revisor", tone: "green", Icon: ShieldCheck, text: "Valida resultados, aponta problemas e solicita correções." },
  { name: "Pesquisador", tone: "cyan", Icon: Binoculars, text: "Pesquisa, cruza fontes e retorna evidências verificáveis." },
];

const steps = [
  ["01", "Abra o projeto", "Escolha a pasta de trabalho que os agentes poderão acessar."],
  ["02", "Monte o time", "Adicione os agentes, atribua papéis e conecte as cordas."],
  ["03", "Dê o objetivo", "Converse com o Orquestrador e acompanhe a delegação no canvas."],
  ["04", "Valide a entrega", "Veja respostas, revisão e evidências antes de concluir."],
];

const gallery = [
  {
    number: "01",
    eyebrow: "Canvas operacional",
    title: "O time inteiro cabe no mesmo plano.",
    text: "Organize agentes, terminais, notas e navegador sem esconder o que cada processo está fazendo.",
    image: "korda-canvas-real.webp",
    alt: "Canvas real do Korda com agentes e terminais organizados visualmente",
    className: "gallery-card--wide",
    tags: ["Blocos redimensionáveis", "Conexões visíveis"],
  },
  {
    number: "02",
    eyebrow: "Workspace e navegador",
    title: "Código e resultado, lado a lado.",
    text: "Abra arquivos do projeto, edite o conteúdo e mantenha a aplicação visível enquanto os agentes trabalham.",
    image: "korda-browser-real.webp",
    alt: "Workspace e navegador abertos dentro do Korda",
    tags: ["Arquivos ao vivo", "Browser no canvas"],
  },
  {
    number: "03",
    eyebrow: "Telemetria local",
    title: "Atividade com fonte identificada.",
    text: "Acompanhe sessões e progresso observados localmente. Uso e custo aparecem quando a CLI fornece dados verificáveis.",
    image: "korda-metrics-real.webp",
    alt: "Painel de métricas e atividade local do Korda",
    tags: ["Uso observado", "Sem números inventados"],
  },
];

function Brand({ inverse = false }) {
  return <span className={`brand${inverse ? " brand--inverse" : ""}`}><img src={asset("korda-mark.png")} alt="" width="40" height="40" /><b>Korda</b></span>;
}

function ProductImage({ src, alt, priority = false }) {
  return <img
    src={asset(src)}
    alt={alt}
    width="1440"
    height="900"
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding={priority ? "sync" : "async"}
  />;
}

export function App() {
  return <div className="site-shell">
    <a className="skip-link" href="#top">Pular para o conteúdo</a>

    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="Korda — início"><Brand /></a>
      <nav className="site-header__nav" aria-label="Navegação principal">
        <a href="#produto">Produto</a>
        <a href="#video">Vídeo</a>
        <a href="#demonstracao">Demonstração</a>
        <a href="#recursos">Recursos</a>
        <a href="#local-first">Local-first</a>
      </nav>
      <div className="site-header__actions">
        <a className="header-github" href={GITHUB_REPO} target="_blank" rel="noreferrer"><GithubLogo size={17} aria-hidden="true" /><span>GitHub</span></a>
        <a className="button button--small" href={DOWNLOAD_URL}><DownloadSimple size={16} aria-hidden="true" /><span>Baixar</span></a>
      </div>
    </header>

    <main id="top">
      <section className="hero grid-surface" id="produto">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__copy">
          <p className="eyebrow"><span aria-hidden="true" />Workspace visual para agentes de terminal</p>
          <h1>Agentes que trabalham <em>juntos, à vista.</em></h1>
          <p className="hero__lead">Abra seu projeto, conecte agentes por função e acompanhe delegação, execução e revisão em um canvas local — com terminais reais.</p>
          <div className="hero__actions">
            <a className="button" href={DOWNLOAD_URL}><DownloadSimple size={18} aria-hidden="true" />Baixar Korda para Linux</a>
            <a className="button button--ghost" href="#video"><PlayCircle size={18} aria-hidden="true" />Assistir ao vídeo</a>
          </div>
          <div className="hero__meta" aria-label="Características principais">
            <span><HardDrive size={15} aria-hidden="true" /><b>Local-first</b><small>Seu projeto na sua máquina</small></span>
            <span><TerminalWindow size={15} aria-hidden="true" /><b>PTY real</b><small>CLIs que você já usa</small></span>
            <span><Code size={15} aria-hidden="true" /><b>Código aberto</b><small>Inspecione e contribua</small></span>
          </div>
        </div>

        <div className="hero__visual" aria-label="Captura real do Korda em funcionamento">
          <figure className="app-window app-window--hero">
            <div className="app-window__bar" aria-hidden="true">
              <span className="window-dots"><i /><i /><i /></span>
              <span className="app-window__title"><img src={asset("korda-mark.png")} alt="" width="18" height="18" />workspace / projeto local</span>
              <span className="live-status"><i />Broker ativo</span>
            </div>
            <div className="app-window__image"><ProductImage src="korda-canvas-real.webp" alt="Interface real do Korda mostrando um time de agentes conectado no canvas" priority /></div>
          </figure>
          <div className="hero-callout hero-callout--top"><span><Brain size={18} weight="duotone" aria-hidden="true" /></span><div><small>Orquestrador</small><b>Delegando trabalho</b></div><i /></div>
          <div className="hero-callout hero-callout--bottom"><span><ArrowsLeftRight size={18} aria-hidden="true" /></span><div><small>Cordas ativas</small><b>Contexto autorizado</b></div></div>
          <p className="hero__caption"><span>Canvas real do produto</span><b>Agentes, arquivos e browser no mesmo workspace</b></p>
        </div>
      </section>

      <aside className="signal-bar" aria-label="Compatibilidade e princípios do Korda">
        <span><LinuxLogo size={17} aria-hidden="true" />Linux x86_64</span>
        <i aria-hidden="true" />
        <span><LockKey size={17} aria-hidden="true" />Runtime local</span>
        <i aria-hidden="true" />
        <span><GithubLogo size={17} aria-hidden="true" />Open source</span>
        <p>AppImage · v0.1.0</p>
      </aside>

      <section className="video-section" id="video" aria-labelledby="video-title">
        <div className="section-heading section-heading--video">
          <div><p className="eyebrow"><span aria-hidden="true" />Veja o Korda em ação</p><h2 id="video-title">Do objetivo à entrega, <em>sem perder o fio.</em></h2></div>
          <p>Uma visão rápida de como papéis, cordas, terminais e workspace se tornam um fluxo de trabalho legível.</p>
        </div>
        <div className="video-stage">
          <div className="video-stage__chrome" aria-hidden="true">
            <span><img src={asset("korda-mark.png")} alt="" width="20" height="20" />Korda / demonstração</span>
            <span>00:45 · tour visual</span>
          </div>
          <video
            className="product-video"
            controls
            playsInline
            preload="metadata"
            poster={asset("korda-promo-poster.webp")}
            width="1920"
            height="1080"
            aria-label="Vídeo demonstrativo do Korda organizando agentes em um canvas"
            aria-describedby="video-description"
          >
            <source src={asset("korda-promo.mp4")} type="video/mp4" />
            Seu navegador não consegue reproduzir este vídeo. <a href={asset("korda-promo.mp4")}>Abra o arquivo diretamente.</a>
          </video>
        </div>
        <div className="video-notes" id="video-description">
          <span><b>01</b><small>Monte o time</small>Escolha as CLIs e defina os papéis.</span>
          <span><b>02</b><small>Conecte o contexto</small>Cordas autorizam o fluxo entre agentes.</span>
          <span><b>03</b><small>Acompanhe o trabalho</small>Pedidos e respostas aparecem no canvas.</span>
        </div>
      </section>

      <section className="roles section-pad grid-surface" id="equipe">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow"><span aria-hidden="true" />Papéis claros</p><h2>Cada agente sabe <em>o que precisa fazer.</em></h2></div>
          <p>Você monta o time visualmente. O Orquestrador distribui o objetivo entre os especialistas conectados, acompanha as respostas e consolida a entrega.</p>
        </div>
        <div className="roles__grid">
          {roles.map(({ Icon, ...role }, index) => <article className={`role-card role-card--${role.tone}`} key={role.name}>
            <header><span>0{index + 1}</span><Icon size={26} weight="duotone" aria-hidden="true" /></header>
            <h3>{role.name}</h3><p>{role.text}</p>
            <footer><i aria-hidden="true" />Papel definido</footer>
          </article>)}
        </div>
        <div className="roles__rail" aria-hidden="true"><span /><i /><i /><i /><i /></div>
      </section>

      <WorkflowDemo />

      <section className="gallery" id="recursos" aria-labelledby="gallery-title">
        <div className="section-heading section-heading--gallery">
          <div><p className="eyebrow"><span aria-hidden="true" />Produto, sem mockup</p><h2 id="gallery-title">O Korda por dentro.</h2></div>
          <p>Capturas reais da aplicação: canvas amplo, ferramentas de trabalho e telemetria local com a mesma linguagem visual.</p>
        </div>
        <div className="gallery__grid">
          {gallery.map((item) => <article className={`gallery-card ${item.className || ""}`} key={item.number}>
            <div className="gallery-card__copy">
              <span className="gallery-card__number">{item.number}</span>
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <ul>{item.tags.map((tag) => <li key={tag}><CheckCircle size={15} weight="fill" aria-hidden="true" />{tag}</li>)}</ul>
            </div>
            <figure className="gallery-card__media"><ProductImage src={item.image} alt={item.alt} /></figure>
          </article>)}
        </div>
      </section>

      <section className="how section-pad grid-surface" id="como-funciona">
        <div className="how__heading"><p className="eyebrow"><span aria-hidden="true" />Do projeto à entrega</p><h2>Um fluxo que você consegue <em>acompanhar.</em></h2><p>Sem linguagem especial: monte o time, conecte os papéis e descreva o que precisa ser feito.</p></div>
        <ol className="how__steps">{steps.map(([number, title, text], index) => <li key={number}>
          <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div>{index < steps.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
        </li>)}</ol>
      </section>

      <section className="local" id="local-first">
        <div className="local__copy"><p className="eyebrow"><span aria-hidden="true" />Arquitetura local-first</p><h2>Seu projeto não precisa sair <em>da sua máquina.</em></h2><p>O Korda coordena os processos no ambiente que você já usa, com comunicação explícita entre os blocos conectados.</p></div>
        <div className="local__diagram" aria-label="Arquitetura local do Korda">
          <article><span><Eye size={20} aria-hidden="true" /></span><small>Interface</small><h3>Canvas Korda</h3><p>Você organiza e acompanha.</p></article>
          <ArrowRight aria-hidden="true" />
          <article><span><LockKey size={20} aria-hidden="true" /></span><small>Coordenação</small><h3>Broker local</h3><p>Pedidos seguem pelas cordas.</p></article>
          <ArrowRight aria-hidden="true" />
          <article><span><TerminalWindow size={20} aria-hidden="true" /></span><small>Execução</small><h3>PTYs e arquivos</h3><p>Processos no seu ambiente.</p></article>
        </div>
        <aside className="cord-note"><img src={asset("korda-mark.png")} alt="" width="56" height="56" /><div><small>Conexão não é exposição total</small><h3>Uma corda autoriza comunicação entre blocos específicos.</h3><p>Ela não transmite automaticamente todo o terminal, histórico ou contexto. Cada solicitação passa pelo broker local autenticado.</p></div></aside>
      </section>

      <section className="download" id="download">
        <div className="download__mark"><img src={asset("korda-mark.png")} alt="" width="92" height="92" /></div>
        <div className="download__copy"><p className="eyebrow">Comece local</p><h2>Monte o time. <em>Conecte o trabalho.</em></h2><p>Use o projeto e os agentes que já estão na sua máquina.</p></div>
        <div className="download__actions"><a className="button button--light" href={DOWNLOAD_URL}><DownloadSimple size={18} aria-hidden="true" />Baixar AppImage</a><a href={GITHUB_REPO} target="_blank" rel="noreferrer"><GithubLogo size={17} aria-hidden="true" />Ver código no GitHub<ArrowUpRight size={14} aria-hidden="true" /></a><small>Linux x86_64 · v0.1.0 · código aberto</small></div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="site-footer__brand"><Brand /><p>Orquestração local e visual para agentes de terminal.</p></div>
      <nav aria-label="Navegação do rodapé"><a href="#produto">Produto</a><a href="#video">Vídeo</a><a href="#demonstracao">Demonstração</a><a href="#recursos">Recursos</a></nav>
      <div className="site-footer__links"><a href={GITHUB_REPO} target="_blank" rel="noreferrer"><GithubLogo size={16} aria-hidden="true" />GitHub</a><a href="#top">Voltar ao topo</a></div>
      <small>Korda · código aberto · Linux x86_64</small>
    </footer>
  </div>;
}
