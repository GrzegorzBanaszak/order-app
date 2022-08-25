module.exports = {
  extends: ["plugin:vue/vue3-recommended"],
  rules: { "vue/multi-word-component-names": "off" },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false, // <== ADD THIS
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
};
