# Learning 3.0 Dark Factory Prototype

**Full Conversation Summary (Feb 2026)**
**Focus: Final Production-Ready Stack** (Claude-Flow + RuVector + Dan McCreary + 5 NLSpecs)

---

## 1. How the Conversation Started

- Asked about **recent discussions on Scenario-Driven Development (SDD)**.
- Explained SDD/BDD roots + 2025-2026 AI-agent revival (LangWatch/scenario, autonomous driving papers).
- Referenced a company that said **"humans should not write code"** and **"spend >= $1,000/day per engineer in API credits"**.
- That led directly to **StrongDM's "Software Factory / Dark Factory" manifesto** (Feb 6-10 2026), their rules ("Code must not be written or reviewed by humans"), and the open-source **Attractor** repo (pure Markdown NLSpecs + DOT pipelines).

## 2. Proposal & Mental Models

Shared the **Disruption Lab proposal** ("Prototyping Learning 3.0 - Faculty and T&L Staff as 'Shapers on the Path'").

Key idea:

- Faculty define **only** outcomes, thresholds, misconceptions, evidence types, guardrails.
- AI handles personalized pathways, gap detection, resources, progress surfacing.
- Faculty remain authoritative "shapers" - never replaced.

Mapped to:

- **Domain-Driven Design (DDD)** - Faculty Shaper as Core Domain, Learning Graph as Ubiquitous Language.
- **StrongDM Dark Factory (Level 5)** - Humans write NLSpecs (holdouts); agents do everything in the dark; probabilistic satisfaction scoring on Digital Twin trajectories.
- **Dan McCreary's Intelligent Textbooks (5 Levels, Nov 2024-Feb 2026)** - Perfect fit for "curated resources" -> Level 3 (adaptive graph) + Level 4 (GraphRAG chatbot).

## 3. Building the Specs

Created **StrongDM-style Natural Language Specifications (NLSpecs)** - humans-only artifacts that agents consume.

**Final set of 5 NLSpecs** (ready to clone into a repo and feed to any agent):

1. **shaper-context-spec.md** - Faculty-owned outcomes, thresholds, guardrails, high-level outline.
2. **textbook-generator-context-spec.md** - Dan McCreary's exact 12-step workflow (intelligent-textbook skill + course-analyzer, learning-graph-generator, chapter-content, quiz, microsim-p5, etc.).
3. **adaptive-intelligent-textbook-engine-spec.md** - Level 3-4 runtime (personal learning graph, GraphRAG chatbot, pathway orchestration).
4. **shaper-oversight-dashboard-spec.md** - Only human interface (aggregated patterns, risk flags, one-click regeneration).
5. **ruvector-knowledge-context-spec.md** - Persistent self-learning memory layer (see below).

**Starter Attractor/Ruflo pipeline** (`.dot`):

```dot
shaper → TextbookGeneratorQueen (Dan 12-step) → AdaptiveEngine Swarm → DigitalTwin → Satisfaction Scoring → Shaper Dashboard
```

---

## 4. Final Architecture - The Production-Ready Stack (Feb 21 2026)

This is the **strongest, most replicable blueprint**. It combines everything into a living, self-improving Learning 3.0 Dark Factory.

### Core Tools (all open-source, actively maintained Feb 2026)

| Tool | Role | Why It's Perfect |
|------|------|------------------|
| **Claude-Flow (Ruflo v3)** | Swarm orchestration, hierarchical agents, self-learning (SONA + ReasoningBank + RL), MCP native inside Claude Code | Turns static NLSpecs into dynamic, self-improving swarms. One-command bootstrap. |
| **RuVector** | Self-optimizing vector + graph DB (HNSW + full Cypher + GNN attention + Query DAG) | Shared persistent memory for Learning Graph, embeddings, per-learner overlays, trajectories. Gets smarter with every use. |
| **Dan McCreary Intelligent Textbooks** | Content generation (12-step from outline -> full MkDocs textbook with graph, MicroSims, quizzes) | Populates "curated resources" automatically while staying 100% grounded in faculty NLSpecs. |
| **Our 5 NLSpecs** | Human-only holdouts & domain language | Faculty authority preserved; agents never touch or modify them. |

### How Everything Connects

- Faculty drops **high-level outline + outcomes** into `CLAUDE.md` (Ruflo governance file).
- **TextbookGeneratorQueen swarm** (Ruflo) runs Dan's 12-step skills -> builds textbook + embeds everything into **RuVector**.
- **AdaptiveEngine swarm** reads RuVector -> delivers personalized Level 3-4 experience (GraphRAG chatbot + adaptive pathways).
- **Digital Twin swarm** runs thousands of trajectories against RuVector -> probabilistic satisfaction scoring.
- **Shaper Dashboard** surfaces GNN attention scores and Cypher-derived risk flags from RuVector.
- Any Shaper update -> full regeneration loop (in the dark).

**Bootstrap command:**

```bash
npx ruflo@alpha init --wizard
# Then:
codeagent> Initialize Ruflo v3 + RuVector for Learning 3.0.
Use the five NLSpecs (paste them).
Spawn TextbookGeneratorQueen using Dan McCreary skills.
Connect every swarm to the RuVector instance.
Generate first textbook for Gies MBA "Strategic Decision Making".
```

---

## 5. Why This Stack Wins for the Disruption Lab Proposal

- **Exactly matches the vision**: Faculty = Shaper only; AI does the rest.
- **Demo-ready in days**: One full intelligent textbook + adaptive pathway in <1 hour.
- **Self-improving**: RuVector GNN + Ruflo RL make the system get better with every learner and every regeneration.
- **Production-grade**: Raft consensus, cryptographic proofs, FERPA-safe aggregation, accreditation export.
- **Future-proof**: Level 3-4 today -> Level 5 (fully autonomous) tomorrow with zero refactor.

This is the complete, end-to-end blueprint.

### Ready-to-clone repo structure

```
gies-learning-3.0/
├── CLAUDE.md                  # Shaper Context
├── specs/
│   ├── shaper-context-spec.md
│   ├── textbook-generator-context-spec.md
│   ├── adaptive-intelligent-textbook-engine-spec.md
│   ├── shaper-oversight-dashboard-spec.md
│   └── ruvector-knowledge-context-spec.md
├── pipeline.dot
└── README.md                  # bootstrap instructions above
```

### Next Steps

1. Full paste of all 5 NLSpecs + CLAUDE.md example.
2. Sample faculty outline for a real Gies course + one-click generation command.
3. One-page architecture diagram description (for proposal slide).
