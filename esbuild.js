import dotenv from "dotenv";
import esbuild from "esbuild";
import path from "path";
import process from "process";

dotenv.config();

const flags = process.argv;

const buildSettings = {
  production: flags.includes("production"),
};

const testingVaultPath = path.join(
  process.env.TESTING_VAULT_PATH,
  ".obsidian",
  "plugins",
  "spectrum-companion"
);

const outSettings = buildSettings.production
  ? { outfile: "main.js" }
  : { outdir: testingVaultPath, outbase: "." };

const entrySettings = buildSettings.production
  ? [process.env.ENTRY_FILE]
  : {
      main: process.env.ENTRY_FILE,
      styles: "styles.css",
    };

esbuild
  .build({
    entryPoints: entrySettings,
    bundle: true,
    minify: buildSettings.production,
    external: ["obsidian"],
    format: "cjs",
    watch: !buildSettings.production,
    target: "es2016",
    logLevel: "info",
    sourcemap: buildSettings.production ? false : "inline",
    treeShaking: true,
    ...outSettings,
  })
  // eslint-disable-next-line unicorn/no-process-exit
  .catch(() => process.exit(1));
