export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: [],
  app: {
    head: {
      title: 'Astromat: números a bordo',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Una aventura espacial para aprender matemáticas.' }
      ]
    }
  }
})
