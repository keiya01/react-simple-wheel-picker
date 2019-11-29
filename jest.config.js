module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/stories"],
  testRegex: "(/__tests__/.*|(\\.|/)test)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.+)": "<rootDir>/src/$1"
  },
  setupFiles: ["<rootDir>/.jest/register-context.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
