import { db, isDemoMode } from "@/db";
import { eq } from "@/lib/db-compat";

// When in demo mode, use demo-db's schema exports
let _demoDb: typeof import("./demo-db") | null = null;
let _schema: typeof import("@/db/schema") | null = null;

async function getProvidersTable() {
  if (isDemoMode()) {
    if (!_demoDb) _demoDb = await import("./demo-db");
    return _demoDb.providers;
  }
  if (!_schema) _schema = await import("@/db/schema");
  return _schema.providers;
}

export async function getProviderByUserId(userId: string) {
  try {
    const providers = await getProvidersTable();
    const [row] = await db.select().from(providers).where(eq(providers.userId, userId)).limit(1);
    return row ?? null;
  } catch (err) {
    console.error("[data] getProviderByUserId failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function getProviderById(id: string) {
  try {
    const providers = await getProvidersTable();
    const [row] = await db.select().from(providers).where(eq(providers.id, id)).limit(1);
    return row ?? null;
  } catch (err) {
    console.error("[data] getProviderById failed:", err instanceof Error ? err.message : err);
    return null;
  }
}
