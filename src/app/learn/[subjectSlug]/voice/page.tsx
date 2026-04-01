"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RealtimeSession } from "@/components/voice/realtime-session";
import { getSubjectConfig } from "@/lib/subjects/registry";
import type { ConversationScenario } from "@/types/subject";

export default function VoicePage() {
  const params = useParams();
  const router = useRouter();
  const subjectSlug = params.subjectSlug as string;

  const [selectedScenario, setSelectedScenario] =
    useState<ConversationScenario | null>(null);

  const config = getSubjectConfig(subjectSlug);
  const scenarios = config.voiceConfig?.scenarios ?? [];

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 px-4">
        <RealtimeSession
          subjectSlug={subjectSlug}
          scenario={selectedScenario}
          onEnd={() => setSelectedScenario(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
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

        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Voice Practice
          </h1>
          <p className="text-zinc-500 mt-1">
            Choose a scenario and start a live conversation in Hindi
          </p>
        </div>

        <div className="space-y-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className="w-full text-left p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {scenario.name}
                </h3>
                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-1 rounded-full">
                  Level {scenario.difficulty}
                </span>
              </div>
              <p className="text-sm text-zinc-500 mt-1">
                {scenario.description}
              </p>
            </button>
          ))}

          {scenarios.length === 0 && (
            <p className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-sm text-zinc-500">
              Voice practice is not configured for this subject yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
