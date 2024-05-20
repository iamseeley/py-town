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
    version: "0.0.6",
    description: "Execute Python code with Pyodide in Deno and other JS environments",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/iamseeley/py-town.git",
    },
    bugs: {
      url: "https://github.com/iamseeley/py-town/issues",
    },
  },
  postBuild() {
   Deno.copyFileSync('pyodide_worker.ts', 'npm/pyodide-worker.js'); 
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});

