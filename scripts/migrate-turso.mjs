import { createClient } from "@libsql/client";
import { readFileSync } from "fs";

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const sql1 = readFileSync("prisma/migrations/20260330150433_init/migration.sql", "utf8");
const sql2 = readFileSync("prisma/migrations/20260331084433_add_bank_accounts/migration.sql", "utf8");

const fullSql = sql1 + "\n" + sql2;

// Remove comment lines, then split by semicolons
const cleaned = fullSql
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n");

const statements = cleaned
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

console.log(`Ejecutando ${statements.length} sentencias...`);

for (const stmt of statements) {
  try {
    await client.execute(stmt);
    console.log("✓", stmt.slice(0, 70).replace(/\s+/g, " "));
  } catch (e) {
    if (
      e.message.includes("already exists") ||
      e.message.includes("duplicate") ||
      e.message.includes("UNIQUE constraint failed")
    ) {
      console.log("⚠ ya existe:", stmt.slice(0, 60).replace(/\s+/g, " "));
    } else {
      console.error("✗ ERROR:", e.message, "\n→", stmt.slice(0, 120).replace(/\s+/g, " "));
    }
  }
}

console.log("\n✅ Migración completada");
client.close();
