import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  platform: "browser",
  target: "es2020",
  outDir: "dist",
  format: ["esm"],
  dts: true,
});
