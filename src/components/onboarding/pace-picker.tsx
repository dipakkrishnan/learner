"use client";

import { Slider } from "@/components/ui/slider";

interface PacePickerProps {
  dailyMinutes: number;
  newCardsPerSession: number;
  voiceEnabled: boolean;
  onDailyMinutesChange: (value: number) => void;
  onNewCardsChange: (value: number) => void;
  onVoiceEnabledChange: (value: boolean) => void;
}

export function PacePicker({
  dailyMinutes,
  newCardsPerSession,
  voiceEnabled,
  onDailyMinutesChange,
  onNewCardsChange,
  onVoiceEnabledChange,
}: PacePickerProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Set your pace
        </h2>
        <p className="text-zinc-500 mt-2">
          You can always change this later in settings
        </p>
      </div>

      {/* Daily time */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Daily time commitment
          </label>
          <span className="text-sm font-semibold text-indigo-600">
            {dailyMinutes} min
          </span>
        </div>
        <Slider
          value={[dailyMinutes]}
          onValueChange={(v) => onDailyMinutesChange(Array.isArray(v) ? v[0] : v)}
          min={5}
          max={30}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-zinc-400">
          <span>5 min</span>
          <span>30 min</span>
        </div>
      </div>

      {/* New cards per session */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            New cards per session
          </label>
          <span className="text-sm font-semibold text-indigo-600">
            {newCardsPerSession}
          </span>
        </div>
        <Slider
          value={[newCardsPerSession]}
          onValueChange={(v) => onNewCardsChange(Array.isArray(v) ? v[0] : v)}
          min={3}
          max={15}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-zinc-400">
          <span>3 (slow)</span>
          <span>15 (fast)</span>
        </div>
      </div>

      {/* Voice toggle */}
      <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            Enable voice mode
          </p>
          <p className="text-sm text-zinc-500">
            Pronunciation practice and conversation
          </p>
        </div>
        <button
          onClick={() => onVoiceEnabledChange(!voiceEnabled)}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            voiceEnabled ? "bg-indigo-500" : "bg-zinc-300 dark:bg-zinc-600"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
              voiceEnabled ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
