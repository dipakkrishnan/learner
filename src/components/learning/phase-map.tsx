"use client";

import type { PhaseStatus } from "@/lib/engine/learning-path";

interface PhaseMapProps {
  phases: PhaseStatus[];
  onSelectPhase: (phaseId: string) => void;
}

export function PhaseMap({ phases, onSelectPhase }: PhaseMapProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      {phases.map((phase, index) => (
        <div key={phase.phaseId} className="flex flex-col items-center">
          {/* Connector line */}
          {index > 0 && (
            <div
              className={`w-0.5 h-8 ${
                phase.status !== "locked"
                  ? "bg-indigo-300 dark:bg-indigo-700"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            />
          )}

          {/* Phase node */}
          <button
            onClick={() =>
              phase.status !== "locked" && onSelectPhase(phase.phaseId)
            }
            disabled={phase.status === "locked"}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              phase.status === "completed"
                ? "bg-green-100 dark:bg-green-900/40 ring-4 ring-green-400 dark:ring-green-600"
                : phase.status === "unlocked"
                  ? "bg-indigo-100 dark:bg-indigo-900/40 ring-4 ring-indigo-400 dark:ring-indigo-600 hover:scale-105 cursor-pointer"
                  : "bg-zinc-100 dark:bg-zinc-800 ring-2 ring-zinc-300 dark:ring-zinc-700 opacity-50 cursor-not-allowed"
            }`}
          >
            {/* Mastery ring overlay */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 36 36"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-transparent"
              />
              {phase.mastery > 0 && (
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${phase.mastery} ${100 - phase.mastery}`}
                  strokeLinecap="round"
                  className={
                    phase.status === "completed"
                      ? "text-green-500"
                      : "text-indigo-500"
                  }
                />
              )}
            </svg>

            {/* Phase number / icon */}
            <span className="relative z-10 text-lg font-bold text-zinc-700 dark:text-zinc-300">
              {phase.status === "locked" ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ) : phase.status === "completed" ? (
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                phase.order
              )}
            </span>
          </button>

          {/* Label */}
          <div className="mt-2 text-center">
            <p
              className={`text-sm font-medium ${
                phase.status === "locked"
                  ? "text-zinc-400"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {phase.name}
            </p>
            {phase.status !== "locked" && (
              <p className="text-xs text-zinc-400">{phase.mastery}% mastery</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
