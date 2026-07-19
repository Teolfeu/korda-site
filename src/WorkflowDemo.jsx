import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowClockwise,
  BracketsCurly,
  Cube,
  CursorClick,
  Lightning,
  PaperPlaneTilt,
  Pause,
  Play,
  ShareNetwork,
  SquaresFour,
  Stop,
  Target,
} from "@phosphor-icons/react";
import "./workflow-demo.css";

const phases = [
  { id: "plan", label: "Planejando", duration: 1800, detail: "O Orquestrador organiza o objetivo e identifica os especialistas necessários." },
  { id: "delegate", label: "Delegando", duration: 1800, detail: "Pedidos são enviados apenas aos agentes conectados pelas cordas." },
  { id: "execute", label: "Executando", duration: 3000, detail: "Executor e Pesquisador trabalham em paralelo e devolvem evidências." },
  { id: "review", label: "Revisando", duration: 2200, detail: "O Revisor valida o resultado e aponta correções antes da entrega." },
  { id: "consolidate", label: "Consolidando", duration: 1600, detail: "O Orquestrador reúne as respostas e prepara a entrega final." },
  { id: "complete", label: "Concluído", duration: 2000, detail: "O fluxo terminou e todas as evidências foram consolidadas." },
];

const scenarios = [
  {
    id: "site",
    label: "Criar site",
    objective: "Criar uma landing responsiva e validada",
    executor: "Implementar a interface e executar o build",
    researcher: "Organizar referências e requisitos do produto",
    reviewer: "Revisar responsividade, acessibilidade e copy",
  },
  {
    id: "bug",
    label: "Corrigir bug",
    objective: "Diagnosticar e corrigir uma falha no terminal",
    executor: "Reproduzir o erro e implementar a correção",
    researcher: "Investigar APIs, versões e casos semelhantes",
    reviewer: "Validar a causa, os testes e possíveis regressões",
  },
  {
    id: "research",
    label: "Pesquisa técnica",
    objective: "Produzir uma análise fundamentada e verificável",
    executor: "Estruturar achados e preparar o relatório",
    researcher: "Cruzar fontes e reunir evidências relevantes",
    reviewer: "Checar fontes, lacunas e coerência das conclusões",
  },
  {
    id: "release",
    label: "Preparar release",
    objective: "Preparar uma versão pública com segurança",
    executor: "Gerar o pacote e os artefatos da versão",
    researcher: "Verificar dependências, compatibilidade e notas",
    reviewer: "Auditar testes, checksums e critérios de publicação",
  },
];

// Ícone e cor seguem a identidade real que o app atribui a cada CLI
// (a mesma usada nos nós do canvas e no diálogo de novo agente).
const nodes = [
  { id: "orchestrator", className: "workflow-node--orchestrator", role: "Orquestrador", name: "Codex", Icon: Cube },
  { id: "executor", className: "workflow-node--executor", role: "Executor", name: "OpenCode", Icon: BracketsCurly },
  { id: "researcher", className: "workflow-node--researcher", role: "Pesquisador", name: "Hermes", Icon: PaperPlaneTilt },
  { id: "reviewer", className: "workflow-node--reviewer", role: "Revisor", name: "Grok", Icon: Lightning },
];

const quickActions = [
  { id: "focus", label: "Focar", Icon: CursorClick },
  { id: "restart", label: "Reiniciar", Icon: ArrowClockwise },
  { id: "stop", label: "Parar", Icon: Stop },
];

const prefersReducedMotion = () => typeof window !== "undefined"
  && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function nodeState(nodeId, phaseId) {
  if (nodeId === "orchestrator") {
    if (["plan", "delegate", "consolidate"].includes(phaseId)) return "active";
    return phaseId === "complete" ? "complete" : "waiting";
  }
  if (nodeId === "reviewer") {
    if (phaseId === "review") return "active";
    return ["consolidate", "complete"].includes(phaseId) ? "complete" : "waiting";
  }
  if (["delegate", "execute"].includes(phaseId)) return "active";
  return ["review", "consolidate", "complete"].includes(phaseId) ? "complete" : "waiting";
}

function stateLabel(value) {
  if (value === "active") return "Trabalhando";
  if (value === "complete") return "Concluído";
  return "Aguardando";
}

