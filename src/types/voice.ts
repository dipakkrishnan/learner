export interface TTSRequest {
  text: string;
  subjectSlug: string;
}

export interface TTSResponse {
  audioUrl: string;
  cached: boolean;
}

export interface STTResult {
  transcript: string;
  confidence: number;
  language: string;
}

export interface PronunciationScore {
  accuracy: number; // 0-100
  feedback: "excellent" | "good" | "needs_practice";
  expectedText: string;
  recognizedText: string;
}

export interface RealtimeSessionConfig {
  scenarioId: string;
  model: string;
  voice: string;
  systemPrompt: string;
}

export interface RealtimeToken {
  token: string;
  expiresAt: Date;
}
