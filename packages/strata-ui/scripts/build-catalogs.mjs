// build-catalogs.mjs — generates dist-catalogs/catalogs.json from the
// component sources. The API half (component name + variant enums) is DERIVED
// from the code; the design-intent half (tokenBindings + layout) is authored
// separately (captured from Figma via Loop 1) and merged in later.
// See docs/figma-integration.md and adr-010-catalogs-contract.md.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, ".."); // packages/strata-ui
const componentsDir = path.join(root, "src", "components");
const outDir = path.join(root, "dist-catalogs");

/** Return the balanced {…} block starting at `from` (src[from] must be "{"). */
function balanced(src, from) {
  let depth = 0;
  for (let i = from; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return src.slice(from, i + 1);
    }
  }
  return null;
}

/** Find `key`, then return the balanced {…} block that follows it. */
function blockAfter(src, key) {
  const idx = src.indexOf(key);
  if (idx === -1) return null;
  let i = idx + key.length;
  while (i < src.length && /[\s:]/.test(src[i])) i++;
  if (src[i] !== "{") return null;
  return balanced(src, i);
}

/** variants: { name: { value: "…", … }, … } → { name: [values] } */
function parseVariants(block) {
  if (!block) return {};
  const out = {};
  const re = /(\w+)\s*:\s*\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    const keys = [...m[2].matchAll(/(\w+)\s*:/g)].map((k) => k[1]);
    if (keys.length) out[m[1]] = keys;
  }
  return out;
}

/** { key: "value", … } → { key: value } */
function parseFlat(block) {
  if (!block) return {};
  const out = {};
  const re = /(\w+)\s*:\s*["']([^"']*)["']/g;
  let m;
  while ((m = re.exec(block)) !== null) out[m[1]] = m[2];
  return out;
}

function extract(filePath) {
  const src = fs.readFileSync(filePath, "utf8");

  // All exported components in this file (forwardRef, function, or compound namespace).
  const names = [];
  const re = /export (?:const|function) (\w+)/g;
  let m;
  while ((m = re.exec(src)) !== null) names.push(m[1]);
  if (!names.length) return [];

  // The file's (single) cva definition, if any.
  const cvaMatch = src.match(/const (\w+)\s*=\s*cva\(/);
  const cvaVar = cvaMatch ? cvaMatch[1] : null;
  const variants = cvaVar ? parseVariants(blockAfter(src, "variants")) : {};
  const defaults = cvaVar ? parseFlat(blockAfter(src, "defaultVariants")) : {};

  // Which component's Props consumes this cva? Fall back to the first export.
  const owner = cvaVar
    ? names.find((n) =>
        new RegExp(`interface ${n}Props[\\s\\S]*?VariantProps<typeof ${cvaVar}>`).test(src),
      ) ?? names[0]
    : null;

  return names.map((name) => ({
    name,
    variants: name === owner ? variants : {},
    defaultVariants: name === owner ? defaults : {},
    tokenBindings: {}, // authored (design intent) — merged from Figma, Loop 1
    layout: {},        // authored (design intent)
  }));
}

const components = fs
  .readdirSync(componentsDir)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
  .flatMap((f) => extract(path.join(componentsDir, f)))
  .sort((a, b) => a.name.localeCompare(b.name));

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "catalogs.json"),
  JSON.stringify({ components }, null, 2) + "\n",
);

console.log(`catalogs.json: ${components.length} components → dist-catalogs/catalogs.json`);
for (const c of components) {
  const v = Object.entries(c.variants)
    .map(([k, vals]) => `${k}=[${vals.join("|")}]`)
    .join(", ");
  console.log(`  ${c.name}${v ? ` · ${v}` : ""}`);
}
