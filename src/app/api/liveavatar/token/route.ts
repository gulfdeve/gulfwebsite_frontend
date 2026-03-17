import { NextResponse } from "next/server";

const SANDBOX_AVATAR_ID = "dd73ea75-1218-4ef3-92ce-606d5f7fbc0a";
const LIVEAVATAR_API = "https://api.liveavatar.com/v1/sessions/token";

export async function POST(request: Request) {
  const apiKey = process.env.LIVEAVATAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "LiveAvatar API key not configured" },
      { status: 500 }
    );
  }

  const isSandbox = process.env.LIVEAVATAR_SANDBOX === "true";
  const avatarId = isSandbox
    ? SANDBOX_AVATAR_ID
    : process.env.LIVEAVATAR_AVATAR_ID;

  if (!avatarId) {
    return NextResponse.json(
      { error: "LiveAvatar avatar ID not configured" },
      { status: 500 }
    );
  }

  let locale = "en";
  try {
    const body = await request.json();
    if (body?.locale) locale = body.locale;
  } catch {
    // ignore — locale is optional
  }

  const persona: Record<string, string> = { language: locale };
  if (!isSandbox) {
    if (process.env.LIVEAVATAR_VOICE_ID) {
      persona.voice_id = process.env.LIVEAVATAR_VOICE_ID;
    }
    if (process.env.LIVEAVATAR_CONTEXT_ID) {
      persona.context_id = process.env.LIVEAVATAR_CONTEXT_ID;
    }
  }
  // In sandbox mode we intentionally omit voice_id and context_id —
  // those belong to the production avatar, not the Wayne sandbox avatar.

  const payload: Record<string, unknown> = {
    mode: "FULL",
    avatar_id: avatarId,
    avatar_persona: persona,
  };

  if (isSandbox) {
    payload.is_sandbox = true;
  }

  try {
    const res = await fetch(LIVEAVATAR_API, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[LiveAvatar] Token API error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to create session token" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const sessionToken: string | undefined = data?.session_token ?? data?.data?.session_token;

    if (!sessionToken) {
      console.error("[LiveAvatar] Unexpected response shape:", JSON.stringify(data));
      return NextResponse.json({ error: "session_token missing from response" }, { status: 502 });
    }

    return NextResponse.json({ sessionToken });
  } catch (err) {
    console.error("[LiveAvatar] Network error:", err);
    return NextResponse.json(
      { error: "Network error contacting LiveAvatar API" },
      { status: 503 }
    );
  }
}
