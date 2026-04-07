# Base Nuxt 4 — Manual de instalación y arquitectura

> Plantilla base para aplicaciones SPA internas con **Nuxt 4**, **PrimeVue 4**, **Tailwind CSS 3**, **DaisyUI 5** y autenticación **OIDC**. Modo completamente SPA (sin SSR).

---

## Índice

1. [Creación del proyecto](#1-creación-del-proyecto)
2. [Integración de Pinia](#2-integración-de-pinia)
3. [Configuración de PrimeVue](#3-configuración-de-primevue)
4. [Integración de Tailwind CSS](#4-integración-de-tailwind-css)
5. [Configuración de DaisyUI](#5-configuración-de-daisyui)
6. [Configuración de Docxtemplater](#6-configuración-de-docxtemplater)
7. [Arquitectura del proyecto](#7-arquitectura-del-proyecto)
8. [Convenciones y patrones de desarrollo](#8-convenciones-y-patrones-de-desarrollo)
9. [Sistema de autenticación OIDC](#9-sistema-de-autenticación-oidc)
10. [Sistema de roles y acceso](#10-sistema-de-roles-y-acceso)
11. [Configuración por entornos](#11-configuración-por-entornos)
12. [Modo mock](#12-modo-mock)
13. [Scripts disponibles](#13-scripts-disponibles)
14. [Cómo añadir un nuevo módulo](#14-cómo-añadir-un-nuevo-módulo)

---

## 1. Creación del proyecto

```bash
npx nuxi@latest init <project-name>
```

Verifica la instalación ejecutando. Debe arrancar en `http://localhost:3000/`:

```bash
npm run dev
```

**Importante — Nuxt 4 (compatibilityVersion: 4):**  
En esta plantilla se usa `future: { compatibilityVersion: 4 }` en `nuxt.config.ts`. Esto activa la nueva estructura de directorios de Nuxt 4 donde **todo el código de la aplicación vive dentro de la carpeta `app/`** en lugar de estar en la raíz del proyecto.

```
raíz/
├── app/               ← todo el código de la app vive aquí
│   ├── app.vue
│   ├── pages/
│   ├── layouts/
│   ├── components/
│   ├── stores/
│   ├── plugins/
│   ├── composables/
│   ├── utils/
│   ├── assets/
│   ├── mock/
│   ├── services/
│   ├── config/
│   └── types/
├── nuxt.config.ts     ← fuera de app/
├── tailwind.config.js ← fuera de app/
└── package.json       ← fuera de app/
```

Configura `app.vue` para trabajar con layouts:

```html
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

---

## 2. Integración de Pinia

Requiere Node 18 o superior (`node -v` para verificar).

```bash
npm install pinia
npx nuxi@latest module add pinia
```

Si hay conflictos de dependencias:

```bash
npm install pinia @pinia/nuxt --legacy-peer-deps
```

Actualiza `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
});
```

En esta plantilla los stores se ubican en `app/stores/` y Nuxt los auto-importa. Los stores disponibles son:

- **`useAuthStore`** — gestión del token JWT, usuario autenticado, roles y errores HTTP
- **`useColorStore`** — gestión del tema visual (colores, modo oscuro, configuración de pantalla)

---

## 3. Configuración de PrimeVue

Documentación oficial: https://primevue.org/nuxt/

```bash
npm install primevue
npm install --save-dev @primevue/nuxt-module
npm install @primeuix/themes
```

En esta plantilla se usa PrimeVue **con tema Aura** y con `cssLayer: false` para evitar conflictos con Tailwind:

```typescript
import Aura from '@primeuix/themes/aura'

primevue: {
  components: {
    include: [
      'Button', 'DataTable', 'Column', 'DatePicker',
      'InputText', 'InputNumber', 'InputGroup', 'InputGroupAddon',
      'Select', 'Paginator', 'Toast', 'ConfirmDialog', 'ProgressSpinner',
    ],
  },
  options: {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
        cssLayer: false,
      },
    },
  },
},
```

> Solo se registran los componentes que se usan (`components.include`) para minimizar el bundle final.

El locale de PrimeVue se configura en español desde `app/layouts/default.vue` usando `usePrimeVue()`.

---

## 4. Integración de Tailwind CSS

Documentación: https://tailwind.primevue.org/nuxt/

```bash
npm install -D tailwindcss postcss autoprefixer
npx nuxi@latest module add tailwindcss
npm install tailwindcss-primeui
npm install -D postcss-import
```

Archivo `tailwind.config.js` en la raíz del proyecto:

```javascript
/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // colores personalizados de la aplicación
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light'],
  },
};
```

> **Nota Nuxt 4:** los paths de `content` deben apuntar a `./app/...` en lugar de `./...` porque el código vive dentro de `app/`.

Archivo `app/assets/css/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Configuración de PostCSS en `nuxt.config.ts`:

```typescript
postcss: {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
},
css: [
  'primeicons/primeicons.css',
  '~/assets/css/main.css',
  '~/assets/css/base.css',
],
```

---

## 5. Configuración de DaisyUI

Documentación: https://daisyui.com/docs/install/

```bash
npm i -D daisyui@latest
```

Esta plantilla usa **DaisyUI v5**. Hay cambios importantes respecto a v4:

| v4 | v5 |
|---|---|
| `toggle-success` | `text-success` (usa `currentColor`) |
| `toggle-primary` | `text-primary` |
| `toggle-error` | `text-error` |

En v5, el color del toggle se controla con clases `text-*` de Tailwind porque el CSS del componente usa `currentColor` internamente. Ejemplo de uso correcto:

```html
<input type="checkbox" class="toggle text-success" />
```

---

## 6. Configuración de Docxtemplater

Documentación: https://docxtemplater.com/

```bash
npm install --save docxtemplater pizzip
```

Instala Docxtemplater y PizZip. Los archivos DOCX son ZIP comprimidos y PizZip los carga en memoria para que Docxtemplater los procese.

Las plantillas `.docx` se almacenan en `public/` y usan etiquetas `{variable}` para los campos dinámicos. La lógica de exportación está en `app/composables/exportFile.ts`.

---

## 7. Arquitectura del proyecto

### Estructura completa de `app/`

```
app/
├── app.vue                    ← entrada principal (NuxtLayout + NuxtPage)
├── assets/
│   └── css/
│       ├── main.css           ← directivas Tailwind
│       ├── base.css           ← variables CSS (colores PrimeVue, modo oscuro)
│       └── primevue/          ← CSS por componente PrimeVue (generados)
├── components/
│   ├── common/                ← componentes globales reutilizables
│   │   ├── NavBar.vue
│   │   ├── MenuNavigation.vue
│   │   ├── BreadCrumbs.vue
│   │   ├── FloatingButton.vue
│   │   ├── SettingsPanel.vue
│   │   ├── SessionTimer.vue
│   │   ├── loading.vue
│   │   └── box.vue
│   ├── tecnicos/              ← módulo Técnicos (ejemplo de módulo completo)
│   │   ├── views/index.vue    ← listado principal
│   │   ├── common/popupTecnicos.vue
│   │   ├── components/tecnicoDatos.vue
│   │   ├── interfaces/        ← tipos TypeScript del módulo
│   │   └── composables/
│   └── viajes/                ← módulo Viajes
│       ├── views/index.vue
│       ├── common/popupViajes.vue
│       ├── components/
│       │   ├── viajeDatos.vue
│       │   └── viajeNuevo.vue
│       └── interfaces/
├── composables/
│   ├── validarAccess.ts       ← lógica de control de acceso por roles
│   └── exportFile.ts          ← exportación a Word/Excel
├── config/
│   ├── config.json            ← configuración multi-entorno + flags (useMock)
│   └── menu.json              ← definición del menú y roles por ruta
├── layouts/
│   ├── default.vue            ← layout autenticado (navbar + menú + contenido)
│   ├── session.vue            ← layout para páginas de sesión (login, callback)
│   └── blank.vue              ← layout vacío
├── mock/                      ← datos de prueba JSON
│   ├── auth.mock.json
│   ├── getAllTecnicos.mock.json
│   ├── getIdTecnico.mock.json
│   ├── getAllViajes.mock.json
│   └── getIdViaje.mock.json
├── pages/
│   ├── home/index.vue
│   ├── dashboard/index.vue
│   ├── tecnicos/index.vue
│   ├── viajes/index.vue
│   ├── auth/
│   │   ├── login-base.vue
│   │   ├── login-federado.vue
│   │   └── callback.vue
│   └── errors/
│       ├── 401.vue, 402.vue, 403.vue, 404.vue, 500.vue
├── plugins/
│   ├── axios.client.ts        ← instancias Axios con interceptores JWT
│   ├── oidc.client.ts         ← cliente OIDC (oidc-client-ts)
│   ├── device.client.ts       ← detección de dispositivo
│   ├── primevue.client.ts     ← configuración adicional PrimeVue
│   └── detectTheme.client.ts  ← detección del tema del sistema
├── services/
│   ├── tecnicos.service.ts    ← servicio API técnicos
│   ├── viajes.service.ts      ← servicio API viajes
│   └── user.service.ts        ← servicio usuario/autenticación
├── stores/
│   ├── useAuthStore.ts        ← store autenticación (Pinia)
│   └── useColorStore.ts       ← store tema visual (Pinia)
├── types/
│   ├── endpoint.enum.ts       ← endpoints de la API agrupados por módulo
│   ├── responseApi.interface.ts
│   ├── transaction.interface.ts
│   ├── valores.interface.ts
│   └── ...
└── utils/
    ├── utils.ts               ← utilidades globales (fechas, moneda, errores)
    └── logger.ts              ← logger centralizado
```

### Layouts

| Layout | Uso |
|---|---|
| `default.vue` | Páginas autenticadas. Incluye NavBar, MenuNavigation, SettingsPanel y SessionTimer |
| `session.vue` | Login y callback OIDC. Sin navegación |
| `blank.vue` | Páginas de error u otras sin UI de aplicación |

Para asignar un layout desde una página:

```vue
<script setup>
definePageMeta({ layout: 'session' })
</script>
```

---

## 8. Convenciones y patrones de desarrollo

### Estructura de un módulo

Cada módulo funcional sigue esta estructura dentro de `app/components/<modulo>/`:

```
<modulo>/
├── views/
│   └── index.vue          ← listado principal con DataTable
├── common/
│   └── popup<Modulo>.vue  ← popup (dialog) que envuelve los formularios
├── components/
│   ├── <modulo>Datos.vue  ← formulario de ver/editar un registro existente
│   └── <modulo>Nuevo.vue  ← formulario de creación (si aplica)
└── interfaces/
    ├── index.ts                        ← re-exporta todo
    ├── <modulo>.interface.ts           ← entidad completa
    ├── listado<Modulo>.interface.ts    ← interface para el grid
    ├── listado<Modulo>Filter.interface.ts ← filtros de búsqueda
    ├── save<Modulo>.interface.ts       ← payload de guardado
    └── screen<Modulo>.enum.ts          ← enum de pantallas del popup
```

### Flujo de un popup

1. El `views/index.vue` gestiona el estado del modal (`modalOpen`, `typeScreen`, `idRegistro`, `isEdit`).
2. Al hacer clic en "Ver" o "Editar" se llama a `openPopupEdit(registro, isEdit)`.
3. Para "Nuevo" se llama a `openPopupNew()`.
4. El `popup<Modulo>.vue` recibe estas props y renderiza el formulario correspondiente.
5. El botón "Guardar" del footer del popup activa un `ref` booleano (`saveXxx = true`).
6. El formulario lo observa con `watch(() => props.save, ...)` y ejecuta la confirmación.
7. Tras guardar, emite `closeReload` que cierra el popup y recarga el grid.

```
views/index.vue
  └── popup<Modulo>.vue  (dialog nativo de DaisyUI)
        ├── <modulo>Datos.vue  (ver/editar)
        └── <modulo>Nuevo.vue  (crear)
```

### Patrón de servicio

Cada servicio es una función async que devuelve los métodos disponibles:

```typescript
export const MiServicio = async () => {
  const config = await import('@/config/config.json');
  const { $axiosApp } = useNuxtApp();

  const GetAll = async (filter): Promise<ResponseApi<MiEntidad[]>> => {
    if (config.configuration.useMock)
      return await __getMockAll();
    const response = await $axiosApp.get(EndPoint.MiModulo.ListarGrid, { params: filter });
    return response.data;
  };

  // mock privado
  const __getMockAll = async () => {
    const mock = await import('@/mock/getAll<Modulo>.mock.json');
    return mock;
  };

  return { GetAll, ... };
};
```

### Clases CSS principales

| Clase | Descripción |
|---|---|
| `input-group` | Contenedor flex para label + input combinados |
| `input-group-text` | Etiqueta izquierda del input (fondo gris, borde) |
| `width-filter` | Ancho fijo de 150px para las etiquetas |
| `control` | Aplica `border-radius` correcto al input derecho del grupo |
| `controlCheck` | `flex-grow: 1` para checkboxes dentro de `input-group` |

### Modo oscuro

Se gestiona mediante la clase `.dark` en `<html>`. El store `useColorStore` controla el estado y el layout `default.vue` aplica/quita la clase. PrimeVue usa `darkModeSelector: '.dark'` para sus componentes.

---

## 9. Sistema de autenticación OIDC

El plugin `app/plugins/oidc.client.ts` inicializa `oidc-client-ts` con la configuración del entorno activo. Provee `$oidcClient` a toda la aplicación.

El plugin `app/plugins/axios.client.ts` crea dos instancias de Axios:

| Instancia | Uso | Disponible como |
|---|---|---|
| `axiosUser` | Llamadas al servicio de usuarios/seguridad | `$axiosUser` |
| `axiosApp` | Llamadas a la API de negocio | `$axiosApp` |

Ambas instancias tienen interceptores que:
- Adjuntan el `Bearer token` en cada petición
- Renuevan el token silenciosamente si queda menos de 15 minutos de vida
- Manejan errores HTTP centralizadamente y los almacenan en `useAuthStore`

El token se persiste en `localStorage` mediante `@vueuse/core useLocalStorage`.

---

## 10. Sistema de roles y acceso

El composable `app/composables/validarAccess.ts` exporta `useAccesoPantalla(rolesPermitidos)`.

### Niveles de acceso

| Valor | Descripción |
|---|---|
| `FULL` | Puede ver y editar. Botones de edición visibles |
| `READ` | Solo lectura. Formularios en modo `disabled` |
| `NONE` | Sin acceso a la pantalla |

### Rol especial

- `DEVELOPER` — siempre retorna `FULL` independientemente de los roles de la ruta.
- `Direccion` / `JefeArea` — activan el flag `responsable = true`, que en el módulo Técnicos muestra columnas adicionales.

### Uso en una page

```typescript
// pages/tecnicos/index.vue
const rolesPermitidos = computed(() =>
  menu.menu.find((item) => item.to === route.path)?.role ?? []
);
const { acceso, responsable } = computed(() => useAccesoPantalla(rolesPermitidos.value)).value;
```

### Definición de roles en el menú

Los roles permitidos por ruta se definen en `app/config/menu.json`:

```json
{
  "id": 4,
  "label": "Técnicos",
  "icon": "user",
  "to": "/tecnicos",
  "role": ["Direccion", "GuardiasTecnicos", "DEVELOPER"]
}
```

---

## 11. Configuración por entornos

El archivo `app/config/config.json` contiene configuración para cuatro entornos:

| Clave | Entorno |
|---|---|
| `staging` | Por defecto al ejecutar `npm run dev` |
| `development` | Desarrollo con build versionado |
| `preproduction` | Pre-producción |
| `production` | Producción |

El entorno activo se selecciona con la variable de entorno `NUXT_ENV_STAGE`. Se lee en `nuxt.config.ts` y se expone en `runtimeConfig.public.appConfig`.

Campos del objeto de entorno:

```json
{
  "urlService": "https://api.servidor.com/app/api",
  "usuarios": {
    "url": "https://api.servidor.com/segurity/api/v1",
    "appName": "NombreApp"
  },
  "isActiveConsole": true,
  "urlCRM": "https://crm.servidor.com/main.aspx",
  "autentification": {
    "authority": "https://adfs.servidor.com/adfs",
    "clientId": "aplicaciones",
    "responseType": "code",
    "scope": "openid profile appDeseada"
  }
}
```

Flags globales en `configuration`:

```json
{
  "configuration": {
    "useMock": true,        ← activa datos de prueba en lugar de API real
    "useMockUser": true,    ← activa usuario de prueba en lugar de OIDC
    "toolsView": true,      ← muestra el botón flotante de configuración
    "viewLogin": false      ← muestra/oculta la pantalla de login
  }
}
```

---

## 12. Modo mock

Cuando `useMock: true` en `config.json`, los servicios cargan datos desde archivos JSON en `app/mock/` en lugar de llamar a la API.

### Convención de nombres

| Archivo | Descripción |
|---|---|
| `getAll<Modulo>.mock.json` | Listado paginado (`totalRows` + `data[]`) |
| `getId<Modulo>.mock.json` | Registro individual (`data: {}`) |
| `auth.mock.json` | Usuario autenticado de prueba + configuración visual |

### Estructura de respuesta estándar

```json
{
  "idResponse": 200,
  "message": "OK",
  "totalRows": 10,
  "data": [ ... ]
}
```

Para un registro individual, `data` es un objeto en lugar de array.

---

## 13. Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Desarrollo local (entorno `staging`) |
| `npm run stg` | Desarrollo local forzando entorno `staging` |
| `npm run pre` | Desarrollo local forzando entorno `preproduction` |
| `npm run build` | Build genérico |
| `npm run generate` | Genera SPA estática |
| `npm run build:dev` | Build con bump de versión para `development` |
| `npm run build:pre` | Build con bump de versión para `preproduction` |
| `npm run build:pro` | Build con bump de versión para `production` |
| `npm run generate:dev` | Genera SPA estática para `development` |
| `npm run generate:pro` | Genera SPA estática para `production` |
| `npm run preview` | Previsualiza el último build |

Los scripts `*--no-version` realizan el mismo proceso pero sin incrementar la versión en `package.json`.

---

## 14. Cómo añadir un nuevo módulo

Pasos para añadir un módulo completo (ejemplo: `facturas`):

**1. Interfaces** — crear `app/components/facturas/interfaces/`

```
factura.interface.ts
listadoFacturas.interface.ts
listadoFacturasFilter.interface.ts
saveFactura.interface.ts
screenFacturas.enum.ts
index.ts                 ← re-exporta todo con `export * from './...'`
```

**2. Mocks** — crear en `app/mock/`

```
getAllFacturas.mock.json
getIdFactura.mock.json
```

**3. Endpoint** — añadir en `app/types/endpoint.enum.ts`

```typescript
export enum Facturas {
  ListarFacturasGrid = '/facturas',
  SaveFactura        = '/facturas',
  FacturaById        = '/facturas/',
  DeleteFactura      = '/facturas/',
}
```

**4. Servicio** — crear `app/services/facturas.service.ts`

Seguir el patrón de `tecnicos.service.ts`: función async, métodos get/save/delete, soporte mock interno.

**5. Componentes** — crear `app/components/facturas/`

```
views/index.vue           ← DataTable + filtros + paginador
common/popupFacturas.vue  ← dialog con header/content/footer
components/facturaDatos.vue
components/facturaNueva.vue
```

**6. Page** — crear `app/pages/facturas/index.vue`

```vue
<template>
  <div class="dark:text-dark-textSecondary">
    <BreadCrumbs />
    <Facturas :acceso="acceso" />
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue';
import Facturas from '@/components/facturas/views/index.vue';
import menu from '~/config/menu.json';

const route = useRoute();
const rolesPermitidos = computed(() =>
  menu.menu.find((item) => item.to === route.path)?.role ?? []
);
const { acceso } = computed(() => useAccesoPantalla(rolesPermitidos.value)).value;
</script>
```

**7. Menú** — añadir entrada en `app/config/menu.json`

```json
{
  "id": 12,
  "label": "Facturas",
  "icon": "file-lines",
  "to": "/facturas",
  "role": ["Direccion", "DEVELOPER"]
}
```

---

## Dependencias principales

| Paquete | Versión | Uso |
|---|---|---|
| `nuxt` | ^4.x | Framework principal |
| `vue` | ^3.5 | Framework UI |
| `primevue` | ^4.5 | Componentes UI (DataTable, DatePicker, Select…) |
| `@primeuix/themes` | ^2.x | Tema Aura para PrimeVue |
| `tailwindcss` | ^3.4 | Utilidades CSS |
| `daisyui` | ^5.x | Componentes Tailwind (toggle, modal, badge…) |
| `pinia` | ^3.x | Estado global |
| `axios` | ^1.x | Cliente HTTP |
| `oidc-client-ts` | ^3.x | Autenticación OIDC/OAuth2 |
| `@vueuse/core` | ^14.x | Utilidades Vue (useLocalStorage…) |
| `docxtemplater` + `pizzip` | - | Exportación a Word |
| `chart.js` | ^4.x | Gráficas |
| `@vesp/nuxt-fontawesome` | ^2.x | Iconos Font Awesome |
