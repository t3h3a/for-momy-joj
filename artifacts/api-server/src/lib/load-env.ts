import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const parseEnvLine = (line: string): [string, string] | null => {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("#")) return null;

  const separatorIndex = trimmed.indexOf("=");
  if (separatorIndex <= 0) return null;

  const key = trimmed.slice(0, separatorIndex).trim();
  let value = trimmed.slice(separatorIndex + 1).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return [key, value];
};

export const loadEnvFiles = () => {
  const envPaths = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "artifacts/api-server/.env"),
  ];

  for (const envPath of envPaths) {
    if (!existsSync(envPath)) continue;

    const envFile = readFileSync(envPath, "utf8");

    for (const line of envFile.split(/\r?\n/)) {
      const envEntry = parseEnvLine(line);
      if (!envEntry) continue;

      const [key, value] = envEntry;
      process.env[key] ??= value;
    }
  }
};
