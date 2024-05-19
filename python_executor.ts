export async function executePython(pyodide: any, code: string) {
    try {
        const result = await pyodide.runPythonAsync(code);
        return result;
    } catch (error) {
        console.error("Error executing Python code:", error);
        throw error;
    }
}

