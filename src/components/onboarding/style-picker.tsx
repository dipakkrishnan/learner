"use client";

interface StylePickerProps {
  value: "visual" | "auditory" | "both";
  onChange: (value: "visual" | "auditory" | "both") => void;
}

const styles = [
  {
    value: "visual" as const,
    label: "Visual",
    description: "Cards, images, maps, and color-coded progress",
    icon: "👁️",
  },
  {
    value: "auditory" as const,
    label: "Auditory",
    description: "Pronunciation, voice practice, and listening exercises",
    icon: "👂",
  },
  {
    value: "both" as const,
    label: "Both",
    description: "The full experience — visual cards with voice mode",
    icon: "✨",
  },
];

export function StylePicker({ value, onChange }: StylePickerProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          How do you like to learn?
        </h2>
        <p className="text-zinc-500 mt-2">
          This helps us tailor your experience
        </p>
      </div>

      <div className="grid gap-3">
        {styles.map((s) => (
          <button
            key={s.value}
            onClick={() => onChange(s.value)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              value === s.value
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
            }`}
          >
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                {s.label}
              </p>
              <p className="text-sm text-zinc-500">{s.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
