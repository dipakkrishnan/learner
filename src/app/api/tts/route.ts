import { NextRequest, NextResponse } from "next/server";
import { ensureSubjectSeeded } from "@/lib/demo-runtime";
import { generateSpeech } from "@/lib/voice/tts";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { text, subjectSlug } = await request.json();

  if (!text || !subjectSlug) {
    return NextResponse.json(
      { error: "text and subjectSlug are required" },
      { status: 400 }
    );
  }

  try {
    await ensureSubjectSeeded(subjectSlug);
    const audioBuffer = await generateSpeech(text, subjectSlug);

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Speech generation failed";
    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;

    return NextResponse.json(
      {
        error: message,
        code: status === 503 ? "tts_unavailable" : "tts_failed",
      },
      { status }
    );
  }
}
