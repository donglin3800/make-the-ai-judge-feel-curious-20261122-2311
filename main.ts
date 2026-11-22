// Write one short text to /output/entry.txt.
//
// The text is a fixed string literal: no randomness, no clock, no network,
// so every run writes byte-identical output. Stdlib only, nothing to install.
// The output directory is MAKEFUN_OUTPUT_DIR when the grader sets it,
// otherwise /output (the sandbox mount).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "At the bottom of the garden, behind the shed, there is a door I have " +
  "never opened. It has no handle, only a small brass plate with my name " +
  "on it, spelled the way my grandmother spelled it. This morning there " +
  "is light under it.";

function main(): void {
  // Self-check the gate the grader enforces: 1-280 code points, not only
  // white space.
  const chars = [...TEXT].length;
  if (chars < 1 || chars > 280 || !TEXT.trim()) {
    throw new Error(`text fails the 1-280 character gate (${chars} chars)`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  // Read back and confirm exactly what was written, so a silent short
  // write fails loudly instead of shipping a wrong entry.
  if (readFileSync(outPath, "utf8") !== TEXT) {
    throw new Error("entry.txt read-back does not match the text");
  }
}

main();
