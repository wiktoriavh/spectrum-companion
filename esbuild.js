const esbuild = require("esbuild");
const process = require("process");

const production = process.argv[2] === "production";

esbuild
  .build({
    entryPoints: ["src/input.ts"],
    bundle: true,
    minify: false,
    external: ["obsidian"],
    target: "es2016",
    logLevel: "info",
    sourcemap: production ? false : "inline",
    treeShaking: true,
    outfile: "main.js",
    format: "cjs",
  })
  // eslint-disable-next-line unicorn/no-process-exit
  .catch(() => process.exit(1));
