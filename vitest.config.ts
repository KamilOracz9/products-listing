import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import tsconfigPaths from "vite-tsconfig-paths";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
    plugins: [
        Vue(),
        tsconfigPaths(),
        AutoImport({
            imports: ["vue"],
        }),
    ],
    test: {
        globals: true,
    }
})