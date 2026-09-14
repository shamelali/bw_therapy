/**
 * Demo auth — works on top of demoUsers so login/logout/register function
 * without a database. Activated when DATABASE_URL is not set.
 */
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { demoUsers, type DemoUser } from "./demo-data";

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
  // In demo mode we store a fixed hash; verification compares against it
  return "$2a$12$demo";
}

export async function verifyPassword(password: string, hash: string) {
  // Demo: any non-empty password works for demo users
  return password.length > 0;
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

export async function getCurrentUser(): Promise<DemoUser | null> {
  const session = await getSession();
  if (!session) return null;
  const user = demoUsers.find((u) => u.id === session.userId);
  return user ?? null;
}

export async function findUserByEmail(email: string): Promise<DemoUser | null> {
  return demoUsers.find((u) => u.email === email.toLowerCase()) ?? null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: "customer" | "provider" | "admin";
}): Promise<DemoUser> {
  const newUser: DemoUser = {
    id: `usr-${Date.now()}`,
    name: data.name,
    email: data.email.toLowerCase(),
    passwordHash: "$2a$12$demo",
    role: data.role ?? "customer",
    phone: null,
    avatarUrl: null,
    createdAt: new Date().toISOString(),
  };
  demoUsers.push(newUser);
  return newUser;
}

export type SocialProvider = "google" | "apple" | "facebook" | "instagram";

const SOCIAL_GUEST_IDS: Record<SocialProvider, string> = {
  google: "usr-google-guest",
  apple: "usr-apple-guest",
  facebook: "usr-facebook-guest",
  instagram: "usr-instagram-guest",
};

const SOCIAL_GUEST_EMAILS: Record<SocialProvider, string> = {
  google: "guest.google@demo.local",
  apple: "guest.apple@demo.local",
  facebook: "guest.facebook@demo.local",
  instagram: "guest.instagram@demo.local",
};

/**
 * Demo social login — lets anyone in with one click, no account needed. Since
 * this is a frontend demo without real OAuth credentials, each provider maps
 * to a pre-seeded guest customer (see demo-data.ts) so the same button always
 * signs into the same identity across every server bundle.
 */
export async function signInWithSocial({
  provider,
  name,
  email,
}: {
  provider: SocialProvider;
  name?: string | null;
  email?: string | null;
}): Promise<DemoUser> {
  const guestEmail = (email ?? SOCIAL_GUEST_EMAILS[provider]).toLowerCase();
  const existing = demoUsers.find((u) => u.email === guestEmail);
  if (existing) return existing;

  const fallback = demoUsers.find((u) => u.id === SOCIAL_GUEST_IDS[provider]);
  if (fallback) return fallback;

  const guest: DemoUser = {
    id: SOCIAL_GUEST_IDS[provider],
    name: name || `${provider.charAt(0).toUpperCase()}${provider.slice(1)} Demo Guest`,
    email: guestEmail,
    passwordHash: "$2a$12$demo",
    role: "customer",
    phone: null,
    avatarUrl: null,
    createdAt: new Date().toISOString(),
  };
  demoUsers.push(guest);
  return guest;
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
