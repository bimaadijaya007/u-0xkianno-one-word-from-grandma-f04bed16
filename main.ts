// One Word From Grandma — make.fun entry
// The single word my grandma would text about AI: "robit" — her typo
// for "robot". Warm, baffled, unmistakably grandma, and tied to AI.
// The program writes that one word to /output/entry.txt for the
// sealed scorer to check (UTF-8, 1-30 characters, not only whitespace).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "robit";

function validateWord(word: string): string {
  const clean = word.trim();
  if (clean.length < 1 || clean.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${clean.length}`);
  }
  if (!/\S/.test(clean)) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(clean)) {
    throw new Error("entry must be exactly one word");
  }
  // One plain word, no punctuation tricks: what grandma would actually type.
  if (!/^[A-Za-z]+$/.test(clean)) {
    throw new Error("entry must be letters only");
  }
  return clean;
}

function main(): void {
  const word = validateWord(WORD);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", word, { encoding: "utf8", mode: 0o644 });
  // Verify the round-trip: what the scorer reads must be exactly the word.
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== word) {
    throw new Error("round-trip mismatch in /output/entry.txt");
  }
  console.log(`wrote /output/entry.txt (${word.length} chars): ${word}`);
}

main();
