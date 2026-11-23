#!/usr/bin/env node
/**
 * Replaces the Lovable-hosted image pointers with real local images.
 *
 * Usage:   node scripts/localize-assets.mjs <folder-with-your-original-images>
 *
 * Every src/assets/**\/*.asset.json file records the original file name of its image
 * (for example "divaluxe-flyer.jpg"). This script finds a file with that name inside the
 * folder you give it (searching sub-folders too), copies it to public/images/<same sub-folder>/,
 * and rewrites the pointer's "url" to "/images/...". No component code needs to change.
 * Files it cannot find are listed at the end; the pointer is left untouched for those.
 */
import fs from "node:fs";
import path from "node:path";

const source = process.argv[2];
if (!source || !fs.existsSync(source)) {
  console.error("Usage: node scripts/localize-assets.mjs <folder-with-your-original-images>");
  process.exit(1);
}

const root = process.cwd();
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const norm = (n) => n.toLowerCase().replace(/\s+/g, "-");
const available = new Map();
for (const file of walk(source)) available.set(norm(path.basename(file)), file);

const pointers = walk(path.join(root, "src", "assets")).filter((f) => f.endsWith(".asset.json"));
const missing = [];
let done = 0;

for (const pointerPath of pointers) {
  const pointer = JSON.parse(fs.readFileSync(pointerPath, "utf8"));
  const wanted = pointer.original_filename ?? path.basename(pointerPath).replace(/\.asset\.json$/, "");
  const found = available.get(norm(wanted));
  if (!found) {
    missing.push(path.relative(root, pointerPath) + "  (looking for " + wanted + ")");
    continue;
  }
  const rel = path.relative(path.join(root, "src", "assets"), path.dirname(pointerPath));
  const destDir = path.join(root, "public", "images", rel);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(found, path.join(destDir, wanted));
  pointer.url = "/" + path.posix.join("images", ...rel.split(path.sep).filter(Boolean), wanted);
  fs.writeFileSync(pointerPath, JSON.stringify(pointer, null, 2) + "\n");
  done++;
}

console.log(`Localised ${done} of ${pointers.length} images.`);
if (missing.length) {
  console.log("\nStill missing (these will show as broken images):");
  missing.forEach((m) => console.log("  - " + m));
}
