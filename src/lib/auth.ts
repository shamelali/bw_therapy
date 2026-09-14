import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db, isDemoMode } from "@/db";
import { eq } from "@/lib/db-compat";

// Use demo auth when in demo mode
let _users: typeof import("@/db/schema").users;
let _demoAuth: typeof import("./demo-auth") | null = null;

async function getAuthModule() {
  if (isDemoMode()) {
    if (!_demoAuth) {
      _demoAuth = await import("./demo-auth");
    }
    return _demoAuth;
  }
  return null;
}

import type { User } from "@/db/schema";

const SESSION_COOKIE = "session_token";
const secretKey = process.env.AUTH_SECRET ?? "dev-marketplace-secret-change-me-please";
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  userId: string;
  role: string;
  email: string;
  name: string;
};

export async function hashPassword(password: string) {
  const demoAuth = await getAuthModule();
  if (demoAuth) return demoAuth.hashPassword(password);
  const bcrypt = await import("bcryptjs");
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  const demoAuth = await getAuthModule();
  if (demoAuth) return demoAuth.verifyPassword(password, hash);
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(encodedKey);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await createSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export type SocialProvider = "google" | "apple" | "facebook" | "instagram";

/**
 * One-click social/guest login for the demo build. No account is needed: a
 * guest identity is created on first sign-in, and every later click signs
 * straight back in. This satisfies both "enable social login" and "without
 * needing an account" for the demo, without real OAuth credentials.
 */
export async function signInWithSocial({
  provider,
  name,
  email,
}: {
  provider: SocialProvider;
  name?: string | null;
  email?: string | null;
}): Promise<{ user: { id: string; role: string; email: string; name: string }; role: string }> {
  const demoAuth = await getAuthModule();
  if (demoAuth) {
    const user = await demoAuth.signInWithSocial({ provider, name, email });
    await setSessionCookie({ userId: user.id, role: user.role, email: user.email, name: user.name });
    return { user, role: user.role };
  }

  // Real DB mode: find or create a customer for this provider identity.
  const bcrypt = await import("bcryptjs");
  const { users } = await import("@/db/schema");
  const fallbackEmail = `guest.${provider}@demo.local`;
  const guestEmail = (email ?? fallbackEmail).toLowerCase();
  const role = "customer";

  try {
    const [existing] = await db.select().from(users).where(eq(users.email, guestEmail)).limit(1);
    if (existing) {
      await setSessionCookie({ userId: existing.id, role: existing.role, email: existing.email, name: existing.name });
      return { user: existing, role: existing.role };
    }
  } catch {
    // fall through to insert
  }

  const nickname =
    name || `${provider.charAt(0).toUpperCase()}${provider.slice(1)} Demo Guest`;
  const pHash = await bcrypt.hash(Math.random().toString(36).slice(2), 10);
  const [user] = await db
    .insert(users)
    .values({ name: nickname, email: guestEmail, passwordHash: pHash, role })
    .returning();
  await setSessionCookie({ userId: user.id, role: user.role, email: user.email, name: user.name });
  return { user, role: user.role };
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getCurrentUser(): Promise<User | null> {
  const demoAuth = await getAuthModule();
  if (demoAuth) {
    return demoAuth.getCurrentUser() as Promise<User | null>;
  }
  try {
    const session = await getSession();
    if (!session) return null;
    const { users } = await import("@/db/schema");
    const [user] = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
    return user ?? null;
  } catch (err) {
    console.error("[auth] getCurrentUser failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
