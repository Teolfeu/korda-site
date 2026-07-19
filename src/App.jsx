import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowsLeftRight,
  Binoculars,
  Brain,
  BracketsCurly,
  Browser,
  ChartLineUp,
  ChatCircleText,
  Check,
  Code,
  Command,
  Cube,
  CursorClick,
  DownloadSimple,
  Eye,
  FolderOpen,
  GithubLogo,
  HardDrive,
  Lightning,
  LinuxLogo,
  List,
  LockKey,
  Moon,
  PaperPlaneTilt,
  PencilSimple,
  ShieldCheck,
  Sparkle,
  SquaresFour,
  StarFour,
  TerminalWindow,
  Wrench,
  X,
} from "@phosphor-icons/react";
import { WorkflowDemo } from "./WorkflowDemo.jsx";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const GITHUB_REPO = "https://github.com/Teolfeu/korda";
const DOWNLOAD_URL = "https://github.com/Teolfeu/korda/releases/download/v0.1.1/Korda-0.1.1-x86_64.AppImage";
const ISSUES_URL = `${GITHUB_REPO}/issues`;

const workflow = [
  {
    name: "Orquestre",
    text: "Defina o objetivo e deixe o Orquestrador organizar o trabalho.",
    Icon: Brain,
  },
  {
    name: "Execute",
    text: "Agentes conectados recebem pedidos e trabalham em seus próprios terminais.",
    Icon: TerminalWindow,
  },
  {
    name: "Revise",
    text: "O Revisor valida a entrega e pode solicitar correções antes da conclusão.",
    Icon: ShieldCheck,
  },
  {
    name: "Pesquise",
    text: "O Pesquisador cruza fontes e devolve evidências para o fluxo.",
    Icon: Binoculars,
  },
  {
    name: "Consolide",
    text: "Pedidos e respostas voltam pela corda para uma entrega legível.",
    Icon: ArrowsLeftRight,
  },
];

// Ícones e cores seguem a identidade que o app atribui a cada CLI detectada.
const agents = [
  { name: "Claude Code", command: "claude", color: "#c2410c", Icon: Sparkle },
  { name: "Codex", command: "codex", color: "#7c3aed", Icon: Cube },
  { name: "OpenCode", command: "opencode", color: "#059669", Icon: BracketsCurly },
  { name: "Kimi", command: "kimi", color: "#2563eb", Icon: Moon },
  { name: "Gemini", command: "gemini", color: "#0891b2", Icon: StarFour },
  { name: "Grok", command: "grok", color: "#334155", Icon: Lightning },
  { name: "Hermes", command: "hermes", color: "#db2777", Icon: PaperPlaneTilt },
  { name: "Aider", command: "aider", color: "#57534e", Icon: Wrench },
  { name: "Cursor Agent", command: "cursor-agent", color: "#6366f1", Icon: CursorClick },
  { name: "Qwen", command: "qwen", color: "#dc2626", Icon: ChatCircleText },
  { name: "GitHub Copilot", command: "copilot", color: "#0f172a", Icon: GithubLogo },
];

const productViews = [
  {
    number: "01",
    eyebrow: "Workspace",
    title: "Arquivos e resultado no mesmo lugar.",
    text: "A árvore acompanha mudanças da pasta. Abra e edite arquivos enquanto mantém o navegador no canvas.",
    image: "korda-workspace-browser-hq.png",
    width: 1920,
    height: 969,
    alt: "Workspace e navegador reais abertos no Korda",
    Icon: FolderOpen,
    className: "product-card--wide",
  },
  {
    number: "02",
    eyebrow: "Terminal",
    title: "Cada agente mantém seu processo.",
    text: "PTYs reais, blocos redimensionáveis e foco no terminal que está executando o trabalho.",
    image: "korda-terminal-hq.png",
    width: 1800,
    height: 1135,
    alt: "Terminal real de um agente dentro do canvas do Korda",
    Icon: TerminalWindow,
  },
  {
    number: "03",
    eyebrow: "Atividade local",
    title: "Acompanhe apenas o que é verificável.",
    text: "Sessões, PTYs e atividade aparecem localmente. Tokens e custos só entram quando a CLI fornece os dados.",
    image: "korda-metrics-hq.png",
    width: 1800,
    height: 1178,
    alt: "Painel real de atividade e estatísticas do Korda",
    Icon: ChartLineUp,
  },
];

