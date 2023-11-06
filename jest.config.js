/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
