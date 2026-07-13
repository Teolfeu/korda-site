import {
  ArrowRight,
  Binoculars,
  Brain,
  DownloadSimple,
  GithubLogo,
  Lightning,
  Plus,
  ShieldCheck,
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
  ["01", "Defina", "Abra a pasta e descreva o objetivo."],
  ["02", "Conecte", "Escolha agentes, papéis e desenhe as cordas."],
  ["03", "Acompanhe", "Veja pedidos, respostas, terminais e evidências."],
  ["04", "Revise", "Valide o resultado e consolide a entrega."],
];

function Brand({ inverse = false }) {
  return <span className={`brand ${inverse ? "inverse" : ""}`}><img src={asset("korda-mark.png")} alt="" /><b>Korda</b></span>;
}

function ProductFrame({ src, alt, className = "" }) {
  return <figure className={`product-frame ${className}`}><img src={src} alt={alt} loading="lazy" /></figure>;
}

export function App() {
  return <div className="site-shell">
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="Korda — início"><Brand /></a>
      <nav aria-label="Navegação principal">
        <a href="#produto">Produto</a>
        <a href="#recursos">Recursos</a>
        <a href="#demonstracao">Demonstração</a>
        <a href="#como-funciona">Como funciona</a>
        <a href="#local-first">Local-first</a>
      </nav>
      <a className="button button-small" href={DOWNLOAD_URL}><DownloadSimple size={15} aria-hidden="true" />Baixar</a>
    </header>

    <main id="top">
      <section className="hero grid-surface" id="produto">
        <Plus className="registration-mark top-left" aria-hidden="true" />
        <Plus className="registration-mark top-right" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Orquestração local e visual</p>
          <h1><span>CONECTE</span><span>O <img src={asset("korda-mark.png")} alt="Korda" /> TIME.</span></h1>
          <img className="hero-cord" src={asset("hero-cord.png")} alt="" aria-hidden="true" />
          <p className="hero-lead">Planeje, delegue e acompanhe o trabalho do seu time de agentes em um único canvas.</p>
          <div className="hero-actions">
            <a className="button" href={DOWNLOAD_URL}><DownloadSimple size={17} aria-hidden="true" />Baixar Korda para Linux</a>
            <a className="button button-outline" href="#como-funciona">Ver como funciona</a>
          </div>
          <small>AppImage · Linux x86_64 · v0.1.0</small>
        </div>
        <figure className="hero-proof" aria-label="Korda com agentes conectados em um canvas">
          <div className="hero-proof-shot">
            <img src={asset("canvas.webp")} alt="Interface do Korda exibindo o workspace e agentes conectados no canvas" fetchPriority="high" />
          </div>
          <div className="hero-proof-detail">
            <span>Sessão do agente</span>
            <img src={asset("terminal.webp")} alt="Detalhe de um terminal de agente exibindo testes concluídos" />
          </div>
          <figcaption><b>Fluxo conectado</b><span>Workspace, papéis, terminais e navegador no mesmo plano.</span></figcaption>
        </figure>
        <Plus className="registration-mark bottom-left" aria-hidden="true" />
        <Plus className="registration-mark bottom-right" aria-hidden="true" />
      </section>

      <section className="roles section-pad" id="recursos">
        <div className="section-intro split-intro">
          <h2>Seu time de agentes,<br />no mesmo canvas.</h2>
          <p>O Orquestrador decompõe objetivos, delega para especialistas e consolida resultados. Cada agente conserva seu próprio terminal, papel e contexto autorizado.</p>
        </div>
        <div className="role-grid">
          {roles.map(({ Icon, ...role }) => <article className={`role-card ${role.tone}`} key={role.name}><Icon size={27} weight="duotone" aria-hidden="true" /><h3>{role.name}</h3><p>{role.text}</p></article>)}
        </div>
        <img className="role-cords" src={asset("role-cords.png")} alt="" aria-hidden="true" loading="lazy" />
      </section>

      <WorkflowDemo />

      <section className="flow-statement section-pad">
        <h2>O fluxo deixa<br />de ser abstrato.</h2>
        <p>Você vê o plano, as solicitações pendentes e as respostas. Cada agente trabalha no que sabe fazer — e o movimento nas cordas representa atividade real.</p>
      </section>

      <section className="proofs" aria-label="Recursos do Korda">
        <article className="proof-row terminal-row">
          <div><p className="eyebrow">PTY real</p><h2>Trabalho real,<br />dentro de cada bloco.</h2></div>
          <ProductFrame src={asset("korda-terminal-hq.png")} alt="Terminal de um agente orquestrador dentro de um bloco do Korda" />
          <p>Agentes se conectam a PTYs reais, executam comandos, rodam testes e devolvem resultados visíveis no próprio canvas.</p>
        </article>
        <article className="proof-row">
          <div><p className="eyebrow">Contexto à vista</p><h2>Projeto e navegador<br />lado a lado.</h2></div>
          <ProductFrame src={asset("korda-workspace-browser-hq.png")} alt="Explorer do workspace e navegador abertos no Korda" />
          <p>Abra arquivos do workspace e mantenha a aplicação visível enquanto os agentes codam, testam e verificam o resultado.</p>
        </article>
        <article className="proof-row metrics-row">
          <div><p className="eyebrow">Telemetria local</p><h2>Métricas<br />honestas.</h2></div>
          <ProductFrame src={asset("korda-metrics-hq.png")} alt="Painel operacional do Korda com progresso e atividade observada" />
          <p>Acompanhe sessões, atividade e progresso observados localmente. Tokens, cotas e custos só aparecem quando a CLI fornece dados verificáveis.</p>
        </article>
      </section>

      <section className="how section-pad" id="como-funciona">
        <div className="how-title"><p className="eyebrow">Do objetivo à entrega</p><h2>Quatro passos<br />para orquestrar.</h2></div>
        <ol>{steps.map(([number, title, text], index) => <li key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p>{index < steps.length - 1 && <ArrowRight className="step-arrow" size={17} aria-hidden="true" />}</li>)}</ol>
      </section>

      <section className="local section-pad" id="local-first">
        <div className="local-heading"><p className="eyebrow">Controle e transparência</p><h2>Local por<br />arquitetura.</h2></div>
        <div className="local-points">
          <article><b>01</b><h3>Seu ambiente</h3><p>Você escolhe a pasta, os agentes e quando cada processo começa.</p></article>
          <article><b>02</b><h3>Onde você trabalha</h3><p>O runtime e os terminais operam na sua própria máquina.</p></article>
          <article><b>03</b><h3>Escopo explícito</h3><p>Cordas autorizam a comunicação entre blocos específicos.</p></article>
        </div>
        <aside className="cord-explainer">
          <img src={asset("korda-mark.png")} alt="" />
          <div><h3>O que são cordas?</h3><p>Cordas são permissões de comunicação entre agentes conectados. Elas não transmitem automaticamente todo o terminal, histórico ou contexto: cada solicitação passa pelo broker local autenticado e somente entre os blocos autorizados.</p></div>
        </aside>
      </section>

      <section className="download" id="download">
        <Brand inverse />
        <div><p className="eyebrow">Korda para Linux</p><h2>Seu time de agentes,<br />pronto para conectar.</h2></div>
        <div className="download-action"><a className="button button-light" href={DOWNLOAD_URL}><DownloadSimple size={17} aria-hidden="true" />Baixar AppImage</a><small>Linux x86_64 · v0.1.0 · código aberto</small></div>
      </section>
    </main>

    <footer className="site-footer"><Brand /><p>Korda · orquestração local e visual para agentes de terminal.</p><div className="footer-links"><a href={GITHUB_REPO} target="_blank" rel="noreferrer"><GithubLogo size={15} aria-hidden="true" />GitHub</a><a href="#top">Voltar ao topo</a></div></footer>
  </div>;
}
