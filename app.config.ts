import { defineAppConfig } from "nuxt/app"

export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool'
  },
  public: {
    base: 'https://panel.newtrendy.pl',
    apiBase: 'https://panel.newtrendy.pl/api',
    // base: 'http://localhost:8000',
    // apiBase: `http://localhost:8000/api`,
  }
})