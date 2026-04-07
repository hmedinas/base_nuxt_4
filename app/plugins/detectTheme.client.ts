// plugins/detectTheme.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const colorStore = useColorStore()

    // Detecta el modo del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    colorStore.setDarkMode(prefersDark)

    // También puedes escuchar cambios mientras el usuario cambia la configuración del OS
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        colorStore.setDarkMode(e.matches)
    })
})
