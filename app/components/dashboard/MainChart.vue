<template>
  <div class="chart-wrapper">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { 
  Chart, LineController, LineElement, PointElement, 
  LinearScale, CategoryScale, Title, Tooltip, Legend, Filler 
} from 'chart.js'

// Registramos módulos (Tree-shaking para que la SPA pese poco)
Chart.register(
  LineController, LineElement, PointElement, 
  LinearScale, CategoryScale, Title, Tooltip, Legend, Filler
)

const chartCanvas = ref(null)
let chartInstance = null

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
          label: 'Rendimiento Fullstack',
          data: [12, 19, 15, 25, 22, 30, 45],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false } // Quitamos leyenda para look limpio
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
          x: { grid: { display: false } }
        }
      }
    })
  }
})

// Evitamos fugas de memoria al navegar en la SPA
onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
})
</script>

<style scoped>
.chart-wrapper {
  height: 350px; /* Altura fija para el gráfico */
  width: 100%;
}
</style>