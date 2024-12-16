const pyodideUrl = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/";

export async function initializePyodide() {
  // Mock the global objects expected by Pyodide
  (globalThis as any).window = {
    document: {
      currentScript: { src: pyodideUrl },
      location: { href: pyodideUrl },
    },
    location: { href: pyodideUrl },
  };
  (globalThis as any).navigator = {};

  // Load Pyodide script
  (globalThis as any).loadPyodide = (
    await import(`${pyodideUrl}pyodide.js`)
  ).default;

  const pyodide = await (globalThis as any).loadPyodide({
    indexURL: pyodideUrl,
  });

  return pyodide;
}
