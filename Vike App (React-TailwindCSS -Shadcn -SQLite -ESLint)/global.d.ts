import type { db as sqliteDb } from "./database/sqlite/db";

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof sqliteDb>;
    }
  }
}
