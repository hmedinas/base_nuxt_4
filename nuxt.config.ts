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
  
  modules: ['@pinia/nuxt','@nuxtjs/tailwindcss', '@primevue/nuxt-module', '@vesp/nuxt-fontawesome'],
  
  future: {
    compatibilityVersion: 4,
  },
  fontawesome :{
    icons: {
      solid: [
          'house', 'cog',  'user', 'print', 'calendar', 'calendar-days', 'chart-simple',
          'sack-dollar', 'plus', 'trash',  'trash-can', 'pen','pen-to-square', 'check',
          'rotate', 'rotate-right', 'filter', 'magnifying-glass','circle-info','power-off',
          'moon','sun',  'file-excel','eye',  'x',  'floppy-disk',  'xmark',
          'ban', 'users', 'car-rear', 'minus', 'question', 'gear',  'share-from-square',
          'file-pen',   'money-bill',  'spinner', 'angle-left', 'angle-right',  'square',
          'timeline', 'file', 'file-word', 'file-lines','file-export', 'sack-xmark', 
          'arrow-right-from-bracket', 'desktop', 'person-walking-arrow-right',
          'caret-down', 'caret-up', 'user-clock', 'angle-up', 'angle-down', 'clock', 'shield',
          'plane', 'triangle-exclamation', 'lightbulb', 'chart-simple', 'square-check',
          'rectangle-xmark', 'user-minus', 'user-xmark', 'arrow-right', 'user-pen', 'user-plus', 
          'circle', 'delete-left', 'circle-left', 'plane-circle-check', 'square-poll-vertical',
          'bell', 'envelope', 'calculator', 'address-card', 'share', 'chart-line', 'circle-arrow-right',
          'circle-arrow-left', 'people-arrows', 'stamp', 'bars-progress', 'umbrella','user-shield',
          'retweet', 'cloud', 'g', '0', '1', '2', '3', '4', '5', '8', '6', '7', '9', 'spinner', 
          'circle-check', 'id-badge', 'fa-file-word', 'fa-file-lines', 'fa-holly-berry', 'users', 
          'clock-rotate-left', 'calendar-check', 'map-location', 'paper-plane', 'tag', 'stopwatch',
          'award', 'person', 'desktop', 'robot'
      ],
      regular: ['comment', 'user', 'trash-can', 'square'],
      brands: ['twitter'],
    },
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
