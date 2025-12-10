import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      '@certs': path.resolve(__dirname, './src/certs'),
      '@config': path.resolve(__dirname, './src/config'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@db': path.resolve(__dirname, './src/db'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@schemas': path.resolve(__dirname, './src/schemas'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  },
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.spec.ts"],
    coverage: {
      provider: "v8",
    },
  },
});
