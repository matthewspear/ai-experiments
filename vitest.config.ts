import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    // DOM tests can opt in with a @vitest-environment jsdom comment.
    environment: "node",
    setupFiles: "./vitest.setup.ts",
    globals: true,
    env: {
      // Tests mock the database, Redis and auth; nothing reads real credentials.
      SKIP_ENV_VALIDATION: "1",
    },
  },
});
