"use client";

import { useState, useRef } from "react";

interface AudioPlayerProps {
  text: string;
  subjectSlug: string;
  audioUrl?: string;
}

export function AudioPlayer({ text, subjectSlug, audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger card flip

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      let src = audioUrl;

      if (!src) {
        // Generate via TTS API
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, subjectSlug }),
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as
            | { error?: string; code?: string }
            | null;
          throw new Error(
            data?.error ??
              (data?.code === "tts_unavailable"
                ? "Audio is unavailable right now."
                : "TTS failed")
          );
        }

        const blob = await res.blob();
        src = URL.createObjectURL(blob);
      }

      const audio = new Audio(src);
      audioRef.current = audio;

      audio.onended = () => setIsPlaying(false);
      audio.onpause = () => setIsPlaying(false);

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Audio playback failed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handlePlay}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors text-indigo-700 dark:text-indigo-300 text-sm font-medium disabled:opacity-50"
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <rect x="5" y="4" width="3" height="12" rx="1" />
            <rect x="12" y="4" width="3" height="12" rx="1" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        )}
        {isPlaying ? "Pause" : "Listen"}
      </button>

      {errorMessage && (
        <p className="max-w-48 text-center text-xs text-amber-700 dark:text-amber-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
