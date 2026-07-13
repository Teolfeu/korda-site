import {
  ArrowRight,
  ArrowsLeftRight,
  Binoculars,
  Brain,
  CheckCircle,
  Code,
  DownloadSimple,
  Eye,
  FolderOpen,
  GithubLogo,
  HardDrive,
  LinuxLogo,
  LockKey,
  Lightning,
  Plus,
  ShieldCheck,
  TerminalWindow,
} from "@phosphor-icons/react";
import { WorkflowDemo } from "./WorkflowDemo";
import "./workflow-demo.css";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const GITHUB_REPO = "https://github.com/Teolfeu/korda";
const DOWNLOAD_URL = "https://github.com/Teolfeu/korda/releases/download/v0.1.0/Korda-0.1.0-x86_64.AppImage";

const roles = [
  { name: "Orquestrador", tone: "blue", Icon: Brain, text: "Entende o objetivo, cria o plano e coordena os agentes conectados." },
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

function Brand({ inverse = false }) {
  return <span className={`brand ${inverse ? "inverse" : ""}`}><img src={asset("korda-mark.png")} alt="" /><b>Korda</b></span>;
}

function ProductFrame({ src, alt, className = "" }) {
  return <figure className={`product-frame ${className}`}><img src={src} alt={alt} loading="lazy" /></figure>;
}

export function App() {
  return <div className="site-shell">
    <a className="skip-link" href="#top">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="site-header__brand">
        <a className="brand-link" href="#top" aria-label="Korda — início"><Brand /></a>
        <span className="site-header__edition">Desktop · Linux</span>
      </div>
      <nav className="site-header__nav" aria-label="Navegação principal">
        <a href="#produto">Produto</a>
        <a href="#recursos">Recursos</a>
        <a href="#demonstracao">Demonstração</a>
        <a href="#como-funciona">Como funciona</a>
        <a href="#local-first">Local-first</a>
      </nav>
      <div className="site-header__actions">
        <a className="site-header__github" href={GITHUB_REPO} target="_blank" rel="noreferrer"><GithubLogo size={17} aria-hidden="true" />GitHub</a>
        <a className="button button-small" href={DOWNLOAD_URL}><DownloadSimple size={15} aria-hidden="true" />Baixar</a>
      </div>
    </header>

    <main id="top">
      <section className="hero grid-surface" id="produto">
        <Plus className="registration-mark top-left" aria-hidden="true" />
        <Plus className="registration-mark top-right" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-badges" aria-label="Características principais">
            <span><HardDrive size={14} aria-hidden="true" />Local-first</span>
            <span><Code size={14} aria-hidden="true" />Código aberto</span>
            <span><LinuxLogo size={14} aria-hidden="true" />Linux</span>
          </div>
          <p className="eyebrow">Workspace visual para agentes de terminal</p>
          <h1>Seu time de agentes, <br /><span>conectado de verdade.</span></h1>
          <img className="hero-cord" src={asset("hero-cord.png")} alt="" aria-hidden="true" />
          <p className="hero-lead">Abra seu projeto, conecte agentes por função e acompanhe delegação, execução e revisão em um único canvas local.</p>
          <div className="hero-actions">
            <a className="button" href={DOWNLOAD_URL}><DownloadSimple size={17} aria-hidden="true" />Baixar Korda para Linux</a>
            <a className="button button-outline" href="#demonstracao">Ver demonstração<ArrowRight size={15} aria-hidden="true" /></a>
          </div>
          <small className="hero-version">AppImage · Linux x86_64 · v0.1.0</small>
        </div>
        <figure className="hero-proof hero-app" aria-label="Interface do Korda com agentes conectados em um canvas">
          <div className="hero-app__toolbar" aria-hidden="true">
            <span className="hero-app__window-dots"><i /><i /><i /></span>
            <b>korda / workspace local</b>
            <span className="hero-app__connection"><i />Broker ativo</span>
          </div>
          <div className="hero-proof-shot hero-app__canvas">
            <img src={asset("canvas.webp")} alt="Interface do Korda exibindo o workspace e agentes conectados no canvas" fetchPriority="high" />
          </div>
          <div className="hero-app__indicators" aria-label="Elementos disponíveis na interface">
            <span><FolderOpen size={15} aria-hidden="true" /><b>Workspace</b><small>Arquivos locais</small></span>
            <span><TerminalWindow size={15} aria-hidden="true" /><b>PTY</b><small>Terminal real</small></span>
            <span><ArrowsLeftRight size={15} aria-hidden="true" /><b>Cordas</b><small>Fluxo autorizado</small></span>
          </div>
          <figcaption><b>O trabalho permanece visível.</b><span>Workspace, papéis, terminais e navegador no mesmo plano.</span></figcaption>
        </figure>
        <Plus className="registration-mark bottom-left" aria-hidden="true" />
        <Plus className="registration-mark bottom-right" aria-hidden="true" />
      </section>

      <section className="roles section-pad" id="recursos">
        <div className="section-intro split-intro">
          <div><p className="eyebrow">Equipe conectada</p><h2>Cada agente sabe <br />qual papel cumprir.</h2></div>
          <p>Você monta o time visualmente. O Orquestrador distribui o objetivo entre os especialistas conectados, acompanha as respostas e consolida a entrega.</p>
        </div>
        <div className="roles__network">
          <div className="roles__hub" aria-hidden="true"><img src={asset("korda-mark.png")} alt="" /><span>Time Korda</span></div>
          <div className="role-grid">
            {roles.map(({ Icon, ...role }, index) => <article className={`role-card ${role.tone}`} key={role.name}>
              <header><span className="role-card__index">0{index + 1}</span><Icon size={25} weight="duotone" aria-hidden="true" /></header>
              <h3>{role.name}</h3><p>{role.text}</p>
              <span className="role-card__connection"><i aria-hidden="true" />Papel definido</span>
            </article>)}
          </div>
        </div>
        <img className="role-cords" src={asset("role-cords.png")} alt="" aria-hidden="true" loading="lazy" />
      </section>

      <WorkflowDemo />

      <section className="flow-statement section-pad">
        <p className="eyebrow">Menos caixa-preta</p>
        <h2>Se o agente está trabalhando, <br /><span>você vê onde e com quem.</span></h2>
        <p>Pedidos, respostas e estados aparecem no fluxo. A atividade nas cordas representa comunicação real entre agentes conectados.</p>
      </section>

      <section className="proofs" aria-label="Recursos do Korda">
        <article className="proof-row feature-card">
          <div className="feature-card__content"><span className="feature-card__number">01</span><p className="eyebrow">PTY real</p><h2>O terminal continua <br />sendo o terminal.</h2><p>Agentes se conectam a PTYs reais, executam comandos, rodam testes e devolvem resultados visíveis no próprio canvas.</p><ul><li><CheckCircle size={15} aria-hidden="true" />Entrada e saída visíveis</li><li><CheckCircle size={15} aria-hidden="true" />Sessões por agente</li></ul></div>
          <ProductFrame src={asset("korda-terminal-hq.png")} alt="Terminal de um agente orquestrador dentro de um bloco do Korda" className="feature-card__media" />
        </article>
        <article className="proof-row feature-card feature-card--reverse">
          <div className="feature-card__content"><span className="feature-card__number">02</span><p className="eyebrow">Contexto à vista</p><h2>Projeto e navegador, <br />lado a lado.</h2><p>Abra arquivos do workspace e mantenha a aplicação visível enquanto os agentes codam, testam e verificam o resultado.</p><ul><li><FolderOpen size={15} aria-hidden="true" />Árvore do projeto</li><li><Eye size={15} aria-hidden="true" />Resultado no canvas</li></ul></div>
          <ProductFrame src={asset("korda-workspace-browser-hq.png")} alt="Explorer do workspace e navegador abertos no Korda" className="feature-card__media" />
        </article>
        <article className="proof-row feature-card metrics-row">
          <div className="feature-card__content"><span className="feature-card__number">03</span><p className="eyebrow">Telemetria local</p><h2>Métricas sem <br />preencher lacunas.</h2><p>Acompanhe sessões, atividade e progresso observados localmente. Tokens, cotas e custos só aparecem quando a CLI fornece dados verificáveis.</p><ul><li><CheckCircle size={15} aria-hidden="true" />Atividade observada</li><li><CheckCircle size={15} aria-hidden="true" />Dados identificados por fonte</li></ul></div>
          <ProductFrame src={asset("korda-metrics-hq.png")} alt="Painel operacional do Korda com progresso e atividade observada" className="feature-card__media" />
        </article>
      </section>

      <section className="how section-pad" id="como-funciona">
        <div className="how-title"><p className="eyebrow">Do projeto à entrega</p><h2>Um fluxo que você <br />consegue acompanhar.</h2><p>Sem linguagem especial para começar: monte o time, conecte os papéis e descreva o que precisa ser feito.</p></div>
        <ol className="how__flow">{steps.map(([number, title, text], index) => <li key={number}>
          <span className="how__step-number">{number}</span>
          <div><h3>{title}</h3><p>{text}</p></div>
          {index < steps.length - 1 && <ArrowRight className="step-arrow" size={18} aria-hidden="true" />}
        </li>)}</ol>
      </section>

      <section className="local section-pad" id="local-first">
        <div className="local-heading"><p className="eyebrow">Arquitetura local-first</p><h2>Seu projeto não precisa <br />sair da sua máquina.</h2><p>O Korda coordena os processos no ambiente que você já usa, com comunicação explícita entre os blocos conectados.</p></div>
        <div className="local__architecture" aria-label="Arquitetura local do Korda">
          <div className="local__layer"><span><Eye size={18} aria-hidden="true" /></span><div><small>Interface</small><b>Canvas Korda</b><p>Você organiza e acompanha o fluxo.</p></div></div>
          <ArrowRight aria-hidden="true" />
          <div className="local__layer"><span><LockKey size={18} aria-hidden="true" /></span><div><small>Coordenação</small><b>Broker local</b><p>Pedidos seguem apenas pelas conexões permitidas.</p></div></div>
          <ArrowRight aria-hidden="true" />
          <div className="local__layer"><span><TerminalWindow size={18} aria-hidden="true" /></span><div><small>Execução</small><b>PTYs e arquivos</b><p>Os processos operam no seu ambiente.</p></div></div>
        </div>
        <div className="local-points">
          <article><CheckCircle size={19} weight="fill" aria-hidden="true" /><div><h3>Você inicia os processos</h3><p>Escolha a pasta, os agentes e quando cada sessão começa.</p></div></article>
          <article><CheckCircle size={19} weight="fill" aria-hidden="true" /><div><h3>Runtime na sua máquina</h3><p>Terminais e ferramentas trabalham no ambiente local.</p></div></article>
          <article><CheckCircle size={19} weight="fill" aria-hidden="true" /><div><h3>Conexões explícitas</h3><p>Cordas autorizam comunicação entre blocos específicos.</p></div></article>
        </div>
        <aside className="cord-explainer">
          <img src={asset("korda-mark.png")} alt="" />
          <div><small>Conexão não é exposição total</small><h3>O que uma corda autoriza?</h3><p>Cordas são permissões de comunicação entre agentes conectados. Elas não transmitem automaticamente todo o terminal, histórico ou contexto: cada solicitação passa pelo broker local autenticado e somente entre os blocos autorizados.</p></div>
        </aside>
      </section>

      <section className="download" id="download">
        <div className="download__brand"><Brand inverse /><span>Desktop local-first</span></div>
        <div className="download__copy"><p className="eyebrow">Korda para Linux</p><h2>Monte o time. <br />Conecte o trabalho.</h2><p>Comece com o projeto e os agentes que já estão na sua máquina.</p></div>
        <div className="download-action"><a className="button button-light" href={DOWNLOAD_URL}><DownloadSimple size={17} aria-hidden="true" />Baixar AppImage</a><a className="download__github" href={GITHUB_REPO} target="_blank" rel="noreferrer"><GithubLogo size={16} aria-hidden="true" />Ver código no GitHub</a><small>Linux x86_64 · v0.1.0 · código aberto</small></div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="site-footer__identity"><Brand /><p>Orquestração local e visual para agentes de terminal.</p></div>
      <nav className="site-footer__nav" aria-label="Navegação do rodapé"><a href="#produto">Produto</a><a href="#recursos">Recursos</a><a href="#como-funciona">Como funciona</a><a href="#local-first">Local-first</a></nav>
      <div className="footer-links"><a href={GITHUB_REPO} target="_blank" rel="noreferrer"><GithubLogo size={15} aria-hidden="true" />GitHub</a><a href="#top">Voltar ao topo</a></div>
      <small className="site-footer__meta">Korda · código aberto · Linux x86_64</small>
    </footer>
  </div>;
}
