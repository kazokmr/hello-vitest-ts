import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    css: true,
    coverage: {
      provider: "c8",
      reporter: ["html"],
      reportsDirectory: "./reports/coverage"
    },
    reporters: [
      "default",
      "junit",
    ],
    outputFile: "./reports/vitest/vitest-report.xml",
  },
});