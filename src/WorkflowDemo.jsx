import { useEffect, useMemo, useRef, useState } from "react";
import {
  Binoculars,
  Brain,
  Lightning,
  Pause,
  Play,
  ShieldCheck,
} from "@phosphor-icons/react";

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

const nodes = [
  { id: "orchestrator", className: "workflow-node--orchestrator", role: "Orquestrador", name: "Exemplo · Codex", Icon: Brain },
  { id: "executor", className: "workflow-node--executor", role: "Executor", name: "Exemplo · OpenCode", Icon: Lightning },
  { id: "researcher", className: "workflow-node--researcher", role: "Pesquisador", name: "Exemplo · Hermes", Icon: Binoculars },
  { id: "reviewer", className: "workflow-node--reviewer", role: "Revisor", name: "Exemplo · Grok", Icon: ShieldCheck },
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

function taskFor(nodeId, scenario) {
  if (nodeId === "orchestrator") return scenario.objective;
  return scenario[nodeId];
}

function WorkflowNode({ node, scenario, phaseId }) {
  const state = nodeState(node.id, phaseId);
  const Icon = node.Icon;
  return <article className={`workflow-node ${node.className} is-${state}`} aria-label={`${node.role}, ${node.name}: ${stateLabel(state)}`}>
    <header className="workflow-node__head">
      <span className="workflow-node__icon"><Icon size={18} weight="duotone" aria-hidden="true" /></span>
      <span><small className="workflow-node__role">{node.role}</small><b className="workflow-node__name">{node.name}</b></span>
    </header>
    <p className="workflow-node__task">{taskFor(node.id, scenario)}</p>
    <span className="workflow-node__status"><i aria-hidden="true" />{stateLabel(state)}</span>
  </article>;
}

export function WorkflowDemo() {
  const sectionRef = useRef(null);
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [phaseIndex, setPhaseIndex] = useState(0);
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
      <p className="workflow-demo__eyebrow">Veja a orquestração acontecer</p>
      <h2 className="workflow-demo__title" id="workflow-demo-title">Um objetivo.<br />Quatro papéis.</h2>
      <p className="workflow-demo__copy">Escolha um cenário e acompanhe uma simulação visual. No aplicativo, cada bloco representa um agente e cada corda autoriza a comunicação entre eles.</p>
    </div>

    <div className="workflow-demo__shell">
      <header className="workflow-demo__topbar">
        <span className="workflow-demo__status"><i aria-hidden="true" />{scenario.label}: {phase.label}. {phase.detail}</span>
        <div className="workflow-demo__counters" aria-label="Resumo dos agentes"><span>{counters.active} {counters.active === 1 ? "ativo" : "ativos"}</span><span>{counters.waiting} aguardando</span><span>{counters.complete} {counters.complete === 1 ? "concluído" : "concluídos"}</span></div>
      </header>

      <div className="workflow-demo__stage" data-phase={phase.id} aria-label={`Canvas simulado na fase ${phase.label}`}>
        <WorkflowNode node={nodes[0]} scenario={scenario} phaseId={phase.id} />
        <div className={`workflow-link workflow-link--executor ${["delegate", "execute"].includes(phase.id) ? "is-active" : ""}`} aria-hidden="true" />
        <div className={`workflow-link workflow-link--researcher ${["delegate", "execute"].includes(phase.id) ? "is-active" : ""}`} aria-hidden="true" />
        <div className={`workflow-link workflow-link--reviewer ${["review", "consolidate"].includes(phase.id) ? "is-active" : ""}`} aria-hidden="true" />
        <WorkflowNode node={nodes[1]} scenario={scenario} phaseId={phase.id} />
        <WorkflowNode node={nodes[2]} scenario={scenario} phaseId={phase.id} />
        <WorkflowNode node={nodes[3]} scenario={scenario} phaseId={phase.id} />
      </div>

      <footer className="workflow-demo__scenarios" aria-label="Cenários da demonstração">
        {scenarios.map((item) => <button key={item.id} type="button" className="workflow-demo__scenario" aria-pressed={scenarioId === item.id} onClick={() => chooseScenario(item.id)}>{item.label}</button>)}
        <button type="button" className="workflow-demo__control" aria-label={reducedMotion ? "Avançar para a próxima etapa" : userPaused ? "Retomar demonstração" : "Pausar demonstração"} aria-pressed={reducedMotion ? undefined : userPaused} onClick={controlDemo}>{reducedMotion || userPaused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}{reducedMotion ? "Próxima etapa" : userPaused ? "Retomar" : "Pausar"}</button>
      </footer>
    </div>

    <span className="workflow-demo__live" aria-live="polite" aria-atomic="true">{announcement}</span>
    <p className="workflow-demo__note">Demonstração visual — não representa uma execução ao vivo. Pedidos reais passam pelo broker local apenas entre agentes conectados.</p>
  </section>;
}

export default WorkflowDemo;
