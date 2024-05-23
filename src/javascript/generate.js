import { createHash } from "crypto";

// can generate number between 0 to UPPER_RANGE - 1
export function generateNumberFromSeed(KEY, UPPER_RANGE) {
  const HASH = createHash("sha1").update(String(KEY)).digest().readUInt32BE();
  return HASH % UPPER_RANGE;
}
