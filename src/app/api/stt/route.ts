import { NextRequest, NextResponse } from "next/server";
import { ensureSubjectSeeded } from "@/lib/demo-runtime";
import { transcribeAudio } from "@/lib/voice/stt";
import { getSubjectConfig } from "@/lib/subjects/registry";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const audioFile = formData.get("audio") as File | null;
  const subjectSlug = formData.get("subjectSlug") as string | null;

  if (!audioFile || !subjectSlug) {
    return NextResponse.json(
      { error: "audio file and subjectSlug are required" },
      { status: 400 }
    );
  }

  await ensureSubjectSeeded(subjectSlug);
  const config = getSubjectConfig(subjectSlug);
  const langCode = config.voiceConfig?.sttLanguageCode ?? "hi-IN";

  const buffer = Buffer.from(await audioFile.arrayBuffer());
  const result = await transcribeAudio(buffer, langCode);

  return NextResponse.json(result);
}
