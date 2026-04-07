// https://nuxt.com/docs/api/configuration/nuxt-config

import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// 1. Obtiene la ruta del archivo actual (URL -> Path)
const __filename = fileURLToPath(import.meta.url)

// 2. Obtiene el directorio de ese archivo
const __dirname = dirname(__filename)

// 3. tenemos la ruta del archivo de configuracion
/*
const configPath = join(__dirname, 'app', 'config', 'config.json')
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

*/

const configPath = resolve(process.cwd(), 'app/config/config.json')
const config = JSON.parse(readFileSync(configPath, 'utf-8'))

const stage = process.env.NUXT_ENV_STAGE || 'staging'
console.log('[DEBUG] NUXT_ENV_STAGE:', stage)
const appConfig = config[stage]


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  ssr: false, // SPA mode
  
  modules: ['@pinia/nuxt','@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  
  future: {
    compatibilityVersion: 4,
  },
  
  primevue: {
    components: {
      include: ['Button', 'DataTable', 'Column', 'DatePicker', 'InputMask'],
    },
    options: { 
      theme: 'none'
    },
  },
  
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css',
    '~/assets/css/base.css'
  ],
  
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  vite: {
    clearScreen: false,
  },

  runtimeConfig:{
        public:{
            envStage: stage,
            appConfig
        }
    }
})
