<template>
  <div class="relative w-full max-w-[800px] h-[500px] mx-auto overflow-hidden bg-transparent select-none font-sans">
    <div 
      v-for="(item, index) in techStack" 
      :key="index"
      :class="[
        'word-item absolute flex items-center justify-center will-change-transform',
        item.rotate,
        item.color
      ]"
      :style="{ 
        top: item.top, 
        left: item.left, 
        fontSize: item.size,
        fontWeight: item.weight,
        opacity: item.opacity || '1'
      }"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const techStack = [
  // Nucleo - Grande y Central
  { name: 'Nuxt 4', top: '40%', left: '30%', size: '100px', weight: '900', color: 'text-green-500', rotate: 'rotate-0' },
  { name: 'Vue 3', top: '20%', left: '10%', size: '60px', weight: '800', color: 'text-emerald-400', rotate: '-rotate-12' },
  
  // UI Frameworks
  { name: 'PrimeVue', top: '15%', left: '50%', size: '70px', weight: '900', color: 'text-primary-blue-500', rotate: 'rotate-0' },
  { name: 'TailwindCSS', top: '65%', left: '15%', size: '55px', weight: '700', color: 'text-sky-400', rotate: 'rotate-0' },
  { name: 'DaisyUI', top: '75%', left: '55%', size: '40px', weight: '600', color: 'text-yellow-500', rotate: 'rotate-12' },

  // Estado y Lógica
  { name: 'Pinia', top: '55%', left: '70%', size: '50px', weight: '800', color: 'text-orange-400', rotate: 'rotate-90' },
  { name: 'VueUse', top: '10%', left: '35%', size: '30px', weight: '600', color: 'text-blue-400', rotate: 'rotate-0' },
  { name: 'docxtemplater', top: '35%', left: '65%', size: '30px', weight: '500', color: 'text-blue-400', rotate: 'rotate-0' },
  
  // Herramientas
  { name: 'Axios', top: '80%', left: '5%', size: '35px', weight: '500', color: 'text-indigo-500', rotate: '-rotate-45' },
  { name: 'Chart.js', top: '5%', left: '75%', size: '45px', weight: '700', color: 'text-red-400', rotate: 'rotate-0' },
  { name: 'OIDC', top: '45%', left: '80%', size: '35px', weight: '800', color: 'text-slate-400', rotate: 'rotate-90' },
  
  // Otros
  { name: 'FontAwesome', top: '85%', left: '35%', size: '25px', weight: '400', color: 'text-blue-600', rotate: 'rotate-0', opacity: '0.6' },
  { name: 'Date-fns', top: '30%', left: '5%', size: '20px', weight: '400', color: 'text-slate-500', rotate: 'rotate-0', opacity: '0.5' },
];
</script>

<style scoped>
/* Optimización: usar transform en lugar de top/left para mejor rendimiento */
.word-item {
  transition: transform 0.3s ease, color 0.3s ease;
  animation: float 6s ease-in-out infinite;
  backface-visibility: hidden; /* Optimización de rendering */
  -webkit-font-smoothing: antialiased;
}

.word-item:hover {
  transform: scale(1.1);
  color: rgb(59 130 246); /* primary-blue-500 */
  cursor: default;
}

/* Variar el delay para efecto más natural y fluido */
.word-item:nth-child(odd) {
  animation-delay: -2s;
}

.word-item:nth-child(3n) {
  animation-delay: -4s;
}

.word-item:nth-child(even) {
  animation-delay: -1s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translateZ(0);
  }
  50% { 
    transform: translateY(-10px) translateZ(0);
  }
}

/* Reducir animaciones en dispositivos con preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  .word-item {
    animation: none;
  }
}
</style>