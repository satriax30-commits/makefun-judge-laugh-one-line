// Make the Judge Laugh in One Line — u-email-baru-make-the-judge-laugh-in-one-line-791ccb21
// A tiny deterministic Node 22 program (stdlib only) that writes one original
// one-line joke to /output/entry.txt.
//
// The joke follows the winning shape from the make.fun leaderboard scrape
// (WINNING-REFERENCE.md §2, "The one-line laugh"): a dark-but-warm
// observation, a concrete scene, and an absurd comparison in the LAST clause
// ("like [concrete absurd image]" — a picture, not a judgement). Three beats:
// the setup (blood-pressure check), the escalation (fist-pump), and the
// reversal in the final clause (he beat his own heart at arm-wrestling).
// It carries a specific number (7), a concrete time (every morning) and a
// person in the frame (my uncle, the butt of the joke), at 141 of 200 chars.
//
// Deterministic: no clock, no randomness, no network, no input. The same
// bytes are written on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "My uncle checks his blood pressure at 7 every morning, then fist-pumps the good days like a man who just beat his own heart at arm-wrestling.";

// The grader runs the program with /output as the working output directory;
// fall back to a local ./output when run by hand.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function main(): void {
  // Gate: 1-200 characters, not only whitespace, a single line.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, ENTRY, "utf8");

  // Read back and confirm the file holds exactly the entry we validated.
  const written = readFileSync(outFile, "utf8");
  if (written !== ENTRY) {
    throw new Error("entry.txt does not match the validated entry");
  }
}

main();
