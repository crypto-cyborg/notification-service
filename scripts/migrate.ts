import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { MIGRATIONS_FOLDER } from "@/constants/db";

const sqlite = new Database("data/notifications.db");
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
