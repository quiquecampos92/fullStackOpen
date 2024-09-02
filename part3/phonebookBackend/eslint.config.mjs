import globals from "globals";
import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";  // Comentado o eliminado

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node,  // Añadir variables globales de Node.js
      },
    },
  },
  pluginJs.configs.recommended,
  // pluginReact.configs.flat.recommended,  // Comentado o eliminado
];
