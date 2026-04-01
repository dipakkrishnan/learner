"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PacePicker } from "@/components/onboarding/pace-picker";
import { Button } from "@/components/ui/button";
import { getStoredPreferences, syncDemoUser } from "@/lib/client/demo-user";
import type { UserPreferences } from "@/types/learning";

export default function SettingsPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<UserPreferences>(() => getStoredPreferences());
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await syncDemoUser(prefs);
    router.back();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Settings
          </h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-zinc-500 hover:text-zinc-700"
          >
            Cancel
          </button>
        </div>

        <PacePicker
          dailyMinutes={prefs.dailyMinutes}
          newCardsPerSession={prefs.newCardsPerSession}
          voiceEnabled={prefs.voiceEnabled}
          onDailyMinutesChange={(v) =>
            setPrefs((p) => ({ ...p, dailyMinutes: v }))
          }
          onNewCardsChange={(v) =>
            setPrefs((p) => ({ ...p, newCardsPerSession: v }))
          }
          onVoiceEnabledChange={(v) =>
            setPrefs((p) => ({ ...p, voiceEnabled: v }))
          }
        />

        <Button onClick={handleSave} className="w-full" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
