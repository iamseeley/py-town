import { executePython } from "./python_executor.ts";

export async function runHttpServer(pyodide: any) {
    const httpServerCode = `
    import http.server
    import socketserver

    PORT = 8000

    Handler = http.server.SimpleHTTPRequestHandler

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("serving at port", PORT)
        httpd.serve_forever()
    `;

    return await executePython(pyodide, httpServerCode);
}

