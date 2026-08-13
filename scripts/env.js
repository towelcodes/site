import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";

const commitHash = execSync("git rev-parse HEAD").toString().trim();
const msg = execSync("git log -1 --pretty=%B").toString().trim();
const time = Date.now() / 1000;

// values this script is responsible for
const updates = {
  COMMIT_HASH: commitHash,
  COMMIT_MSG: msg,
  COMMIT_TIME: time,
};

// read the existing .env file, if any
const existing = existsSync(".env") ? readFileSync(".env", "utf8") : "";

const lines = existing.split("\n");
const seen = new Set();
const out = [];

for (const line of lines) {
  const match = line.match(/^(\s*)([A-Za-z_][A-Za-z0-9_]*)\s*=/);
  if (match) {
    const indent = match[1];
    const key = match[2];
    if (key in updates) {
      // replace the value, keep the original key name and leading whitespace
      out.push(`${indent}${key}=${updates[key]}`);
      seen.add(key);
      continue;
    }
  }
  // preserve comments, blank lines, and unrelated vars untouched
  out.push(line);
}

// append any keys that weren't already present
for (const key of Object.keys(updates)) {
  if (!seen.has(key)) {
    out.push(`${key}=${updates[key]}`);
  }
}

writeFileSync(".env", out.join("\n") + "\n");
