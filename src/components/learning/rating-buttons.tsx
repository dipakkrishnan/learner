"use client";

import type { ReviewRating } from "@/types/learning";

interface RatingButtonsProps {
  onRate: (rating: ReviewRating) => void;
  disabled?: boolean;
}

const ratings: { value: ReviewRating; label: string; color: string; description: string }[] = [
  {
    value: 1,
    label: "Again",
    color: "bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-400",
    description: "Didn't know it",
  },
  {
    value: 2,
    label: "Hard",
    color: "bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/40 dark:hover:bg-orange-900/60 dark:text-orange-400",
    description: "Struggled",
  },
  {
    value: 3,
    label: "Good",
    color: "bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/40 dark:hover:bg-green-900/60 dark:text-green-400",
    description: "Got it right",
  },
  {
    value: 4,
    label: "Easy",
    color: "bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 dark:text-blue-400",
    description: "Too easy",
  },
];

export function RatingButtons({ onRate, disabled }: RatingButtonsProps) {
  return (
    <div className="flex gap-3 justify-center w-full max-w-md mx-auto">
      {ratings.map((r) => (
        <button
          key={r.value}
          onClick={() => onRate(r.value)}
          disabled={disabled}
          className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl font-medium transition-colors disabled:opacity-50 ${r.color}`}
        >
          <span className="text-sm font-semibold">{r.label}</span>
          <span className="text-xs opacity-70">{r.description}</span>
        </button>
      ))}
    </div>
  );
}
