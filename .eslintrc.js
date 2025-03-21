// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "plugin:import/recommended",
// the following lines do the trick
    "plugin:import/typescript",
  ],
  settings: {
    "import/resolver": {
      // You will also need to install and configure the TypeScript resolver
      // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
      "typescript": true,
      "node": true,
    },
  },
  ignorePatterns: ['/dist/*'],
};
