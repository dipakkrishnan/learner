"use client";

import type { ReviewResult } from "@/types/learning";

interface SessionSummaryProps {
  results: ReviewResult[];
  totalCards: number;
}

export function SessionSummary({ results, totalCards }: SessionSummaryProps) {
  const goodOrBetter = results.filter((r) => r.rating >= 3).length;
  const accuracy = totalCards > 0 ? Math.round((goodOrBetter / totalCards) * 100) : 0;
  const avgTime = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.responseTimeMs, 0) / results.length / 1000)
    : 0;

  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  results.forEach((r) => {
    ratingCounts[r.rating]++;
  });

  return (
    <div className="max-w-md mx-auto text-center space-y-8 py-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Session Complete!
        </h2>
        <p className="text-zinc-500 mt-1">
          You reviewed {totalCards} card{totalCards !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Accuracy ring */}
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-zinc-200 dark:text-zinc-800"
          />
          <circle
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${accuracy} ${100 - accuracy}`}
            strokeLinecap="round"
            className="text-indigo-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {accuracy}%
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-600">{goodOrBetter}</p>
          <p className="text-xs text-green-600/70">Got it</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
          <p className="text-2xl font-bold text-orange-600">
            {totalCards - goodOrBetter}
          </p>
          <p className="text-xs text-orange-600/70">Needs review</p>
        </div>
      </div>

      <p className="text-sm text-zinc-400">
        Avg. {avgTime}s per card
      </p>
    </div>
  );
}
