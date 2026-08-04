import { migrateGoogleZohoDatabase } from "../lib/googleZoho/database";

function main(): void {
  const dbIndex = process.argv.indexOf("--db");
  const databasePath = dbIndex >= 0 ? process.argv[dbIndex + 1] : undefined;
  if (dbIndex >= 0 && !databasePath) throw new Error("--db requires a path or :memory:.");
  const result = migrateGoogleZohoDatabase({ databasePath });
  const applied =
    result.applied.length > 0
      ? result.applied.map((migration) => `${migration.version}:${migration.name}`).join(", ")
      : "none (already current)";

  process.stdout.write(
    [
      "Google/Zoho integration database migration complete.",
      `Database: ${result.databasePath}`,
      `Schema: ${result.previousVersion} -> ${result.currentVersion}`,
      `Applied: ${applied}`,
      "",
    ].join("\n"),
  );
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown migration failure.";
  process.stderr.write(`Google/Zoho integration database migration failed: ${message}\n`);
  process.exitCode = 1;
}
