// Codemod: merge `import { x } from "@/db/schema"` into `from "@/lib/db-compat"`.
// Skips type-only imports and files where schema import contains only types.
const fs = require("fs");
const { execSync } = require("child_process");

const files = execSync(
  `grep -rl 'from "@/db/schema"' src/app src/lib --include='*.ts' --include='*.tsx'`,
  { cwd: process.cwd(), encoding: "utf8" },
)
  .trim()
  .split("\n")
  .filter(Boolean);

let changed = 0;
for (const file of files) {
  let src = fs.readFileSync(file, "utf8");
  // Match single-line value imports: import { a, b } from "@/db/schema";
  const re = /^import\s*\{([^}]+)\}\s*from\s*"@\/db\/schema";?\s*$/gm;
  const matches = [...src.matchAll(re)];
  if (matches.length === 0) continue;

  for (const m of matches) {
    const names = m[1]
      .split(",")
      .map((s) => s.trim())
      .filter((n) => n && !n.startsWith("type ")); // drop inline type specifiers
    if (names.length === 0) continue; // type-only import — leave alone

    // Find existing db-compat import
    const compatRe = /^import\s*\{([^}]+)\}\s*from\s*"@\/lib\/db-compat";?\s*$/m;
    const compatMatch = src.match(compatRe);
    if (compatMatch) {
      const existing = compatMatch[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const merged = [...new Set([...existing, ...names])].sort();
      src = src.replace(compatRe, `import { ${merged.join(", ")} } from "@/lib/db-compat";`);
    } else {
      // No compat import — replace schema import with a compat import
      src = src.replace(m[0], `import { ${names.sort().join(", ")} } from "@/lib/db-compat";`);
    }
    // Remove the schema import line
    src = src.replace(m[0] + "\n", "");
  }
  fs.writeFileSync(file, src);
  changed++;
  console.log("updated:", file);
}
console.log(`\n${changed} file(s) updated`);
