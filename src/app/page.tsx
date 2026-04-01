"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubjectCard } from "@/components/dashboard/subject-card";
import { isOnboarded, syncDemoUser } from "@/lib/client/demo-user";

interface SubjectSummary {
  slug: string;
  name: string;
  description: string;
  icon: string;
  phases: number;
  totalCards: number;
  hasVoice: boolean;
}

export default function Home() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<SubjectSummary[]>([]);

  useEffect(() => {
    if (!isOnboarded()) {
      router.push("/onboarding");
      return;
    }

    syncDemoUser()
      .then(() => fetch("/api/subjects"))
      .then((r) => r.json())
      .then(setSubjects)
      .catch(console.error);
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Learner
          </h1>
          <p className="text-zinc-500 mt-1">
            Pick a subject to start studying
          </p>
        </div>

        <div className="space-y-4">
          {subjects.map((s) => (
            <SubjectCard key={s.slug} {...s} />
          ))}
        </div>

        {subjects.length === 0 && (
          <div className="text-center py-12 text-zinc-400">
            Loading subjects...
          </div>
        )}
      </div>
    </div>
  );
}
