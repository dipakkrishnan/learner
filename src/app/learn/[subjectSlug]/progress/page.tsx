"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProgressRing } from "@/components/learning/progress-ring";
import { syncDemoUser } from "@/lib/client/demo-user";

interface PhaseProgress {
  phaseId: string;
  phaseName: string;
  phaseOrder: number;
  mastery: number;
  cardsLearned: number;
  totalCards: number;
}

export default function ProgressPage() {
  const params = useParams();
  const router = useRouter();
  const subjectSlug = params.subjectSlug as string;

  const [phases, setPhases] = useState<PhaseProgress[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    syncDemoUser()
      .then(() => fetch(`/api/progress?subjectSlug=${subjectSlug}`))
      .then((r) => r.json())
      .then((data) => {
        setPhases(data.phases ?? []);
        setStreak(data.streak ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [subjectSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Loading progress...
      </div>
    );
  }

  const overallMastery =
    phases.length > 0
      ? Math.round(phases.reduce((s, p) => s + p.mastery, 0) / phases.length)
      : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Back button */}
        <button
          onClick={() => router.push(`/learn/${subjectSlug}`)}
          className="text-sm text-zinc-500 hover:text-zinc-700 flex items-center gap-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Your Progress
        </h1>

        {/* Overall stats */}
        <div className="flex items-center gap-8 justify-center py-4">
          <ProgressRing value={overallMastery} size={120} label="Overall" />
          <div className="text-center">
            <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              {streak}
            </p>
            <p className="text-sm text-zinc-500">Day streak</p>
          </div>
        </div>

        {/* Phase breakdown */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            By Phase
          </h2>
          {phases.map((phase) => (
            <div
              key={phase.phaseId}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    Phase {phase.phaseOrder}: {phase.phaseName}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {phase.cardsLearned} / {phase.totalCards} cards learned
                  </p>
                </div>
                <span className="text-sm font-semibold text-indigo-600">
                  {phase.mastery}%
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${phase.mastery}%` }}
                />
              </div>
            </div>
          ))}

          {phases.length === 0 && (
            <p className="text-center text-zinc-400 py-8">
              No progress yet. Start a session to begin!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
