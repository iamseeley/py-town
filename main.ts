const pyodideUrl = "https://cdn.jsdelivr.net/pyodide/v0.24.0/full/";

async function main() {
    // Mock the global objects expected by Pyodide
    (globalThis as any).window = {};
    (globalThis as any).document = { location: { href: "" }, currentScript: { src: "" } };
    (globalThis as any).navigator = {};

    // Dynamically import Pyodide
    const { loadPyodide } = await import(`${pyodideUrl}pyodide.mjs`);

    // Initialize Pyodide
    const pyodide = await loadPyodide({
        indexURL: pyodideUrl,
    });
    console.log("Pyodide loaded");

    // Run a simple Python script
    const result = await pyodide.runPythonAsync("3 + 4");
    console.log("Result:", result);
}

main();

