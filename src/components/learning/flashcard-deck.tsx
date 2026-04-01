"use client";

import { useState, useCallback } from "react";
import { Flashcard } from "./flashcard";
import { RatingButtons } from "./rating-buttons";
import { SessionSummary } from "./session-summary";
import type { StudyCard, ReviewRating, ReviewResult } from "@/types/learning";

interface FlashcardDeckProps {
  cards: StudyCard[];
  subjectSlug: string;
  sessionId?: string | null;
  userId: string;
  onComplete: (results: ReviewResult[]) => void;
}

export function FlashcardDeck({
  cards,
  subjectSlug,
  sessionId,
  userId,
  onComplete,
}: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<ReviewResult[]>([]);
  const [cardStartTime, setCardStartTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = cards[currentIndex];

  const handleFlip = useCallback((flipped: boolean) => {
    setIsFlipped(flipped);
  }, []);

  const handleRate = async (rating: ReviewRating) => {
    if (!currentCard || isSubmitting) return;

    setIsSubmitting(true);
    const responseTimeMs = Date.now() - cardStartTime;

    try {
      await fetch(`/api/cards/${currentCard.id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          rating,
          responseTimeMs,
          sessionId: sessionId ?? undefined,
        }),
      });

      const result: ReviewResult = {
        cardId: currentCard.id,
        rating,
        responseTimeMs,
      };
      const newResults = [...results, result];
      setResults(newResults);

      if (currentIndex + 1 >= cards.length) {
        setIsComplete(true);
        onComplete(newResults);
      } else {
        setCurrentIndex((i) => i + 1);
        setIsFlipped(false);
        setCardStartTime(Date.now());
      }
    } catch (err) {
      console.error("Review failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return <SessionSummary results={results} totalCards={cards.length} />;
  }

  if (!currentCard) {
    return (
      <div className="text-center py-12 text-zinc-500">
        No cards to review right now. Come back later!
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Progress */}
      <div className="flex items-center gap-3 text-sm text-zinc-500">
        <span>
          {currentIndex + 1} / {cards.length}
        </span>
        <div className="w-48 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / cards.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Card */}
      <Flashcard
        front={currentCard.front}
        back={currentCard.back}
        subjectSlug={subjectSlug}
        onFlip={handleFlip}
      />

      {/* Rating buttons — only show when flipped */}
      {isFlipped && (
        <RatingButtons onRate={handleRate} disabled={isSubmitting} />
      )}

      {!isFlipped && (
        <p className="text-sm text-zinc-400">Tap the card to see the answer</p>
      )}
    </div>
  );
}
