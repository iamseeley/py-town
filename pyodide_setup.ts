const pyodideUrl = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/";

export async function initializePyodide() {
  // Mock the global objects expected by Pyodide
  (globalThis as any).window = {};
  (globalThis as any).document = {
    location: { href: "" },
    currentScript: { src: "" },
  };
  (globalThis as any).navigator = {};

  // Dynamically import Pyodide
  const importMap = {
    imports: {
      url: "https://deno.land/std/node/url.ts",
    },
  };

  // Set up import map
  if (!(globalThis as any).importMap) {
    (globalThis as any).importMap = importMap;
  }

  const { loadPyodide } = await import(`${pyodideUrl}pyodide.js`);
  const pyodide = await loadPyodide({
    indexURL: pyodideUrl,
  });
  return pyodide;
}
