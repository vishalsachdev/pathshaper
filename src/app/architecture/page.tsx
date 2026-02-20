export default function Architecture() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase mb-2">Deliverable 01</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Conceptual Learning Architecture</h1>
      <p className="text-gray-500 mb-12 max-w-2xl">
        How outcomes, pathways, AI supports, and faculty oversight interact in the Learning 3.0 model.
      </p>

      {/* Three-layer architecture */}
      <div className="space-y-4">
        {/* Faculty Layer */}
        <div className="layer layer-faculty animate-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-faculty">Faculty Layer</span>
            <span className="text-xs text-gray-500">Authority &amp; Design</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { title: "Define Outcomes", items: ["Learning objectives", "Competency thresholds", "Bloom's alignment"] },
              { title: "Set Constraints", items: ["Acceptable evidence types", "Assessment rubrics", "AI guardrails"] },
              { title: "Curate Resources", items: ["Vetted resource pools", "Misconception maps", "Practice activities"] },
            ].map((col) => (
              <div key={col.title} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-sm text-blue-800 mb-2">{col.title}</h3>
                <ul className="space-y-1">
                  {col.items.map((item) => (
                    <li key={item} className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Connectors - Faculty to AI */}
        <div className="flex justify-center gap-16 py-1">
          {["Outcomes & Thresholds", "Resource Pools", "Guardrails"].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <svg className="w-5 h-8 text-gray-300" viewBox="0 0 20 32">
                <path d="M10 0 L10 24 L5 19 M10 24 L15 19" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-[10px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* AI Layer */}
        <div className="layer layer-ai animate-in animate-in-delay-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-ai">AI Layer</span>
            <span className="text-xs text-gray-500">Adaptation &amp; Personalization</span>
          </div>
          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { title: "Diagnose", desc: "Assess prior knowledge and identify gaps" },
              { title: "Recommend", desc: "Match resources to individual needs" },
              { title: "Adapt", desc: "Adjust pathways based on progress" },
              { title: "Report", desc: "Surface patterns back to faculty" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-sm text-purple-800 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Connectors - AI to Learner */}
        <div className="flex justify-center gap-16 py-1">
          {["Personalized Paths", "Gap Analysis", "Progress Data"].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <svg className="w-5 h-8 text-gray-300" viewBox="0 0 20 32">
                <path d="M10 0 L10 24 L5 19 M10 24 L15 19" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-[10px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Learner Layer */}
        <div className="layer layer-learner animate-in animate-in-delay-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-learner">Learner Layer</span>
            <span className="text-xs text-gray-500">Navigation &amp; Demonstration</span>
          </div>
          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { title: "Diagnostic", desc: "AI-generated assessment of starting point" },
              { title: "Pathway", desc: "Individualized sequence of resources and practice" },
              { title: "Practice", desc: "Activities aligned to specific gaps" },
              { title: "Assessment", desc: "Demonstrate competency to faculty standards" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-sm text-amber-800 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback loop */}
        <div className="flex justify-center py-2">
          <div className="flex items-center gap-3 bg-gray-50 border border-dashed border-gray-300 rounded-full px-6 py-2">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-xs text-gray-500">Learner progress and patterns feed back to faculty for continuous improvement</span>
          </div>
        </div>
      </div>

      {/* Key Principles */}
      <div className="mt-16 grid sm:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">What stays fixed</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Learning outcomes — defined by faculty, aligned to program goals</li>
            <li>Competency thresholds — uniform standard regardless of path</li>
            <li>Assessment rigor — faculty-designed rubrics, faculty-reviewed evidence</li>
            <li>Academic integrity — same standards, all pathways</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">What becomes adaptive</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Starting point — diagnostic identifies where each learner begins</li>
            <li>Resource sequence — matched to individual gaps and strengths</li>
            <li>Pace — learners demonstrating competency move forward faster</li>
            <li>Practice intensity — more practice where gaps persist</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
