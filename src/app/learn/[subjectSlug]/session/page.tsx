"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FlashcardDeck } from "@/components/learning/flashcard-deck";
import { syncDemoUser } from "@/lib/client/demo-user";
import type { StudyCard, ReviewResult } from "@/types/learning";

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const subjectSlug = params.subjectSlug as string;

  const [cards, setCards] = useState<StudyCard[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("demo-user");

  useEffect(() => {
    async function init() {
      const runtime = await syncDemoUser();
      setUserId(runtime.userId);

      const cardsRes = await fetch(`/api/cards?subjectSlug=${subjectSlug}`);
      const cardsData = await cardsRes.json();
      setCards(cardsData.cards ?? []);

      if (!(cardsData.cards?.length > 0) || !cardsData.subjectId) {
        setLoading(false);
        return;
      }

      const sessionRes = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: runtime.userId,
          subjectId: cardsData.subjectId,
          sessionType: "MIXED",
        }),
      });
      const sessionData = await sessionRes.json();
      setSessionId(sessionData.id);

      setLoading(false);
    }

    init().catch(console.error);
  }, [subjectSlug]);

  const handleComplete = async (results: ReviewResult[]) => {
    if (!sessionId) return;

    const correctCount = results.filter((r) => r.rating >= 3).length;
    await fetch("/api/sessions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        cardsStudied: results.length,
        correctCount,
      }),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Preparing your session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => router.push(`/learn/${subjectSlug}`)}
          className="text-sm text-zinc-500 hover:text-zinc-700 mb-6 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <FlashcardDeck
          cards={cards}
          subjectSlug={subjectSlug}
          sessionId={sessionId}
          userId={userId}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
