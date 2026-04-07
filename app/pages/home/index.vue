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

       <div class=" flex justify-center items-center p-5">
            <img src="/assets/img/icon5.png" width="550px">
          </div>


    </div>
  </div>
</template>

       
      