import { Database } from "bun:sqlite";
import { BunSQLiteDatabase, drizzle } from "drizzle-orm/bun-sqlite";

let db: BunSQLiteDatabase | null = null;

export function GetDatabase() {
  if (!db) {
    const sqlite = new Database("data/notifications.db");

    db = drizzle(sqlite);
  }

  return db;
}
