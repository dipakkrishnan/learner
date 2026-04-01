export async function transcribeAudio(
  audioBuffer: Buffer,
  languageCode: string
): Promise<{ transcript: string; confidence: number }> {
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI();

  const file = new File([new Uint8Array(audioBuffer)], "audio.webm", {
    type: "audio/webm",
  });

  const transcription = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    language: languageCode.split("-")[0],
  });

  return {
    transcript: transcription.text,
    confidence: 1.0,
  };
}
