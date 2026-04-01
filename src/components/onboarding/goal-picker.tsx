"use client";

interface GoalPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const goals = [
  {
    value: "family-conversation",
    label: "Converse with family",
    description: "Talk with in-laws, relatives, and extended family",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    value: "travel",
    label: "Travel",
    description: "Navigate and connect while visiting India",
    icon: "✈️",
  },
  {
    value: "culture",
    label: "Cultural appreciation",
    description: "Understand Bollywood, music, and cultural references",
    icon: "🎬",
  },
  {
    value: "general",
    label: "General fluency",
    description: "Build all-around conversational ability",
    icon: "💬",
  },
];

export function GoalPicker({ value, onChange }: GoalPickerProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          What&apos;s your goal?
        </h2>
        <p className="text-zinc-500 mt-2">
          We&apos;ll prioritize the most relevant phrases and scenarios
        </p>
      </div>

      <div className="grid gap-3">
        {goals.map((g) => (
          <button
            key={g.value}
            onClick={() => onChange(g.value)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              value === g.value
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
            }`}
          >
            <span className="text-3xl">{g.icon}</span>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                {g.label}
              </p>
              <p className="text-sm text-zinc-500">{g.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
