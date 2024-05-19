import { executePython } from "./python_executor.ts";

export async function runBottleServer(pyodide: any) {
    const bottleCode = `
    from bottle import Bottle, run

    app = Bottle()

    @app.route('/')
    def home():
        return {"Hello": "World"}

    @app.route('/greet/<name>')
    def greet(name):
        return {"message": f"Hello, {name}!"}

    if __name__ == "__main__":
        run(app, host='0.0.0.0', port=8000)
    `;

    return await executePython(pyodide, bottleCode);
}

