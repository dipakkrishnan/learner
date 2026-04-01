"use client";

import { useState, useCallback, useEffect } from "react";
import { Flashcard } from "./flashcard";
import { RatingButtons } from "./rating-buttons";
import { SessionSummary } from "./session-summary";
import { Button } from "@/components/ui/button";
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
  const [testMode, setTestMode] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [comparison, setComparison] = useState<AnswerComparison | null>(null);

  const currentCard = cards[currentIndex];

  const handleFlip = useCallback((flipped: boolean) => {
    setIsFlipped(flipped);
  }, []);

  const resetCardState = useCallback(() => {
    setIsFlipped(false);
    setAnswerInput("");
    setComparison(null);
    setCardStartTime(Date.now());
  }, []);

  const handleRate = useCallback(async (rating: ReviewRating) => {
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
        resetCardState();
      }
    } catch (err) {
      console.error("Review failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    cardStartTime,
    currentCard,
    currentIndex,
    cards.length,
    isSubmitting,
    onComplete,
    results,
    sessionId,
    userId,
    resetCardState,
  ]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isComplete || isSubmitting || !currentCard) {
        return;
      }

      if (
        event.target instanceof HTMLElement &&
        (event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.isContentEditable)
      ) {
        return;
      }

      if (event.key === " " || (event.key === "Enter" && !testMode)) {
        event.preventDefault();
        if (!isFlipped) {
          setIsFlipped(true);
        }
        return;
      }

      if (!isFlipped) {
        return;
      }

      const ratingByKey: Partial<Record<string, ReviewRating>> = {
        ArrowLeft: 1,
        ArrowDown: 2,
        ArrowRight: 3,
        ArrowUp: 4,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
      };

      const rating = ratingByKey[event.key];
      if (!rating) {
        return;
      }

      event.preventDefault();
      void handleRate(rating);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentCard, handleRate, isComplete, isFlipped, isSubmitting, testMode]);

  const handleSubmitAnswer = useCallback(() => {
    if (!currentCard || !testMode) {
      return;
    }

    const nextComparison = compareAnswer(answerInput, currentCard.back);
    setComparison(nextComparison);
    setIsFlipped(true);
  }, [answerInput, currentCard, testMode]);

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

      <div className="flex items-center gap-2">
        <Button
          variant={testMode ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setTestMode((value) => {
              const nextValue = !value;
              setAnswerInput("");
              setComparison(null);
              return nextValue;
            });
          }}
        >
          {testMode ? "Test Mode On" : "Enable Test Mode"}
        </Button>
        <p className="text-xs text-zinc-400">
          {testMode
            ? "Type your answer before revealing the card"
            : "Standard flashcard mode"}
        </p>
      </div>

      {/* Card */}
      <Flashcard
        front={currentCard.front}
        back={currentCard.back}
        subjectSlug={subjectSlug}
        isFlipped={isFlipped}
        onFlip={handleFlip}
      />

      {testMode && !isFlipped && (
        <div className="w-full max-w-md space-y-3">
          <div className="space-y-2">
            <label
              htmlFor="answer-input"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Type your answer
            </label>
            <input
              id="answer-input"
              value={answerInput}
              onChange={(event) => setAnswerInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmitAnswer();
                }
              }}
              placeholder="Type Hindi or transliteration"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900"
            />
          </div>
          <Button
            className="w-full"
            onClick={handleSubmitAnswer}
            disabled={answerInput.trim().length === 0}
          >
            Check Answer
          </Button>
        </div>
      )}

      {comparison && isFlipped && (
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-4 text-center">
          <p
            className={`text-sm font-semibold ${
              comparison.status === "match"
                ? "text-green-600 dark:text-green-400"
                : comparison.status === "close"
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-red-600 dark:text-red-400"
            }`}
          >
            {comparison.label}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            You typed: <span className="font-medium text-zinc-700 dark:text-zinc-300">{comparison.userAnswer || "Nothing"}</span>
          </p>
          {comparison.status !== "match" && (
            <p className="mt-2 text-xs text-zinc-400">
              Accepted answers include the Hindi text and transliteration.
            </p>
          )}
        </div>
      )}

      {/* Rating buttons — only show when flipped */}
      {isFlipped && (
        <RatingButtons onRate={handleRate} disabled={isSubmitting} />
      )}

      {!isFlipped && (
        <p className="text-sm text-zinc-400">
          {testMode
            ? "Type an answer and press Enter to check it"
            : "Tap the card or press Space/Enter to see the answer"}
        </p>
      )}

      {isFlipped && (
        <p className="text-xs text-zinc-400 text-center">
          Hotkeys: Left = Again, Down = Hard, Right = Good, Up = Easy
        </p>
      )}
    </div>
  );
}

type AnswerComparison = {
  status: "match" | "close" | "different";
  label: string;
  userAnswer: string;
};

function compareAnswer(answer: string, back: StudyCard["back"]): AnswerComparison {
  const normalizedAnswer = normalizeAnswer(answer);
  const acceptedAnswers = [
    back.text,
    back.transliteration,
    ...(back.examples ?? []).map((example) => example.split(" (")[0]),
  ]
    .filter(Boolean)
    .map((value) => normalizeAnswer(value!));

  if (normalizedAnswer.length === 0) {
    return {
      status: "different",
      label: "No answer entered",
      userAnswer: answer,
    };
  }

  if (acceptedAnswers.some((candidate) => candidate === normalizedAnswer)) {
    return {
      status: "match",
      label: "Strong match",
      userAnswer: answer,
    };
  }

  if (acceptedAnswers.some((candidate) => similarityScore(candidate, normalizedAnswer) >= 0.72)) {
    return {
      status: "close",
      label: "Close enough",
      userAnswer: answer,
    };
  }

  return {
    status: "different",
    label: "Different answer",
    userAnswer: answer,
  };
}

function normalizeAnswer(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[()'".,!?/\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function similarityScore(left: string, right: string) {
  if (left === right) {
    return 1;
  }

  const leftTokens = new Set(left.split(" ").filter(Boolean));
  const rightTokens = new Set(right.split(" ").filter(Boolean));

  if (leftTokens.size === 0 || rightTokens.size === 0) {
    return 0;
  }

  let sharedTokens = 0;
  for (const token of leftTokens) {
    if (rightTokens.has(token)) {
      sharedTokens += 1;
    }
  }

  return sharedTokens / Math.max(leftTokens.size, rightTokens.size);
}
