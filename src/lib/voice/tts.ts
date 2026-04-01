import { getSubjectConfig } from "@/lib/subjects/registry";

export async function generateSpeech(
  text: string,
  subjectSlug: string
): Promise<ArrayBuffer> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI();

  const config = getSubjectConfig(subjectSlug);
  const voice = config.voiceConfig;

  if (!voice) {
    throw new Error(`Voice not configured for subject: ${subjectSlug}`);
  }

  const response = await openai.audio.speech.create({
    model: voice.ttsModel ?? "gpt-4o-mini-tts",
    voice: (voice.ttsVoiceId as "coral") ?? "coral",
    input: text,
    instructions: voice.ttsInstructions,
    response_format: "mp3",
  });

  return response.arrayBuffer();
}
