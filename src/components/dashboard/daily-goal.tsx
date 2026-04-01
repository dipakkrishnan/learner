"use client";

interface DailyGoalProps {
  streak: number;
  cardsToday: number;
  minutesToday: number;
  dailyGoalMinutes: number;
}

export function DailyGoal({
  streak,
  cardsToday,
  minutesToday,
  dailyGoalMinutes,
}: DailyGoalProps) {
  const progress = Math.min(
    Math.round((minutesToday / dailyGoalMinutes) * 100),
    100
  );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          Today
        </h3>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
            <span className="text-orange-500">&#x1F525;</span>
            <span className="text-sm font-medium text-orange-700 dark:text-orange-400">
              {streak} day streak
            </span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-sm text-zinc-500 mb-1">
          <span>
            {minutesToday} / {dailyGoalMinutes} min
          </span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-4 text-center">
        <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {cardsToday}
          </p>
          <p className="text-xs text-zinc-500">Cards reviewed</p>
        </div>
        <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {minutesToday}
          </p>
          <p className="text-xs text-zinc-500">Minutes studied</p>
        </div>
      </div>
    </div>
  );
}
