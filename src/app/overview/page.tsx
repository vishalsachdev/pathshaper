import generationLog from "@/data/specs/generation-log.json";
import { concepts, coreConcepts, studioConcepts } from "@/data/learning-graph";
import courseSpec from "@/data/specs/course-spec.json";

export default function OverviewPage() {
  const reqs = generationLog.requests;
  const approved = reqs.filter((r) => r.status === "approved").length;
  const inReview = reqs.filter((r) => r.status === "review").length;
  const chapters = reqs.filter((r) => r.target === "chapter");
  const chaptersReady = chapters.filter((r) => r.status === "approved" || r.status === "review").length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold mb-2">
          Disruption Lab Prototype
        </p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          PathShaper 554
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Prototyping <strong>Learning 3.0</strong> for BADM 554: Data Foundations
        </p>
        <p className="text-sm text-gray-400 mt-1">
          MSBAi &middot; Fall 2026 &middot; 8 weeks &middot; Online
        </p>
      </div>

      {/* The idea */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">The Idea</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          From &ldquo;sage on the stage&rdquo; &rarr; &ldquo;guide on the side&rdquo; &rarr;{" "}
          <strong>&ldquo;shaper on the path.&rdquo;</strong> Faculty define learning outcomes,
          competency thresholds, misconceptions, guardrails, and curated resources.
          AI generates content and personalizes pathways. Faculty approve everything.
          The path is adaptive; the standards are fixed.
        </p>
      </section>

      {/* Mental Models */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Mental Models &amp; Influences
        </h2>
        <div className="space-y-4">
          <ModelCard
            title="NLSpec (Natural Language Specification)"
            description="Faculty express course intent as structured JSON — outcomes, misconceptions, guardrails, evidence types. AI agents read these specs to generate content. Faculty reviews and approves. The spec is the contract between human judgment and machine generation."
            origin="PathShaper original"
          />
          <ModelCard
            title="Intelligent Textbook"
            description="Dan McCreary's framework for textbooks that go beyond static PDFs. A 186-concept dependency graph (DAG) powers adaptive sequencing. Content is generated via Claude Code skills — chapters, quizzes, MicroSims, studio guides — all traced back to concepts."
            origin="Dan McCreary"
            links={[
              { label: "Claude Skills repo", href: "https://github.com/dmccreary/claude-skills" },
              { label: "Framework docs", href: "https://dmccreary.github.io/claude-skills/" },
            ]}
          />
          <ModelCard
            title="L-C-E Framework (Literacy \u2192 Competency \u2192 Expertise)"
            description="MSBAi's progression model adapted from the UNESCO AI competency framework. Each learning outcome is tagged with an L-C-E level and a Bloom's verb. BADM 554 covers L\u2192C; later courses deepen to E. This gives the program a coherent vertical arc across 5 semesters."
            origin="UNESCO / MSBAi"
          />
          <ModelCard
            title="AIAS (AI Assessment Integration Scale)"
            description="A 0\u20133 scale printed on every assignment that tells students exactly how they may use AI. Level 0 = no AI (quizzes, oral defense). Level 2 = AI-assisted with attribution. Level 3 = AI as collaborator with full disclosure. Prevents ambiguity and enables progressive AI trust."
            origin="MSBAi assessment design"
          />
          <ModelCard
            title="Core vs Studio Split"
            description="Core concepts are durable knowledge delivered in videos (long shelf life). Studio concepts are applied skills — tool demos, AI workflows, pair exercises — with short shelf life. Studios are the personalization surface: different students can follow different studio paths while covering identical core content."
            origin="PathShaper original"
          />
          <ModelCard
            title="Spiral Curriculum"
            description="Each concept is tagged introduce / practice / deepen. A concept introduced in Week 2 is practiced in a project that same course, then deepened in a later MSBAi course (BADM 558, FIN 550). The graph encodes where each concept sits in the spiral."
            origin="Jerome Bruner (1960)"
          />
          <ModelCard
            title="Survey Bot \u2192 Learner Profiles"
            description="A WhatsApp-based survey bot conducts automated interviews (68 sessions so far) to build student skill profiles before the course starts. These profiles feed the adaptive pathway engine — different starting points and studio sequences based on incoming skill gaps."
            origin="BADM 554 research"
            links={[
              { label: "Survey bot repo", href: "https://github.com/vishalsachdev/badm554-survey-bot" },
            ]}
          />
          <ModelCard
            title="Two-Phase Architecture"
            description="Phase 1 (Instructor): Faculty defines intent via NLSpec, agents generate content, faculty approves, content pushes to Canvas. Phase 2 (Student): Course is delivered, agents personalize pathways based on learner profiles, mastery tracking drives concept-level feedback."
            origin="PathShaper original"
          />
        </div>
      </section>

      {/* Connected repos */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Connected Projects
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <RepoCard
            name="pathshaper"
            description="This app. Instructor cockpit + generation dashboard + adaptive pathway viewer."
            href="https://github.com/vishalsachdev/pathshaper"
          />
          <RepoCard
            name="database-management"
            description="Intelligent textbook for BADM 554. 8 chapters, 186-concept learning graph, MkDocs Material."
            href="https://github.com/vishalsachdev/database-management"
          />
          <RepoCard
            name="badm554-bot"
            description="WhatsApp AI tutor (production). LLM-powered concept-level support for enrolled students."
            href="https://github.com/vishalsachdev/badm554-bot"
          />
          <RepoCard
            name="badm554-survey-bot"
            description="Pre-course learner profiling. 68 automated interview sessions, skill gap analysis."
            href="https://github.com/vishalsachdev/badm554-survey-bot"
          />
        </div>
      </section>

      {/* What faculty define */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          What Faculty Define (NLSpec Layer)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <SpecCard value={courseSpec.outcomes.length} label="Learning Outcomes" sub="L-C-E + Bloom's" />
          <SpecCard value={courseSpec.misconceptions.length} label="Misconceptions" sub="With remediations" />
          <SpecCard value={courseSpec.evidenceTypes.length} label="Evidence Types" sub="Mapped to Canvas" />
          <SpecCard value={courseSpec.guardrails.length} label="Guardrails" sub="FERPA, integrity, AI" />
          <SpecCard value={concepts.length} label="Concepts" sub={`${coreConcepts().length} core + ${studioConcepts().length} studio`} />
          <SpecCard value="DAG" label="Learning Graph" sub="186-node dependency graph" />
        </div>
      </section>

      {/* What's been built */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          What&rsquo;s Been Built
        </h2>
        <div className="space-y-3">
          <DeliverableRow
            status="done"
            title="Conceptual Learning Architecture"
            detail="186-concept DAG with 8 taxonomy categories, spiral tagging, core/studio split. Interactive graph viewer with filters."
            proposal="Proposal item 1: diagrams showing how outcomes, pathways, AI, and faculty interact"
          />
          <DeliverableRow
            status="done"
            title="Worked Example: BADM 554"
            detail={`Full 8-week course redesigned as a learning system. ${chaptersReady} of ${chapters.length} textbook chapters written. 40 content items tracked in generation dashboard.`}
            proposal="Proposal item 2: one course redesigned using the shaper model"
          />
          <DeliverableRow
            status="done"
            title="Faculty Workflow Artifacts"
            detail="NLSpec JSON files (outcomes, misconceptions, evidence, guardrails). Instructor cockpit with specs viewer, generation dashboard, and Canvas module manager."
            proposal="Proposal item 3: what faculty define, what AI adapts, what remains human judgment"
          />
          <DeliverableRow
            status="partial"
            title="Learner Experience Mockups"
            detail="3 holdout student profiles with adaptive pathway viewer. Mastery gauges and concept timeline. Supabase integration pending."
            proposal="Proposal item 4: how a learner encounters adaptive pathways"
          />
          <DeliverableRow
            status="partial"
            title="Governance & Rigor Alignment"
            detail="8 guardrails defined (FERPA, integrity, AI constraints). AIAS levels per assignment. L-C-E framework alignment with MSBAi accreditation."
            proposal="Proposal item 5: how this supports accreditation and academic standards"
          />
        </div>
      </section>

      {/* Progress snapshot */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Content Generation Progress
        </h2>
        <div className="card">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1">
              <div className="gauge-track h-3">
                <div
                  className="gauge-fill bg-green-500 h-3"
                  style={{ width: `${Math.round(((approved + inReview) / reqs.length) * 100)}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-bold text-gray-700">
              {approved + inReview} / {reqs.length}
            </span>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <span><span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1" />{approved} approved</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1" />{inReview} in review</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-gray-300 mr-1" />{reqs.length - approved - inReview} pending</span>
          </div>
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2 text-xs">
            {(["chapter", "overview", "quiz", "studio_guide", "lab", "discussion"] as const).map((target) => {
              const items = reqs.filter((r) => r.target === target);
              const done = items.filter((r) => r.status === "approved" || r.status === "review").length;
              const labels: Record<string, string> = {
                chapter: "Chapters", overview: "Overviews", quiz: "Quizzes",
                studio_guide: "Studio Guides", lab: "Labs/Rubrics", discussion: "Discussions",
              };
              return (
                <div key={target} className="bg-gray-50 rounded-lg p-2 text-center">
                  <span className="font-bold text-gray-700">{done}/{items.length}</span>
                  <p className="text-gray-400 mt-0.5">{labels[target]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Two-Phase Architecture
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="layer layer-faculty">
            <h3 className="text-sm font-bold text-blue-800 mb-2">Phase 1: Instructor</h3>
            <p className="text-xs text-blue-700 leading-relaxed">
              Faculty specifies intent via NLSpec files. AI agents generate chapters, quizzes,
              labs, and studio guides. Faculty reviews and approves. Content pushes to Canvas.
            </p>
            <p className="text-[10px] text-blue-500 mt-2 font-semibold">STATUS: IN PROGRESS</p>
          </div>
          <div className="layer layer-learner">
            <h3 className="text-sm font-bold text-amber-800 mb-2">Phase 2: Student</h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              Course delivered via Canvas. AI personalizes pathways based on learner profiles
              from survey bot (68 sessions). Adaptive practice, mastery tracking, concept-level feedback.
            </p>
            <p className="text-[10px] text-amber-500 mt-2 font-semibold">STATUS: PLANNED</p>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Stack</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Next.js 15 &middot; React 19 &middot; TypeScript &middot; Tailwind CSS 4 &middot; Vercel &middot;
          Canvas MCP &middot; Claude Code (content generation) &middot; Supabase (student data, Phase 2) &middot;
          vis-network (graph visualization)
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 pt-6 text-xs text-gray-400">
        <p>
          PathShaper 554 &mdash; A Disruption Lab prototype by Vishal Sachdev
        </p>
        <p className="mt-1">
          Gies College of Business &middot; University of Illinois Urbana-Champaign
        </p>
      </footer>
    </div>
  );
}

function SpecCard({ value, label, sub }: { value: number | string; label: string; sub: string }) {
  return (
    <div className="card text-center py-3">
      <p className="text-xl font-bold text-[var(--navy)]">{value}</p>
      <p className="text-xs font-medium text-gray-700">{label}</p>
      <p className="text-[10px] text-gray-400">{sub}</p>
    </div>
  );
}

function DeliverableRow({
  status,
  title,
  detail,
  proposal,
}: {
  status: "done" | "partial" | "planned";
  title: string;
  detail: string;
  proposal: string;
}) {
  const icons = {
    done: { bg: "bg-green-100", text: "text-green-600", symbol: "\u2713" },
    partial: { bg: "bg-amber-100", text: "text-amber-600", symbol: "\u25D4" },
    planned: { bg: "bg-gray-100", text: "text-gray-500", symbol: "\u25CB" },
  };
  const icon = icons[status];
  return (
    <div className="flex gap-3">
      <span className={`w-6 h-6 rounded-full ${icon.bg} ${icon.text} flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5`}>
        {icon.symbol}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{detail}</p>
        <p className="text-[10px] text-gray-400 mt-1 italic">{proposal}</p>
      </div>
    </div>
  );
}

function ModelCard({
  title,
  description,
  origin,
  links,
}: {
  title: string;
  description: string;
  origin: string;
  links?: { label: string; href: string }[];
}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap mt-0.5">{origin}</span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      {links && links.length > 0 && (
        <div className="flex gap-3 mt-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium text-[var(--navy)] hover:underline"
            >
              {link.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function RepoCard({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card block hover:ring-1 hover:ring-[var(--navy)]/20 transition-shadow"
    >
      <p className="text-xs font-bold text-[var(--navy)] font-mono">{name}</p>
      <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{description}</p>
    </a>
  );
}
