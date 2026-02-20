import { governanceFramework } from "@/data/worked-example";

const icons: Record<string, string> = {
  outcomeValidation: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  assessmentIntegrity: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  aiConstraints: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  dataAndPrivacy: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  continuousImprovement: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
};

const colors = ["blue", "indigo", "purple", "teal", "emerald"];

export default function Governance() {
  const sections = Object.entries(governanceFramework);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-sm font-semibold text-rose-600 tracking-widest uppercase mb-2">Deliverable 05</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Governance &amp; Rigor Alignment</h1>
      <p className="text-gray-500 mb-12 max-w-2xl">
        How the Learning 3.0 model supports accreditation, assessment integrity, and academic standards.
      </p>

      {/* Framework sections */}
      <div className="space-y-6">
        {sections.map(([key, section], idx) => (
          <div key={key} className="card border-l-4" style={{ borderLeftColor: `var(--tw-${colors[idx]}-500, #6366f1)` }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[key]} />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{section.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {section.mechanisms.map((m, i) => (
                    <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-xs text-gray-700">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AACSB Mapping */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">AACSB Alignment</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">AACSB Standard</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Traditional Model</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Learning 3.0 Model</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  standard: "Assurance of Learning (AoL)",
                  traditional: "Course-level assessments with uniform instruments.",
                  learning3: "Outcome-level competency evidence collected across multiple assessment types. Richer, more varied evidence of learning.",
                },
                {
                  standard: "Curriculum Management",
                  traditional: "Fixed syllabus reviewed periodically.",
                  learning3: "Living learning architecture with continuous data on resource effectiveness and learner pathways.",
                },
                {
                  standard: "Faculty Qualifications & Engagement",
                  traditional: "Faculty as content deliverers measured by teaching evaluations.",
                  learning3: "Faculty as learning system designers. Higher-order pedagogical work with measurable impact.",
                },
                {
                  standard: "Continuous Improvement",
                  traditional: "Annual program review with lagging indicators.",
                  learning3: "Real-time pathway data. Misconception detection feeds back into course redesign. Evidence-based iteration.",
                },
                {
                  standard: "Learner Success",
                  traditional: "One-size-fits-all with optional tutoring.",
                  learning3: "Proactive gap identification and personalized support. Struggling learners detected and escalated earlier.",
                },
              ].map((row) => (
                <tr key={row.standard} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900 align-top">{row.standard}</td>
                  <td className="py-4 px-4 text-gray-500 align-top">{row.traditional}</td>
                  <td className="py-4 px-4 text-gray-700 align-top">{row.learning3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Closing principle */}
      <div className="mt-16 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-gray-200 p-8">
        <h3 className="font-bold text-gray-900 mb-3">The Governance Principle</h3>
        <p className="text-gray-700 leading-relaxed">
          Adaptive pathways do not mean adaptive standards. Every learner must meet the same competency
          thresholds, evaluated against the same rubrics, regardless of the route they took to get there.
          The flexibility is in the journey — not the destination.
        </p>
        <p className="text-gray-700 leading-relaxed mt-3">
          Faculty govern the <em>what</em> and the <em>how well</em>. AI manages the <em>which route</em> and <em>when</em>.
          This separation makes the model auditable, defensible, and aligned with institutional standards.
        </p>
      </div>
    </div>
  );
}