function Brand() {
  return (
    <span className="brand">
      <img src={asset("korda-mark.png")} alt="" width="44" height="44" />
      <b>Korda</b>
    </span>
  );
}

function DownloadButton({ className = "" }) {
  return (
    <a className={`button ${className}`.trim()} href={DOWNLOAD_URL}>
      <DownloadSimple size={18} aria-hidden="true" />
      Baixar para Linux
    </a>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  // Reveals suaves por seção; desativados quando o usuário prefere menos movimento.
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return undefined;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Korda — início" onClick={closeMenu}>
          <Brand />
        </a>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
        </button>

        <div className={`header-panel${menuOpen ? " is-open" : ""}`} id="main-navigation">
          <nav className="site-nav" aria-label="Navegação principal">
            <a href="#fluxo" onClick={closeMenu}>Como funciona</a>
            <a href="#demonstracao" onClick={closeMenu}>Demonstração</a>
            <a href="#agentes" onClick={closeMenu}>Agentes</a>
            <a href="#produto" onClick={closeMenu}>Produto</a>
            <a href="#controle" onClick={closeMenu}>Controle local</a>
            <a href={GITHUB_REPO} target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub</a>
          </nav>
          <DownloadButton className="button--header" />
        </div>
      </header>

      <main id="conteudo" tabIndex="-1">
        <section className="hero grid-surface" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Bancada espacial para orquestrar agentes de IA locais</p>
            <h1><span>Conecte agentes.</span><span>Veja o <em>trabalho acontecer.</em></span></h1>
            <p className="hero-lead">Abra seu projeto, defina o papel de cada agente e conecte o fluxo em um único canvas — com terminais reais rodando na sua máquina.</p>
            <div className="hero-actions">
              <DownloadButton />
              <a className="button button--secondary" href={GITHUB_REPO} target="_blank" rel="noreferrer">
                <GithubLogo size={19} aria-hidden="true" />
                Ver no GitHub
              </a>
            </div>
            <dl className="hero-facts">
              <div><dt><LockKey size={20} aria-hidden="true" />Coordenação local</dt><dd>O runtime do Korda fica no seu ambiente.</dd></div>
              <div><dt><TerminalWindow size={20} aria-hidden="true" />Suas CLIs, detectadas</dt><dd>Do Claude Code ao Copilot — ou qualquer comando do PATH.</dd></div>
              <div><dt><SquaresFour size={20} aria-hidden="true" />Canvas ou dashboard</dt><dd>Alterne as visões pelo topbar ou com a tecla D.</dd></div>
            </dl>
          </div>

          <figure className="hero-product">
            <div className="hero-product__label"><span />Visão do produto</div>
            <img src={asset("korda-canvas-real.webp")} width="1440" height="900" alt="Korda com workspace, quatro agentes conectados, navegador e inspetor no canvas" fetchPriority="high" />
            <figcaption><b>Um workspace.</b><span>Agentes, arquivos e navegador conectados no canvas.</span></figcaption>
          </figure>

          <img className="hero-cord" src={asset("hero-cord.png")} alt="" aria-hidden="true" />
        </section>

        <aside className="proof-bar" aria-label="Disponibilidade do Korda">
          <span><LinuxLogo size={19} aria-hidden="true" />Linux x86_64</span>
          <span><HardDrive size={19} aria-hidden="true" />AppImage v0.1.1</span>
          <span><Code size={19} aria-hidden="true" />Aplicativo Apache-2.0</span>
          <span><ShieldCheck size={19} aria-hidden="true" />Local-first por design</span>
        </aside>

        <section className="workflow section-boundary" id="fluxo">
          <header className="section-heading section-heading--split" data-reveal>
            <div>
              <p className="eyebrow">Como funciona</p>
              <h2>Agentes conectados, <em>trabalho coordenado.</em></h2>
            </div>
            <p>Você define os papéis e as conexões. O Korda entrega a topologia a cada agente e torna pedidos e respostas visíveis no canvas.</p>
          </header>

          <ol className="workflow-steps" data-reveal>
            {workflow.map(({ name, text, Icon }, index) => (
              <li key={name}>
                <div className="workflow-step__top">
                  <span><Icon size={27} weight="duotone" aria-hidden="true" /></span>
                  {index < workflow.length - 1 && <ArrowRight size={19} aria-hidden="true" />}
                </div>
                <h3>{name}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>

          <div className="context-note" data-reveal>
            <ArrowsLeftRight size={24} aria-hidden="true" />
            <p><b>Conexão explícita, não exposição total.</b> Uma corda autoriza pedidos e respostas entre blocos específicos; ela não copia automaticamente todo o terminal ou histórico.</p>
          </div>
        </section>

        <WorkflowDemo />

        <section className="agents section-boundary section-boundary--tinted" id="agentes">
          <header className="section-heading section-heading--split" data-reveal>
            <div>
              <p className="eyebrow">Agentes</p>
              <h2>Suas CLIs, <em>com identidade própria.</em></h2>
            </div>
            <p>O Korda resolve o PATH do login shell e varre diretórios comuns para encontrar as ferramentas instaladas. Cada CLI aparece com ícone e cor exclusivos — nos cards do diálogo de novo agente e nos nós do canvas.</p>
          </header>

          <ul className="agents-grid" aria-label="CLIs detectadas pelo Korda">
            {agents.map(({ name, command, color, Icon }, index) => (
              <li key={command} data-reveal style={{ "--agent-color": color, "--reveal-delay": `${Math.min(index * 30, 300)}ms` }}>
                <span className="agents-grid__icon"><Icon size={20} weight="duotone" aria-hidden="true" /></span>
                <span className="agents-grid__name">{name}</span>
                <code>{command}</code>
              </li>
            ))}
            <li className="agents-grid__custom" data-reveal style={{ "--reveal-delay": "330ms" }}>
              <span className="agents-grid__icon"><Command size={20} weight="duotone" aria-hidden="true" /></span>
              <span className="agents-grid__name">Qualquer CLI do PATH</span>
              <small>Campo de comando livre no diálogo de novo agente</small>
            </li>
          </ul>

          <div className="context-note" data-reveal>
            <Sparkle size={24} aria-hidden="true" />
            <p><b>Diálogo em passos, cards ricos.</b> Criar um agente é escolher a CLI, reconhecer a identidade visual e definir o papel — nenhuma ferramenta é empacotada ou revendida pelo Korda.</p>
          </div>
        </section>

        <section className="product" id="produto">
          <header className="section-heading section-heading--split" data-reveal>
            <div>
              <p className="eyebrow">Dentro do app</p>
              <h2>O workspace, o fluxo <em>e os detalhes.</em></h2>
            </div>
            <p>Do código ao canvas, do terminal às estatísticas. Tudo o que você precisa acompanhar permanece no mesmo espaço de trabalho.</p>
          </header>

          <div className="product-grid">
            {productViews.map(({ number, eyebrow, title, text, image, alt, width, height, Icon, className = "" }) => (
              <article className={`product-card ${className}`.trim()} key={number} data-reveal>
                <div className="product-card__copy">
                  <span className="product-card__number">{number}</span>
                  <p className="product-card__eyebrow"><Icon size={18} aria-hidden="true" />{eyebrow}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <figure className="product-card__image">
                  <img src={asset(image)} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
                </figure>
              </article>
            ))}
          </div>
        </section>

        <section className="control section-boundary" id="controle">
          <header className="section-heading section-heading--split" data-reveal>
            <div>
              <p className="eyebrow">Controle local</p>
              <h2>Local onde importa. <em>Explícito por design.</em></h2>
            </div>
            <p>O Korda coordena processos no seu ambiente. Cada CLI mantém sua própria conta, conexão e política de dados.</p>
          </header>

          <div className="control-grid" data-reveal>
            <article className="control-lead">
              <span><LockKey size={30} weight="duotone" aria-hidden="true" /></span>
              <h3>Seu workspace continua sob seu controle.</h3>
              <p>Escolha a pasta, conecte apenas os blocos necessários e encerre qualquer processo pelo próprio canvas.</p>
            </article>
            <article><TerminalWindow size={24} aria-hidden="true" /><h3>Executa no seu ambiente</h3><p>PTYs locais usam as ferramentas instaladas na máquina.</p></article>
            <article><PencilSimple size={24} aria-hidden="true" /><h3>Arquivos editáveis</h3><p>A árvore atualiza ao vivo e o editor protege contra conflitos.</p></article>
            <article><Browser size={24} aria-hidden="true" /><h3>Navegador conectado</h3><p>Agentes autorizados podem navegar e coletar evidências no canvas.</p></article>
            <article><Eye size={24} aria-hidden="true" /><h3>Telemetria honesta</h3><p>O painel mostra dados observados e sinaliza o que está indisponível.</p></article>
          </div>
        </section>

        <section className="start">
          <header className="section-heading section-heading--center" data-reveal>
            <p className="eyebrow">Primeiro fluxo</p>
            <h2>Do zero ao trabalho conectado <em>em três passos.</em></h2>
          </header>
          <ol className="start-steps">
            <li data-reveal style={{ "--reveal-delay": "0ms" }}><span>01</span><FolderOpen size={25} aria-hidden="true" /><h3>Abra uma pasta</h3><p>Escolha o projeto que será o workspace.</p></li>
            <li data-reveal style={{ "--reveal-delay": "90ms" }}><span>02</span><ArrowsLeftRight size={25} aria-hidden="true" /><h3>Adicione e conecte</h3><p>Escolha as CLIs detectadas — ou um comando livre — e atribua os papéis.</p></li>
            <li data-reveal style={{ "--reveal-delay": "180ms" }}><span>03</span><Check size={25} aria-hidden="true" /><h3>Dê o objetivo</h3><p>Converse com o Orquestrador e acompanhe o fluxo.</p></li>
          </ol>
        </section>

        <section className="download-section grid-surface" id="download" data-reveal>
          <div className="download-section__mark"><img src={asset("korda-mark.png")} alt="" width="120" height="120" /></div>
          <div className="download-section__copy">
            <p className="eyebrow">Pronto para começar?</p>
            <h2>Abra seu projeto. Monte o time. <em>Conecte o fluxo.</em></h2>
            <p>Korda para Linux x86_64, distribuído como AppImage sob a licença Apache-2.0.</p>
          </div>
          <div className="download-section__actions">
            <DownloadButton />
            <a className="button button--secondary" href={GITHUB_REPO} target="_blank" rel="noreferrer"><GithubLogo size={19} aria-hidden="true" />Explorar no GitHub</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><Brand /><p>Orquestração local e visual para agentes de terminal.</p></div>
        <nav aria-label="Links do rodapé">
          <a href={GITHUB_REPO} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href={`${GITHUB_REPO}/releases`} target="_blank" rel="noreferrer">Releases<ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href={ISSUES_URL} target="_blank" rel="noreferrer">Reportar problema<ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href={`${GITHUB_REPO}/blob/main/LICENSE`} target="_blank" rel="noreferrer">Licença<ArrowUpRight size={13} aria-hidden="true" /></a>
        </nav>
        <small>© 2026 Korda. Aplicativo aberto sob Apache-2.0.</small>
      </footer>
    </div>
  );
}
