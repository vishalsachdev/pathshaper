import { outcomes, misconceptions, evidenceTypes, resources, courseTitle, courseContext } from "@/data/worked-example";

export default function Example() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-sm font-semibold text-amber-600 tracking-widest uppercase mb-2">Deliverable 02</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Worked Example</h1>
      <p className="text-gray-500 mb-1">{courseTitle}</p>
      <p className="text-xs text-gray-400 mb-10">{courseContext}</p>

      {/* What Faculty Define */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="badge badge-faculty">Faculty-Defined</span>
          Learning Outcomes &amp; Competency Thresholds
        </h2>
        <div className="grid gap-4">
          {outcomes.map((o) => (
            <div key={o.id} className="card border-l-4 border-blue-500">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-blue-500 font-bold">{o.id}</span>
                    <h3 className="font-semibold text-gray-900">{o.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{o.bloomLevel}</span>
                  </div>
                  <p className="text-sm text-gray-600">{o.description}</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 mt-3">
                <p className="text-xs font-semibold text-blue-800 mb-1">Competency Threshold</p>
                <p className="text-xs text-blue-700">{o.competencyThreshold}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Misconceptions */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Common Misconceptions &amp; Challenges</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {misconceptions.map((m) => {
            const outcome = outcomes.find((o) => o.id === m.outcomeId);
            return (
              <div key={m.id} className="card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-gray-400">{m.outcomeId}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    m.frequency === "Common" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                  }`}>{m.frequency}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">{m.description}</p>
                <p className="text-xs text-gray-500"><strong>Remediation:</strong> {m.remediation}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Evidence Types */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Acceptable Forms of Evidence</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Outcome</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Description</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Rigor</th>
              </tr>
            </thead>
            <tbody>
              {evidenceTypes.map((e) => (
                <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-xs text-blue-500">{e.outcomeId}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{e.type}</td>
                  <td className="py-3 px-4 text-gray-600">{e.description}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      e.rigorLevel === "Advanced" ? "bg-purple-50 text-purple-600" :
                      e.rigorLevel === "Proficient" ? "bg-blue-50 text-blue-600" :
                      "bg-gray-100 text-gray-600"
                    }`}>{e.rigorLevel}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Resource Pool */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Curated Resource Pool</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {resources.map((r) => (
            <div key={r.id} className="card">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  r.type === "Case Study" ? "bg-amber-50 text-amber-700" :
                  r.type === "Interactive" ? "bg-purple-50 text-purple-700" :
                  r.type === "Video" ? "bg-sky-50 text-sky-700" :
                  r.type === "Practice Set" ? "bg-green-50 text-green-700" :
                  "bg-gray-100 text-gray-600"
                }`}>{r.type}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  r.difficulty === "Advanced" ? "bg-red-50 text-red-600" :
                  r.difficulty === "Intermediate" ? "bg-amber-50 text-amber-600" :
                  "bg-green-50 text-green-600"
                }`}>{r.difficulty}</span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">{r.title}</h4>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{r.estimatedMinutes} min</span>
                <span>Covers: {r.outcomes.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
