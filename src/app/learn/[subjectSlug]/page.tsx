"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PhaseMap } from "@/components/learning/phase-map";
import { DailyGoal } from "@/components/dashboard/daily-goal";
import { Button } from "@/components/ui/button";
import { getStoredPreferences, syncDemoUser } from "@/lib/client/demo-user";
import type { PhaseStatus } from "@/lib/engine/learning-path";

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectSlug = params.subjectSlug as string;
  const initialPreferences = getStoredPreferences();

  const [phases, setPhases] = useState<PhaseStatus[]>([]);
  const [streak, setStreak] = useState(0);
  const [cardsToday, setCardsToday] = useState(0);
  const [minutesToday, setMinutesToday] = useState(0);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(initialPreferences.dailyMinutes);
  const [voiceEnabled] = useState(initialPreferences.voiceEnabled);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preferences = getStoredPreferences();

    syncDemoUser(preferences)
      .then(() =>
        fetch(`/api/progress?subjectSlug=${subjectSlug}`)
      )
      .then((r) => r.json())
      .then((data) => {
        setPhases(data.phaseStatuses ?? []);
        setStreak(data.streak ?? 0);
        setCardsToday(data.cardsToday ?? 0);
        setMinutesToday(data.minutesToday ?? 0);
        setDailyGoalMinutes(data.dailyGoalMinutes ?? preferences.dailyMinutes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [subjectSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Conversational Hindi
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Your learning journey
            </p>
          </div>
          <Button
            onClick={() => router.push(`/learn/${subjectSlug}/session`)}
          >
            Start Session
          </Button>
        </div>

        {/* Daily goal */}
        <DailyGoal
          streak={streak}
          cardsToday={cardsToday}
          minutesToday={minutesToday}
          dailyGoalMinutes={dailyGoalMinutes}
        />

        {/* Phase map */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Learning Path
          </h2>
          <PhaseMap
            phases={phases}
            onSelectPhase={(phaseId) => {
              console.log("Selected phase:", phaseId);
            }}
          />
        </div>

        {/* Voice mode CTA */}
        {voiceEnabled && (
          <button
            onClick={() => router.push(`/learn/${subjectSlug}/voice`)}
            className="w-full p-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white text-left hover:opacity-90 transition-opacity"
          >
            <h3 className="text-lg font-semibold">Voice Practice</h3>
            <p className="text-sm text-indigo-100 mt-1">
              Have a live conversation in Hindi with an AI partner
            </p>
          </button>
        )}
      </div>
    </div>
  );
}
