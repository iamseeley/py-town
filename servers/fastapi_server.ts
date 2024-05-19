import { executePython } from "./python_executor.ts";

export async function runStarletteServer(pyodide: any) {
    const starletteCode = `
    from starlette.applications import Starlette
    from starlette.responses import JSONResponse
    import uvicorn

    app = Starlette()

    @app.route("/")
    async def homepage(request):
        return JSONResponse({"Hello": "World"})

    @app.route("/greet/{name}")
    async def greet(request):
        name = request.path_params['name']
        return JSONResponse({"message": f"Hello, {name}!"})

    if __name__ == "__main__":
        uvicorn.run(app, host="0.0.0.0", port=8000)
    `;

    return await executePython(pyodide, starletteCode);
}

