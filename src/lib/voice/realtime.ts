import type { VoiceConfig, ConversationScenario } from "@/types/subject";

export async function createRealtimeSession(
  voiceConfig: VoiceConfig,
  scenario?: ConversationScenario
): Promise<{ token: string; expiresAt: Date; model: string }> {
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI();

  const systemPrompt = scenario?.systemPrompt ?? voiceConfig.realtimeSystemPrompt ?? "";

  const response = await openai.beta.realtime.sessions.create({
    model: (voiceConfig.realtimeModel ?? "gpt-4o-realtime-preview") as "gpt-4o-realtime-preview",
    voice: voiceConfig.realtimeVoice ?? "sage",
    instructions: systemPrompt,
    input_audio_transcription: {
      model: "whisper-1",
    },
  });

  const model = voiceConfig.realtimeModel ?? "gpt-realtime";

  return {
    token: response.client_secret?.value ?? "",
    expiresAt: new Date(Date.now() + 60 * 1000),
    model,
  };
}
