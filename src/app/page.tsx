import Link from "next/link";

const deliverables = [
  {
    num: "01",
    title: "Conceptual Architecture",
    desc: "System diagram showing how outcomes, pathways, AI supports, and faculty oversight interact.",
    href: "/architecture",
    color: "border-blue-500",
    icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7",
  },
  {
    num: "02",
    title: "Worked Example",
    desc: "Financial Statement Analysis module redesigned with the shaper model — 5 outcomes, 3 learner profiles.",
    href: "/example",
    color: "border-amber-500",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    num: "03",
    title: "Faculty Workflow",
    desc: "Clear delineation of what faculty define, what AI adapts, and what remains human judgment.",
    href: "/workflow",
    color: "border-green-500",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    num: "04",
    title: "Learner Experience",
    desc: "Interactive mockup showing how three different learners encounter adaptive pathways to the same outcomes.",
    href: "/learner",
    color: "border-purple-500",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    num: "05",
    title: "Governance & Rigor",
    desc: "Framework showing how this model supports accreditation, assessment integrity, and academic standards.",
    href: "/governance",
    color: "border-rose-500",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-4">
            Disruption Lab Prototype
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Learning 3.0
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed max-w-3xl mb-8">
            From <span className="text-white/50 line-through">sage on the stage</span>{" "}
            to <span className="text-white/50 line-through">guide on the side</span>{" "}
            to <span className="text-[var(--gold)] font-semibold">shaper on the path</span>.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
              <p className="text-[var(--gold)] font-bold text-lg mb-1">Outcomes</p>
              <p className="text-white/70 text-sm">Fixed and explicit. Standards and rigor are non-negotiable.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
              <p className="text-[var(--gold)] font-bold text-lg mb-1">Paths</p>
              <p className="text-white/70 text-sm">Flexible, adaptive, and personalized to each learner.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
              <p className="text-[var(--gold)] font-bold text-lg mb-1">Faculty</p>
              <p className="text-white/70 text-sm">Shapers of the learning system — more intentional, more consequential.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Vision */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Most courses move all students through the same fixed sequence — same modules, same materials,
              same assessments — regardless of prior knowledge or professional experience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This is increasingly misaligned with adult learners, competency-based education,
              and the affordances of AI-enabled personalization.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Shift</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Faculty define <strong>what</strong> learners must achieve and <strong>how</strong> achievement
              is measured. AI helps learners find <strong>their</strong> path to those shared outcomes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Faculty authority <em>increases</em> — their expertise shapes the system itself,
              not just individual lessons.
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Prototype Deliverables</h2>
          <p className="text-gray-500 mb-10">Five artifacts exploring how faculty design learning differently when AI-enabled adaptivity is assumed.</p>

          <div className="grid gap-4">
            {deliverables.map((d) => (
              <Link key={d.href} href={d.href} className={`card flex items-start gap-5 border-l-4 ${d.color}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d.icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-gray-400">{d.num}</span>
                    <h3 className="font-semibold text-gray-900">{d.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{d.desc}</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What This Is / Is Not */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card border-l-4 border-green-500">
            <h3 className="font-bold text-gray-900 mb-3">This prototype is</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                A proof of concept, not a production system
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                Focused on learning design and systems architecture
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                Centered on faculty authority and outcomes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                Designed to be transferable across programs
              </li>
            </ul>
          </div>
          <div className="card border-l-4 border-red-400">
            <h3 className="font-bold text-gray-900 mb-3">This prototype is not</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">&#10007;</span>
                A replacement for faculty instruction
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">&#10007;</span>
                An automated course-in-a-box
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">&#10007;</span>
                A content-generation experiment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">&#10007;</span>
                A grading automation initiative
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--navy)] text-white/50 text-xs py-8 text-center">
        <p>PathShaper Prototype &middot; Disruption Lab &middot; Gies College of Business</p>
      </footer>
    </>
  );
}
