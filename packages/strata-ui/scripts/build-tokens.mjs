import StyleDictionary from "style-dictionary";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, ".."); // packages/strata-ui

const toKebab = (s) =>
  String(s).replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

StyleDictionary.registerTransform({
  name: "strata/name",
  type: "name",
  transform: (token) => ["strata", ...token.path.map(toKebab)].join("-"),
});

// Emit CSS custom properties under a configurable selector.
StyleDictionary.registerFormat({
  name: "strata/css-vars",
  format: ({ dictionary, options }) => {
    const selector = options.selector ?? ":root";
    const body = dictionary.allTokens
      .map((token) => `  --${token.name}: ${token.value};`)
      .join("\n");
    return `${selector} {\n${body}\n}`;
  },
});

// Emit typed TS constants (snake_case identifiers).
StyleDictionary.registerFormat({
  name: "strata/ts-constants",
  format: ({ dictionary }) => {
    const header =
      "// Generated from tokens/*.json by scripts/build-tokens.mjs — do not edit.";
    const lines = dictionary.allTokens.map(
      (token) =>
        `export const ${token.name.replace(/-/g, "_")} = ${JSON.stringify(token.value)};`,
    );
    return `${header}\n\n${lines.join("\n")}\n`;
  },
});

async function buildCss(sourceFile, selector) {
  const sd = new StyleDictionary({
    source: [path.join(root, "tokens", sourceFile)],
    platforms: {
      css: {
        transforms: ["strata/name"],
        buildPath: path.join(root, "dist-tokens/"),
        files: [
          { destination: "out.css", format: "strata/css-vars", options: { selector } },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
  return fs.readFileSync(path.join(root, "dist-tokens/out.css"), "utf8").trim();
}

async function main() {
  fs.mkdirSync(path.join(root, "dist-tokens"), { recursive: true });
  fs.mkdirSync(path.join(root, "src/generated"), { recursive: true });

  const lightCss = await buildCss("light.json", ":root");
  const darkCss = await buildCss("dark.json", '.strata-dark, [data-theme="dark"]');

  const components = fs
    .readFileSync(path.join(root, "src/styles/components.css"), "utf8")
    .trim();
  const header =
    "/* Generated from tokens/*.json by scripts/build-tokens.mjs — do not edit. */";

  fs.writeFileSync(
    path.join(root, "strata.css"),
    `${header}\n\n${lightCss}\n\n${darkCss}\n\n${components}\n`,
  );

  const sdTs = new StyleDictionary({
    source: [path.join(root, "tokens", "light.json")],
    platforms: {
      ts: {
        transforms: ["strata/name"],
        buildPath: path.join(root, "src/generated/"),
        files: [{ destination: "tokens.ts", format: "strata/ts-constants" }],
      },
    },
  });
  await sdTs.buildAllPlatforms();

  console.log("✓ Generated strata.css and src/generated/tokens.ts");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
