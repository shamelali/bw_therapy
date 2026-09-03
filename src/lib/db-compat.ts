/**
 * DB compatibility shim — exports everything needed for queries.
 * In demo mode (no DATABASE_URL), these work with the in-memory data.
 * When a real database is configured, drizzle-orm equivalents are used.
 *
 * Import from "@/lib/db-compat" instead of "@/db/schema" and "drizzle-orm"
 * so the same code path works in both modes.
 */

// ── Condition helpers (from demo-db) ──────────────────────────────────────
import {
  eq as demoEq,
  asc as demoAsc,
  desc as demoDesc,
  and as demoAnd,
  or as demoOr,
  ilike as demoIlike,
  users as demoUsers,
  providers as demoProviders,
  services as demoServices,
  bookings as demoBookings,
  reviews as demoReviews,
  availability as demoAvailability,
} from "@/lib/demo-db";

export const eq = demoEq as (col: any, value: any) => any;
export const asc = demoAsc as (col: any) => any;
export const desc = demoDesc as (col: any) => any;
export const and = demoAnd as (...args: any[]) => any;
export const or = demoOr as (...args: any[]) => any;
export const ilike = demoIlike as (col: any, val: any) => any;

export function ne(col: unknown, val: unknown): unknown {
  return { __ne: true, col, value: val };
}
export function notInArray(col: unknown, vals: unknown[]): unknown {
  return { __notIn: true, col, values: vals };
}
export function avg(col: unknown): unknown {
  return { __avg: true, col };
}
export function count(col?: unknown): unknown {
  return { __count: true, col: col ?? null };
}
export function sql(_template: TemplateStringsArray, ..._values: unknown[]): unknown {
  return { __sql: true };
}

// ── Table column refs (re-exported from demo-db) ──────────────────────────
// These match the shape of drizzle's schema exports so pages can use the
// same import path in both demo and production modes.
export const users = demoUsers as any;
export const providers = demoProviders as any;
export const services = demoServices as any;
export const bookings = demoBookings as any;
export const reviews = demoReviews as any;
export const availability = demoAvailability as any;
