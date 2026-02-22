import generationLog from "@/data/specs/generation-log.json";

export default function GeneratePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Content Generation</h1>
      <p className="text-sm text-gray-500 mb-6">
        Generate chapters, quizzes, and MicroSims using Claude Code skills. Review and approve before pushing to Canvas.
      </p>

      <div className="card text-center py-16">
        <p className="text-4xl mb-4">&#9881;</p>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Phase 2</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Content generation via Dan McCreary skills will be built in Phase 2.
          The generation log currently has {generationLog.requests.length} requests.
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Chapters 4-9 &middot; Quizzes per week &middot; MicroSims &middot; Studio guides
        </p>
      </div>
    </div>
  );
}
