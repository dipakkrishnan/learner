import { NextRequest, NextResponse } from "next/server";
import { ensureDemoRuntime } from "@/lib/demo-runtime";
import type { UserPreferences } from "@/types/learning";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const preferences = body.preferences as Partial<UserPreferences> | undefined;
  const runtime = await ensureDemoRuntime(preferences);

  return NextResponse.json(runtime);
}
