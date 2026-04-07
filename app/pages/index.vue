<template>
  <div class="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
    
    <!-- Fondo optimizado con will-change y backdrop-filter más ligero -->
    <div class="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-72 h-72 bg-primary-blue-200 rounded-full blur-2xl opacity-20 will-change-transform"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-green-200 rounded-full blur-2xl opacity-20 will-change-transform"></div>
    </div>

    <div class="max-w-6xl w-full px-4 text-center">
      
      <header class="mb-10">
        <h1 class="text-4xl md:text-6xl font-black text-slate-800 dark:text-white tracking-tight mb-2">
          Bienvenido a <span class="text-primary-blue-600">Proyecto base</span>
        </h1>
       
        <p class="text-xl text-slate-500 dark:text-slate-400 font-medium">
          Arquitectura Base · Nuxt 4 & PrimeVue
        </p>
      </header>

      <!-- Contenedor optimizado con backdrop-filter más ligero -->
      <div class="relative bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-4 mb-10 will-change-transform">
        <WordCloud />
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <button class="px-8 py-3 btn bg-primary  hover:bg-application-blue-100 text-white rounded-xl font-bold shadow-lg hover:bg-primary-blue-700 transition-colors">
          Comenzar
        </button>
        <button class="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-colors">
          Documentación
        </button>
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
// Lazy loading del WordCloud para mejorar rendimiento inicial
const WordCloud = defineAsyncComponent(() => import('~/components/common/WordCloud.vue'));
</script>