"use client";

import Image from "next/image";
import type { CardFace } from "@/types/learning";
import { AudioPlayer } from "@/components/voice/audio-player";

interface FlashcardProps {
  front: CardFace;
  back: CardFace;
  subjectSlug: string;
  isFlipped: boolean;
  showTransliteration?: boolean;
  onFlip: (isFlipped: boolean) => void;
}

export function Flashcard({
  front,
  back,
  subjectSlug,
  isFlipped,
  showTransliteration = true,
  onFlip,
}: FlashcardProps) {
  const handleFlip = () => {
    const next = !isFlipped;
    onFlip(next);
  };

  return (
    <div
      className="perspective-[1000px] w-full max-w-md mx-auto cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full min-h-[320px] transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg p-8 flex flex-col items-center justify-center gap-4">
          {front.image && (
            <Image
              src={front.image}
              alt={front.text}
              width={96}
              height={96}
              unoptimized
              className="w-24 h-24 object-contain rounded-lg"
            />
          )}
          <p className="text-2xl font-semibold text-center text-zinc-900 dark:text-zinc-100">
            {front.text}
          </p>
          {front.transliteration && showTransliteration && (
            <p className="text-sm text-zinc-500">{front.transliteration}</p>
          )}
          <p className="text-xs text-zinc-400 mt-4">Tap, press Space, or Enter to reveal</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border border-indigo-200 dark:border-indigo-800 shadow-lg p-8 flex flex-col items-center justify-center gap-3">
          <p className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
            {back.text}
          </p>
          {back.transliteration && showTransliteration && (
            <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
              {back.transliteration}
            </p>
          )}
          {back.audioUrl || back.text ? (
            <AudioPlayer text={back.text} subjectSlug={subjectSlug} />
          ) : null}
          {back.explanation && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center mt-2">
              {back.explanation}
            </p>
          )}
          {back.examples && back.examples.length > 0 && (
            <div className="mt-2 space-y-1">
              {back.examples.map((ex, i) => (
                <p
                  key={i}
                  className="text-xs text-zinc-500 dark:text-zinc-500 italic text-center"
                >
                  {ex}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
