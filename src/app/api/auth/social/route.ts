import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signInWithSocial } from "@/lib/auth";

const schema = z.object({
  provider: z.enum(["google", "apple", "facebook", "instagram"]),
  name: z.string().min(1).max(120).nullable().optional(),
  email: z.string().email().nullable().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid social login request" }, { status: 400 });
    }
    const { provider, name, email } = parsed.data;
    const { role } = await signInWithSocial({ provider, name, email });
    return NextResponse.json({ ok: true, role });
  } catch (err) {
    console.error("[auth/social] error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}