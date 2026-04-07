/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}", // <--- ESTO ES VITAL EN NUXT 4
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      colors:{
        // Definir Colores Primarios
        primary: '#3F51B5',
        alternative:{          
          red:{
            100 : '#f43f5e',
            200 : '#E91E63',
          },
          purple: {
            100 : '#9C27B0',
            200 : '#673AB7',
            300 : '#3F51B5',
          },
          blue:{
            100 : '#2196F3',
            200 : '#03A9F4',
            300 : '#00BCD4',
          },
          green: {
            100 : '#10b981',
            200 : '#22c55e',
            300 : '#84cc16'
          },
          yellow : '#eab308',
         
          orange : {
            100 : '#f97316',
            200 : '#f97316'
          },
        },
        application: {
          select: '',           
          blue:{
            100: '#337ab7',
            300: '#44658f',
            500 : '#154481',
            600 : '#133d74'
          },
          yellow: {
            100 : '#fde8d1',
            500 : '#e0b800'
          },
          silver: {
            800 : '#676a6c',
            300 : '#dfe4ed',
            100 : '#e7eaec'
          },
          green : '#1ab394',
          footer: '#2d313775' 
        },
        // Puedes agregar más colecciones de colores si lo deseas
        dark :
          {
            panel: '#34343d',
            fondo : '#1d1e27',
            text : '#ffffff',
            textSecondary : '#a5a5a9'           
        },
        fondo : {
          100 : '#dfe4ed',
          200 : '#babec6',
          300 : '#bac2c6',
          400 : '#a7a0a66e',
          500 : '#b1b4b078',
          600 : '#808080a8',
          700 : '#828f8fa8'
        },
        brand: {
        turno24: "#2c8fa361",      
        turno12: "#7ac29a4f",    
        turno8: "#b785e354",     
        turno6: "#e65c5c59",       
        diasEspeciales: "#88c9c563", 
        guardia: "#e8b86d63",  
        cambio: "#FF8C94B3",      
        vacaciones: '#dbdbdbad',
        moscosos: '#dbdbdbad',
        permiso: '#dbdbdbad',
        festivo: '#fb121212'
        },
        brandBorder: {
            turno24: "#227283",     
            turno12: "#619E7D",     
            turno8:  "#946ABB",    
            turno6:  "#e65c5c",    
            diasEspeciales: "#638f8c",   
            guardia: "#C09657",  
            cambio: "#CC707A",       
            vacaciones: "#707070",   
            moscosos:   "#707070",
            permiso:    "#707070"
        }

      }
    },
  },
  plugins: [
    require('tailwindcss-primeui'),
    require('daisyui')
  ],
  darkMode: 'class',
  themes: ['light','dark'],
    darkTheme: "dark",
    base: true,
    utils: true,
    logs: false,
}
