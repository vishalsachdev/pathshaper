export default function ProgressPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Student Progress</h1>
      <p className="text-sm text-gray-500 mb-6">Mastery gauges per outcome from Supabase.</p>

      <div className="card text-center py-16">
        <p className="text-4xl mb-4">&#128202;</p>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Phase 3</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Student progress tracking requires Supabase integration with the survey bot.
          Connect survey sessions to concept mastery heuristics.
        </p>
      </div>
    </div>
  );
}
