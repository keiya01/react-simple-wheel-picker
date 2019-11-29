module.exports = {
  roots: ["<rootDir>/src"],
  testRegex: "(/__tests__/.*|(\\.|/)test)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.+)": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
