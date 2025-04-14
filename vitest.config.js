// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html'], // Affiche dans le terminal et crée un rapport HTML
      include: ['src/**/*.{js,ts}'], // Cible les fichiers de ton dossier src
    },
  },
})