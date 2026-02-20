export default function Workflow() {
  const columns = [
    {
      title: "Faculty Define",
      color: "blue",
      badge: "badge-faculty",
      desc: "Human expertise shapes the learning system. These decisions require pedagogical judgment, disciplinary knowledge, and institutional context.",
      items: [
        { label: "Learning Outcomes", detail: "What learners must know and be able to do — aligned to program goals and accreditation standards." },
        { label: "Competency Thresholds", detail: "The minimum standard of evidence that demonstrates mastery. Uniform across all learners regardless of path." },
        { label: "Common Misconceptions", detail: "Known points of confusion informed by teaching experience. Guides AI in diagnostic design." },
        { label: "Acceptable Evidence", detail: "What forms of demonstration count — written analysis, presentations, calculations, discussions." },
        { label: "Assessment Rubrics", detail: "Criteria for evaluating evidence. Faculty-authored, applied consistently whether AI recommended the path or not." },
        { label: "Resource Curation", detail: "Vetted pool of readings, videos, cases, and activities. AI can recommend from this pool but cannot add to it." },
        { label: "AI Guardrails", detail: "What AI can and cannot do. Explicit constraints on recommendation scope, data usage, and escalation triggers." },
        { label: "Escalation Triggers", detail: "When AI must flag a learner for faculty attention — repeated failures, unusual patterns, edge cases." },
      ],
    },
    {
      title: "AI Adapts",
      color: "purple",
      badge: "badge-ai",
      desc: "Within faculty-defined constraints, AI personalizes the experience. Every AI action is logged and auditable.",
      items: [
        { label: "Diagnostic Assessment", detail: "Generates initial assessment to identify each learner's starting point across all outcomes." },
        { label: "Gap Identification", detail: "Analyzes diagnostic results to pinpoint specific knowledge gaps and misconceptions." },
        { label: "Path Recommendation", detail: "Sequences resources and practice from the curated pool based on individual learner needs." },
        { label: "Pace Adjustment", detail: "Learners demonstrating competency early skip unnecessary material. Those struggling get more practice." },
        { label: "Resource Matching", detail: "Recommends specific resources from the faculty-curated pool aligned to identified gaps." },
        { label: "Progress Tracking", detail: "Monitors learner progress against competency thresholds and surfaces aggregate patterns to faculty." },
        { label: "Misconception Detection", detail: "Identifies when learner responses match known misconception patterns and targets remediation." },
        { label: "Pattern Reporting", detail: "Aggregates class-wide data — where students struggle most, which resources are most effective." },
      ],
    },
    {
      title: "Human Judgment",
      color: "green",
      badge: "badge-human",
      desc: "Some decisions are irreducibly human. These remain with faculty, teaching assistants, or T&L staff.",
      items: [
        { label: "Summative Assessment", detail: "Final evaluation of competency evidence. AI may assist with logistics but faculty make the judgment call." },
        { label: "Edge Cases", detail: "Learners whose situations don't fit standard patterns — life circumstances, unusual backgrounds, accommodations." },
        { label: "Academic Integrity", detail: "Investigating potential integrity concerns, applying institutional policy, making fairness decisions." },
        { label: "Relationship Building", detail: "Mentoring, advising, motivating — the human dimension of education that AI cannot replicate." },
        { label: "Policy Exceptions", detail: "Deadline extensions, alternative arrangements, grade disputes — contextual decisions requiring human empathy." },
        { label: "System Refinement", detail: "Reviewing AI-surfaced patterns and deciding what to change — outcomes, resources, thresholds, or constraints." },
        { label: "Quality Assurance", detail: "Periodically reviewing AI recommendations to ensure they remain aligned with pedagogical intent." },
        { label: "Accreditation Evidence", detail: "Interpreting assessment data for continuous improvement reporting and accreditation documentation." },
      ],
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
    blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", dot: "bg-blue-400" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-900", dot: "bg-purple-400" },
    green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-900", dot: "bg-green-400" },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <p className="text-sm font-semibold text-green-600 tracking-widest uppercase mb-2">Deliverable 03</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Workflow Artifacts</h1>
      <p className="text-gray-500 mb-12 max-w-2xl">
        Clear delineation of responsibilities: what faculty define, what AI adapts, and what remains irreducibly human.
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {columns.map((col) => {
          const c = colorMap[col.color];
          return (
            <div key={col.title} className="space-y-4">
              <div className={`rounded-xl ${c.bg} border ${c.border} p-5`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge ${col.badge}`}>{col.title}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{col.desc}</p>
              </div>
              {col.items.map((item) => (
                <div key={item.label} className="card">
                  <div className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full ${c.dot} mt-1.5 flex-shrink-0`} />
                    <div>
                      <h4 className={`text-sm font-semibold ${c.text} mb-1`}>{item.label}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Key Insight */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-xl border border-gray-200 p-8">
        <h3 className="font-bold text-gray-900 mb-3">The Key Insight</h3>
        <p className="text-gray-700 leading-relaxed">
          Faculty authority <strong>increases</strong> in this model, not decreases. Instead of designing a fixed sequence
          that all learners follow identically, faculty define the <em>system</em> — the outcomes, the standards, the
          constraints, and the resources. This is harder and more consequential work than creating a slide deck.
          AI handles the logistical complexity of personalization, but only within the boundaries faculty set.
        </p>
      </div>
    </div>
  );
}
