"use client";

import Link from "next/link";

interface SubjectCardProps {
  slug: string;
  name: string;
  description: string;
  icon: string;
  totalCards: number;
  phases: number;
  hasVoice: boolean;
}

export function SubjectCard({
  slug,
  name,
  description,
  icon,
  totalCards,
  phases,
  hasVoice,
}: SubjectCardProps) {
  return (
    <Link
      href={`/learn/${slug}`}
      className="block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {name}
          </h3>
          <p className="text-sm text-zinc-500 mt-1">{description}</p>
          <div className="flex gap-4 mt-3 text-xs text-zinc-400">
            <span>{phases} phases</span>
            <span>{totalCards} cards</span>
            {hasVoice && <span>Voice mode</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
