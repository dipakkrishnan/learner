"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StylePicker } from "@/components/onboarding/style-picker";
import { GoalPicker } from "@/components/onboarding/goal-picker";
import { PacePicker } from "@/components/onboarding/pace-picker";
import { Button } from "@/components/ui/button";
import { markOnboarded, syncDemoUser } from "@/lib/client/demo-user";
import { defaultUserPreferences } from "@/lib/preferences";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [learningStyle, setLearningStyle] = useState<
    "visual" | "auditory" | "both"
  >(defaultUserPreferences.learningStyle);
  const [goal, setGoal] = useState(defaultUserPreferences.goal);
  const [dailyMinutes, setDailyMinutes] = useState(
    defaultUserPreferences.dailyMinutes
  );
  const [newCardsPerSession, setNewCardsPerSession] = useState(
    defaultUserPreferences.newCardsPerSession
  );
  const [voiceEnabled, setVoiceEnabled] = useState(
    defaultUserPreferences.voiceEnabled
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleComplete = async () => {
    setIsSaving(true);
    const preferences = {
      learningStyle,
      goal,
      dailyMinutes,
      newCardsPerSession,
      voiceEnabled,
    };

    await syncDemoUser(preferences);
    markOnboarded();
    router.push("/learn/hindi");
  };

  const steps = [
    <StylePicker
      key="style"
      value={learningStyle}
      onChange={setLearningStyle}
    />,
    <GoalPicker key="goal" value={goal} onChange={setGoal} />,
    <PacePicker
      key="pace"
      dailyMinutes={dailyMinutes}
      newCardsPerSession={newCardsPerSession}
      voiceEnabled={voiceEnabled}
      onDailyMinutesChange={setDailyMinutes}
      onNewCardsChange={setNewCardsPerSession}
      onVoiceEnabledChange={setVoiceEnabled}
    />,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        {/* Step indicators */}
        <div className="flex gap-2 justify-center mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-indigo-500"
                  : i < step
                    ? "w-8 bg-indigo-300"
                    : "w-8 bg-zinc-200 dark:bg-zinc-800"
              }`}
            />
          ))}
        </div>

        {/* Current step */}
        {steps[step]}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : (
            <div />
          )}
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
          ) : (
            <Button onClick={handleComplete} disabled={isSaving}>
              {isSaving ? "Preparing..." : "Start Learning"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
