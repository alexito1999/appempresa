import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                tabla: resolve(__dirname, "src/tabla.html"),
                scanner: resolve(__dirname, "src/scanner.html")
            }
        }
    }
}); 