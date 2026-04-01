"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { ConversationScenario } from "@/types/subject";
import { WaveformVisualizer } from "./waveform-visualizer";

interface RealtimeSessionProps {
  subjectSlug: string;
  scenario: ConversationScenario;
  onEnd: () => void;
}

interface TranscriptEntry {
  role: "user" | "assistant";
  text: string;
}

export function RealtimeSession({
  subjectSlug,
  scenario,
  onEnd,
}: RealtimeSessionProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const connect = useCallback(async () => {
    setIsConnecting(true);

    try {
      // Get ephemeral token
      const tokenRes = await fetch(
        `/api/voice/token?subjectSlug=${subjectSlug}&scenarioId=${scenario.id}`
      );
      const { token, model } = await tokenRes.json();

      // Create peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Set up audio element for remote audio
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
        setAudioStream(e.streams[0]);
      };

      // Add local audio track
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localStreamRef.current = localStream;
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

      // Set up data channel for events
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.onmessage = (e) => {
        const event = JSON.parse(e.data);

        if (event.type === "response.audio_transcript.done") {
          setTranscript((prev) => [
            ...prev,
            { role: "assistant", text: event.transcript },
          ]);
        }

        if (event.type === "conversation.item.input_audio_transcription.completed") {
          setTranscript((prev) => [
            ...prev,
            { role: "user", text: event.transcript },
          ]);
        }
      };

      // Create and set offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to OpenAI Realtime API
      const sdpRes = await fetch(
        `https://api.openai.com/v1/realtime?model=${model}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        }
      );

      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

      setIsConnected(true);
    } catch (err) {
      console.error("Realtime connection failed:", err);
    } finally {
      setIsConnecting(false);
    }
  }, [subjectSlug, scenario.id]);

  const disconnect = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    dcRef.current?.close();
    pcRef.current?.close();
    pcRef.current = null;
    dcRef.current = null;
    localStreamRef.current = null;
    setIsConnected(false);
    setAudioStream(null);
    onEnd();
  }, [onEnd]);

  useEffect(() => disconnect, [disconnect]);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Scenario header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {scenario.name}
        </h3>
        <p className="text-sm text-zinc-500 mt-1">{scenario.description}</p>
      </div>

      {/* Waveform */}
      {audioStream && (
        <WaveformVisualizer stream={audioStream} isActive={isConnected} />
      )}

      {/* Transcript */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 h-64 overflow-y-auto p-4 space-y-3">
        {transcript.length === 0 && isConnected && (
          <p className="text-sm text-zinc-400 text-center">
            Start speaking in Hindi...
          </p>
        )}
        {transcript.map((entry, i) => (
          <div
            key={i}
            className={`flex ${
              entry.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                entry.role === "user"
                  ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200"
                  : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
              }`}
            >
              {entry.text}
            </div>
          </div>
        ))}
        <div ref={transcriptEndRef} />
      </div>

      {/* Suggested phrases */}
      {isConnected && (
        <div className="flex flex-wrap gap-2 justify-center">
          {scenario.suggestedPhrases.map((phrase, i) => (
            <span
              key={i}
              className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1.5 rounded-full"
            >
              {phrase}
            </span>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center">
        {!isConnected ? (
          <button
            onClick={connect}
            disabled={isConnecting}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors disabled:opacity-50"
          >
            {isConnecting ? "Connecting..." : "Start Conversation"}
          </button>
        ) : (
          <button
            onClick={disconnect}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors"
          >
            End Conversation
          </button>
        )}
      </div>
    </div>
  );
}