function nodeProgress(nodeId, phaseId) {
  const state = nodeState(nodeId, phaseId);
  if (state === "complete") return 100;
  if (state === "waiting") return 0;
  if (nodeId === "orchestrator") {
    if (phaseId === "plan") return 32;
    if (phaseId === "delegate") return 58;
    return 88;
  }
  if (nodeId === "reviewer") return 72;
  return phaseId === "delegate" ? 28 : 74;
}

function cordClasses(target, phaseId) {
  const isWorker = target === "executor" || target === "researcher";
  const active = isWorker
    ? ["delegate", "execute", "review"].includes(phaseId)
    : ["review", "consolidate"].includes(phaseId);
  const returning = isWorker ? phaseId === "review" : phaseId === "consolidate";
  return `workflow-cord__flow workflow-cord--${target}${active ? " is-active" : ""}${returning ? " is-return" : ""}`;
}

function taskFor(nodeId, scenario) {
  if (nodeId === "orchestrator") return scenario.objective;
  return scenario[nodeId];
}

function NodeStatus({ state }) {
  return <span className={`workflow-node__state is-${state}`}><i aria-hidden="true" />{stateLabel(state)}</span>;
}

function NodeProgress({ node, progress }) {
  return <div className="workflow-node__footer">
    <div className="workflow-node__progress" role="progressbar" aria-label={`Progresso de ${node.role}`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
      <i style={{ width: `${progress}%` }} aria-hidden="true" />
    </div>
    <span className="workflow-node__progress-value">{progress}%</span>
  </div>;
}

function WorkflowNode({ node, scenario, phaseId }) {
  const state = nodeState(node.id, phaseId);
  const progress = nodeProgress(node.id, phaseId);
  const Icon = node.Icon;
  return <article className={`workflow-node ${node.className} is-${state}`} aria-label={`${node.role}, ${node.name}: ${stateLabel(state)}, ${progress}%`}>
    <header className="workflow-node__head">
      <span className="workflow-node__icon"><Icon size={18} weight="duotone" aria-hidden="true" /></span>
      <span className="workflow-node__identity"><small className="workflow-node__role">{node.role}</small><b className="workflow-node__name">{node.name}</b></span>
      <NodeStatus state={state} />
    </header>
    <small className="workflow-node__task-label">Tarefa atual</small>
    <p className="workflow-node__task">{taskFor(node.id, scenario)}</p>
    <NodeProgress node={node} progress={progress} />
  </article>;
}

function DashboardCard({ node, scenario, phaseId, onQuickAction }) {
  const state = nodeState(node.id, phaseId);
  const progress = nodeProgress(node.id, phaseId);
  const Icon = node.Icon;
  return <article className={`dash-card ${node.className} is-${state}`} aria-label={`${node.role}, ${node.name}: ${stateLabel(state)}, ${progress}%`}>
    <header className="dash-card__head">
      <span className="workflow-node__icon"><Icon size={18} weight="duotone" aria-hidden="true" /></span>
      <span className="workflow-node__identity"><small className="workflow-node__role">{node.role}</small><b className="workflow-node__name">{node.name}</b></span>
      <NodeStatus state={state} />
    </header>
    <p className="dash-card__task">{taskFor(node.id, scenario)}</p>
    <NodeProgress node={node} progress={progress} />
    <footer className="dash-card__actions" aria-label={`Ações rápidas de ${node.role}`}>
      {quickActions.map(({ id, label, Icon: ActionIcon }) => (
        <button key={id} type="button" onClick={() => onQuickAction(label, node)} aria-label={`${label} ${node.role} (${node.name})`}>
          <ActionIcon size={13} weight="bold" aria-hidden="true" />{label}
        </button>
      ))}
    </footer>
  </article>;
}

export function WorkflowDemo() {
  const sectionRef = useRef(null);
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [view, setView] = useState("canvas");
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [userPaused, setUserPaused] = useState(prefersReducedMotion);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(() => typeof document === "undefined" || !document.hidden);
  const [announcement, setAnnouncement] = useState("Demonstração pronta.");
  const scenario = useMemo(() => scenarios.find((item) => item.id === scenarioId) || scenarios[0], [scenarioId]);
  const phase = phases[phaseIndex];
  const paused = userPaused || !inView || !documentVisible || reducedMotion;

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return undefined;
    const update = (event) => {
      setReducedMotion(event.matches);
      if (event.matches) setUserPaused(true);
    };
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setTimeout(() => {
      if (phaseIndex === phases.length - 1) {
        const currentScenario = scenarios.findIndex((item) => item.id === scenarioId);
        setScenarioId(scenarios[(currentScenario + 1) % scenarios.length].id);
        setPhaseIndex(0);
        return;
      }
      setPhaseIndex((current) => current + 1);
    }, phase.duration);
    return () => window.clearTimeout(timer);
  }, [paused, phase.duration, phaseIndex, scenarioId]);

  useEffect(() => {
    if (phase.id === "complete") setAnnouncement(`${scenario.label} concluído.`);
  }, [phase.id, scenario.label]);

  const chooseScenario = (id) => {
    setScenarioId(id);
    setPhaseIndex(0);
    const selected = scenarios.find((item) => item.id === id);
    setAnnouncement(`Cenário ${selected?.label || id} selecionado.`);
  };

  const chooseView = (nextView) => {
    setView(nextView);
    setAnnouncement(nextView === "dashboard" ? "Visão dashboard: cards por agente com status ao vivo." : "Visão canvas: agentes conectados por cordas.");
  };

  const runQuickAction = (label, node) => {
    setAnnouncement(`${label} ${node.role} (${node.name}) — ação ilustrativa na demonstração.`);
  };

  const counters = phase.id === "plan"
    ? { active: 1, waiting: 3, complete: 0 }
    : phase.id === "delegate"
      ? { active: 3, waiting: 1, complete: 0 }
      : phase.id === "execute"
        ? { active: 2, waiting: 2, complete: 0 }
        : phase.id === "review"
          ? { active: 1, waiting: 1, complete: 2 }
          : phase.id === "consolidate"
            ? { active: 1, waiting: 0, complete: 3 }
            : { active: 0, waiting: 0, complete: 4 };

  const nextStep = () => {
    if (phaseIndex === phases.length - 1) {
      const currentScenario = scenarios.findIndex((item) => item.id === scenarioId);
      setScenarioId(scenarios[(currentScenario + 1) % scenarios.length].id);
      setPhaseIndex(0);
      return;
    }
    setPhaseIndex((current) => current + 1);
  };

  const controlDemo = () => {
    if (reducedMotion) {
      nextStep();
      setAnnouncement(`Etapa ${phases[(phaseIndex + 1) % phases.length].label}.`);
      return;
    }
    setUserPaused((value) => {
      setAnnouncement(value ? "Demonstração retomada." : "Demonstração pausada.");
      return !value;
    });
  };

  return <section className="workflow-demo" id="demonstracao" data-phase={phase.id} ref={sectionRef} aria-labelledby="workflow-demo-title">
    <div className="workflow-demo__intro">
      <p className="workflow-demo__eyebrow">Orquestração em movimento</p>
      <h2 className="workflow-demo__title" id="workflow-demo-title">Uma missão. <em>Duas visões.</em></h2>
      <p className="workflow-demo__copy">Escolha um cenário e acompanhe os agentes no canvas — ou alterne para o <b>dashboard</b>, a nova visão do Korda: cards com status ao vivo, painel da missão e ações rápidas. No app, o toggle fica no topbar e a tecla <kbd>D</kbd> faz a troca.</p>
    </div>

    <div className="workflow-demo__shell">
      <header className="workflow-demo__topbar">
        <div className="workflow-demo__toolbar">
          <div className="workflow-demo__status">
            <span className="workflow-demo__status-dot" aria-hidden="true" />
            <span><b>{scenario.label}</b><small>{phase.label} · {phase.detail}</small></span>
          </div>
          <div className="workflow-demo__toolbar-side">
            <div className="workflow-demo__counters" aria-label="Resumo dos agentes">
              <span><i className="is-active" aria-hidden="true" /><b>{counters.active}</b> ativos</span>
              <span><i className="is-waiting" aria-hidden="true" /><b>{counters.waiting}</b> aguardando</span>
              <span><i className="is-complete" aria-hidden="true" /><b>{counters.complete}</b> concluídos</span>
            </div>
            <div className="workflow-demo__view-toggle" role="group" aria-label="Alternar visão da demonstração">
              <button type="button" aria-pressed={view === "canvas"} onClick={() => chooseView("canvas")}>
                <ShareNetwork size={14} weight="bold" aria-hidden="true" />Canvas
              </button>
              <button type="button" aria-pressed={view === "dashboard"} onClick={() => chooseView("dashboard")}>
                <SquaresFour size={14} weight="bold" aria-hidden="true" />Dashboard<kbd aria-hidden="true">D</kbd>
              </button>
            </div>
          </div>
        </div>
        <ol className="workflow-demo__timeline" aria-label="Etapas do fluxo">
          {phases.map((item, index) => {
            const isCurrent = index === phaseIndex;
            const isComplete = index < phaseIndex;
            return <li key={item.id} className={`workflow-demo__phase${isCurrent ? " is-current" : ""}${isComplete ? " is-complete" : ""}`} aria-current={isCurrent ? "step" : undefined}>
              <span aria-hidden="true">{isComplete ? "✓" : index + 1}</span>
              <b>{item.label}</b>
            </li>;
          })}
        </ol>
      </header>

      {view === "canvas" ? (
        <div className="workflow-demo__stage" data-phase={phase.id} aria-label={`Canvas simulado na fase ${phase.label}`}>
          <svg className="workflow-demo__cords" viewBox="0 0 1000 460" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="workflow-cord workflow-cord__base workflow-cord--executor" d="M 500 145 C 500 225 180 210 180 318" />
            <path className={cordClasses("executor", phase.id)} d="M 500 145 C 500 225 180 210 180 318" />
            <path className="workflow-cord workflow-cord__base workflow-cord--researcher" d="M 500 145 C 500 220 500 235 500 318" />
            <path className={cordClasses("researcher", phase.id)} d="M 500 145 C 500 220 500 235 500 318" />
            <path className="workflow-cord workflow-cord__base workflow-cord--reviewer" d="M 500 145 C 500 225 820 210 820 318" />
            <path className={cordClasses("reviewer", phase.id)} d="M 500 145 C 500 225 820 210 820 318" />
          </svg>
          <div className="workflow-demo__orchestrator">
            <WorkflowNode node={nodes[0]} scenario={scenario} phaseId={phase.id} />
          </div>
          <div className="workflow-demo__workers">
            <WorkflowNode node={nodes[1]} scenario={scenario} phaseId={phase.id} />
            <WorkflowNode node={nodes[2]} scenario={scenario} phaseId={phase.id} />
            <WorkflowNode node={nodes[3]} scenario={scenario} phaseId={phase.id} />
          </div>
        </div>
      ) : (
        <div className="workflow-demo__stage workflow-demo__stage--dashboard" data-phase={phase.id} aria-label={`Dashboard simulado na fase ${phase.label}`}>
          <article className="dash-mission">
            <span className="dash-mission__icon"><Target size={20} weight="duotone" aria-hidden="true" /></span>
            <span className="dash-mission__copy">
              <small>Missão em andamento</small>
              <b>{scenario.objective}</b>
            </span>
            <span className="dash-mission__phase">{phase.label}</span>
          </article>
          <div className="dash-grid">
            {nodes.map((node) => <DashboardCard key={node.id} node={node} scenario={scenario} phaseId={phase.id} onQuickAction={runQuickAction} />)}
          </div>
        </div>
      )}

      <footer className="workflow-demo__footer">
        <div className="workflow-demo__scenarios" aria-label="Cenários da demonstração">
          <span className="workflow-demo__scenario-label">Cenário</span>
          {scenarios.map((item) => <button key={item.id} type="button" className="workflow-demo__scenario" aria-pressed={scenarioId === item.id} onClick={() => chooseScenario(item.id)}>{item.label}</button>)}
        </div>
        <button type="button" className="workflow-demo__control" aria-label={reducedMotion ? "Avançar para a próxima etapa" : userPaused ? "Retomar demonstração" : "Pausar demonstração"} aria-pressed={reducedMotion ? undefined : userPaused} onClick={controlDemo}>{reducedMotion || userPaused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}{reducedMotion ? "Próxima etapa" : userPaused ? "Retomar" : "Pausar"}</button>
      </footer>
    </div>

    <span className="workflow-demo__live" aria-live="polite" aria-atomic="true">{announcement}</span>
    <p className="workflow-demo__note">Demonstração visual — não representa uma execução ao vivo. Pedidos reais passam pelo broker local apenas entre agentes conectados.</p>
  </section>;
}

export default WorkflowDemo;
