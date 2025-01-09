Vercel Deployment: https://mikes-watchlist-spa.vercel.app/

## Project: Movie Explorer

This project will create a movie exploration application that allows users to search for movies, view details, and create a watchlist. We'll use the OMDb API (Open Movie Database), which is free and easy to use.

# React + TypeScript + Vite

# API: OMDb API (Free tier with API key)

The OMDb API provides movie information and is simple to integrate. It offers a free tier with sufficient requests for a side project.
Link: https://www.omdbapi.com/

## Dan's Reccomendations

1. Keep as SPA, thats why we are using Vite
2. No using server! That's why we are moving away from Nextjs
3. Decide whether to build your own components or use a framework
4. Priority is just hitting the API and rendering the movies cards
   a. loading state,
   b. error state,
   c. api key (.env),
   d. pagination

---

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
