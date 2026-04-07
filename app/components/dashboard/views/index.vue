<template>
  <div class="dashboard-container">
    <header class="header">
      <div>
        <h1>Tablero de Prueba</h1>
        <p>Bienvenido al Panel de Control (Es solo un demo).</p>
      </div>
      <button class="btn-primary">Descargar Reporte</button>
    </header>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="card">
        <span class="label">{{ stat.label }}</span>
        <div class="value">{{ stat.value }}</div>
        <span class="trend" :class="stat.trendColor">{{ stat.trend }}</span>
      </div>
    </div>

    <div class="main-card">
      <div class="card-header">
        <h2>Tráfico del Sistema</h2>
        <select>
          <option>Últimos 7 días</option>
          <option>Último mes</option>
        </select>
      </div>
      <DashboardComponentsMainChart></DashboardComponentsMainChart>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { label: 'Uptime', value: '99.98%', trend: '+0.02%', trendColor: 'up' },
  { label: 'Peticiones API', value: '45.2k', trend: '+12%', trendColor: 'up' },
  { label: 'Latencia Media', value: '42ms', trend: '-5ms', trendColor: 'up' },
  { label: 'Errores 5xx', value: '0', trend: '0%', trendColor: 'neutral' }
]
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  color: #1f2937;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 { font-size: 1.5rem; font-weight: 700; margin: 0; }
.header p { color: #6b7280; font-size: 0.9rem; margin: 4px 0 0; }

.btn-primary {
  background: #111827;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 12px;
}

.card .label { font-size: 0.8rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
.card .value { font-size: 1.8rem; font-weight: 700; margin: 8px 0; }
.card .trend { font-size: 0.85rem; font-weight: 600; }
.card .trend.up { color: #10b981; }

.main-card {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.card-header h2 { font-size: 1.1rem; }
</style>