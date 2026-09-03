import { db } from "@/db";
import { providers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProviderByUserId(userId: string) {
  try {
    const [row] = await db.select().from(providers).where(eq(providers.userId, userId)).limit(1);
    return row ?? null;
  } catch (err) {
    console.error("[data] getProviderByUserId failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function getProviderById(id: string) {
  try {
    const [row] = await db.select().from(providers).where(eq(providers.id, id)).limit(1);
    return row ?? null;
  } catch (err) {
    console.error("[data] getProviderById failed:", err instanceof Error ? err.message : err);
    return null;
  }
}
