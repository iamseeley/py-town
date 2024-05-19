const pyodideUrl = "https://cdn.jsdelivr.net/pyodide/v0.24.0/full/";

export async function initializePyodide() {
    // Mock the global objects expected by Pyodide
    (globalThis as any).window = {};
    (globalThis as any).document = { location: { href: "" }, currentScript: { src: "" } };
    (globalThis as any).navigator = {};

    // Dynamically import Pyodide
    const { loadPyodide } = await import(`${pyodideUrl}pyodide.mjs`);

    const pyodide = await loadPyodide({
        indexURL: pyodideUrl,
    });

    // Load necessary Python packages
    await pyodide.loadPackage("micropip");

    return pyodide;
}

