import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: Pool | null = null;
let _demoMode = false;

/** Demo mode is the default when no database is configured, and can always be forced. */
function demoModeEnabled() {
  return (
    !process.env.DATABASE_URL ||
    process.env.DEMO_MODE === "1" ||
    process.env.DEMO_MODE === "true"
  );
}

export function isDemoMode() {
  if (_demoMode) return true;
  return demoModeEnabled();
}

function getDb() {
  if (_db) return _db;

  if (demoModeEnabled()) {
    // No database configured (or demo forced) — switch to demo mode
    _demoMode = true;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { db: demoDb } = require("@/lib/demo-db");
    _db = demoDb as any;
    return _db;
  }

  const databaseUrl = process.env.DATABASE_URL!;

  const globalForDb = globalThis as typeof globalThis & {
    __arenaNextJsPostgresqlPool?: Pool;
  };

  _pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = _pool;
  }

  _db = drizzle(_pool);
  return _db;
}

// Proxy that lazily initializes the DB on first use.
// Typed as any so that in demo mode the in-memory query builder return
// values don't conflict with drizzle's strict typed selectors.
export const db = new Proxy({} as any, {
  get(_target, prop) {
    const instance = getDb();
    return (instance as any)[prop];
  },
});

export { _pool as pool };
