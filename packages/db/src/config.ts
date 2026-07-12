export const DEFAULT_DATABASE_URL =
  "postgres://aksfavourite:aksfavourite@localhost:5432/aksfavourite";

export function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL;
}
