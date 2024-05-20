import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "py-town",
    version: "0.0.2",
    description: "Execute Python code with Pyodide in Deno and other JS environments",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/yourusername/py-town.git",
    },
    bugs: {
      url: "https://github.com/yourusername/py-town/issues",
    },
  },
  postBuild() {
    
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});

