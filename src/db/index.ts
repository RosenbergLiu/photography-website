import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { validateServerEnv } from "@/env";

validateServerEnv();

function createDb() {
  return drizzle(new pg.Pool({ connectionString: process.env.DATABASE_URL! }), {
    schema,
  });
}

// Cache on globalThis to prevent connection pool leaks during Next.js HMR
const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof createDb>;
};
export const db = (globalForDb.db ??= createDb());
