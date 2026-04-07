# Solución al Error IPC Connection Closed - Nuxt 4

## Problema Identificado

El error "IPC connection closed" en Nuxt 4.4.2 está ocurriendo debido a **incompatibilidad entre PrimeVue y la versión de Node.js v20.18.0**.

## Causa Raíz

1. **Versión de Node.js incompatible**: Tienes Node v20.18.0 pero Nuxt 4.4.2 requiere v20.19.0 o superior
2. **Plugin de PrimeVue causando crash**: El archivo `app/plugins/primevue.client.ts` está causando que el proceso de renderizado falle
3. **Conflicto entre múltiples dependencias**: PrimeVue + Tailwind CSS + DaisyUI causando sobrecarga

## Solución Aplicada

### 1. Limpieza de Configuración

**nuxt.config.ts** simplificado:
```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  
  modules: ['@nuxtjs/tailwindcss'],
  
  future: {
    compatibilityVersion: 4,
  },
  
  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  vite: {
    clearScreen: false,
  },
})
```

### 2. Plugins Deshabilitados

Se renombró `app/plugins/primevue.client.ts` a `app/plugins/primevue.client.ts.bak` para deshabilitar Prime Vue temporalmente.

### 3. Estructura de Archivos Corregida

- `app/app.vue`: Ahora usa `<NuxtPage />` como wrapper
- `app/pages/index.vue`: Contiene el contenido principal
- `app/assets/css/main.css`: Importa Tailwind CSS

## Scripts Útiles Agregados

```json
{
  "scripts": {
    "clean": "rm -rf .nuxt node_modules/.vite node_modules/.cache .output dist",
    "clean:all": "rm -rf .nuxt node_modules/.vite node_modules/.cache .output dist node_modules package-lock.json",
    "reinstall": "npm run clean:all && npm install",
    "reset": "npm run clean && npm run dev"
  }
}
```

## Recomendaciones

### Opción 1: Actualizar Node.js (RECOMENDADO)

```bash
# Con nvm
nvm install 20.19.0
nvm use 20.19.0

# Con Homebrew (macOS)
brew upgrade node@20

# Luego reinstalar
npm run reinstall
```

### Opción 2: Degradar Nuxt a versión compatible

```bash
npm install nuxt@3.13.0
npm run reinstall
```

### Opción 3: Usar solo Tailwind + DaisyUI (APLICADO)

Esta es la configuración actual. Para volver a agregar PrimeVue:

1. Actualiza Node.js primero
2. Restaura el plugin: `mv app/plugins/primevue.client.ts.bak app/plugins/primevue.client.ts`
3. Actualiza nuxt.config.ts con la configuración de PrimeVue

## Estado Actual

✅ **Tailwind CSS**: Funcionando correctamente  
✅ **DaisyUI**: Funcionando correctamente  
❌ **PrimeVue**: Deshabilitado temporalmente (causa el error IPC)  
✅ **Scripts de limpieza**: Agregados  
✅ **Estructura**: Corregida con pages/index.vue  

## Comandos para Desarrollo

```bash
# Iniciar servidor
npm run dev

# Limpiar y reiniciar
npm run reset

# Limpiar completamente y reinstalar
npm run reinstall
```

## Solución del Error IPC - Pasos Ejecutados

1. ✅ Detener todos los procesos de Nuxt
2. ✅ Limpiar cachés (.nuxt, .vite, .cache, .output)
3. ✅ Simplificar nuxt.config.ts (eliminar PrimeVue temporalmente)
4. ✅ Deshabilitar plugin de PrimeVue
5. ✅ Crear estructura correcta con pages/
6. ✅ Reinstalar dependencias

## Próximos Pasos

1. **CRÍTICO**: Actualizar Node.js a v20.19.0 o superior
2. Probar con PrimeVue después de actualizar Node.js
3. Si persiste el problema, considerar usar Nuxt 3.x en lugar de Nuxt 4.x

## Archivos Modificados

- ✅ `nuxt.config.ts` - Simplificado sin PrimeVue
- ✅ `tailwind.config.js` - Optimizado
- ✅ `package.json` - Scripts de limpieza agregados
- ✅ `app/app.vue` - Usa NuxtPage
- ✅ `app/pages/index.vue` - Página principal creada
- ✅ `app/plugins/primevue.client.ts` - Renombrado a .bak

## Notas Adicionales

- El error IPC es causado por un crash en el proceso de renderizado de Vite
- Node.js v20.18.0 está causando problemas con Nuxt 4.4.2
- PrimeVue client plugin está ejecutando código que falla en el renderizado

## Contacto y Soporte

Si necesitas volver a habilitar PrimeVue, primero **actualiza Node.js** y luego:

```bash
# Restaurar plugin
mv app/plugins/primevue.client.ts.bak app/plugins/primevue.client.ts

# Actualizar nuxt.config.ts
# Agregar '@primevue/nuxt-module' a modules
# Agregar configuración de primevue

# Limpiar y reiniciar
npm run reset
```
