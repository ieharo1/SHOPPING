# 🛒 Shopping - Ecommerce Professional

Aplicación de ecommerce profesional desarrollada en Angular 19, lista para producción y despliegue en GitHub Pages.

---

## 📋 Requisitos

- Node.js 18+ 
- npm 9+

---

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start
# o con puerto específico
npm start -- --port 4201
```

Accede a: **http://localhost:4200** (o http://localhost:4201 si especificas el puerto)

### Producción

```bash
npm run build
```

---

## 📦 Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run deploy` | Despliega a GitHub Pages |

---

## 🔧 Configuración para GitHub Pages

### Paso 1: Configurar angular.json

El proyecto ya está configurado con `--base-href=/PUCELANT-WEB-2/`. Si tu repositorio tiene otro nombre, edita `angular.json`:

```json
"base-href": "/TU-REPO-NAME/"
```

### Paso 2: Hacer push a GitHub

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### Paso 3: Desplegar

```bash
npm run deploy
```

---

## 📱 Funcionalidades

### Home
- ✅ Navbar profesional con búsqueda
- ✅ Hero section con CTA
- ✅ Grid de categorías
- ✅ Sistema de filtrado por categoría
- ✅ Ordenamiento por precio
- ✅ Productos destacados
- ✅ Footer corporativo

### Detalle de producto
- ✅ Galería de imágenes
- ✅ Información de precio y descuentos
- ✅ Selector de cantidad
- ✅ Agregar al carrito
- ✅ Información de envío y garantía
- ✅ Productos relacionados

### Carrito
- ✅ Persistencia en localStorage
- ✅ Actualizar cantidades
- ✅ Eliminar productos
- ✅ Cálculo de subtotal

---

## 🛠️ Tecnologías

- Angular 19 (Standalone)
- TypeScript
- CSS Variables
- Signals
- Lazy Loading
- View Transitions

---

## 📁 Estructura

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   ├── footer/
│   │   └── product-card/
│   ├── pages/
│   │   ├── home/
│   │   ├── product-detail/
│   │   └── cart/
│   ├── services/
│   │   └── product.service.ts
│   ├── models/
│   │   └── product.model.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── assets/
│   └── data/
│       └── products.json
├── styles.css
└── index.html
```

---

## 📝 Notas

- El proyecto usa datos mock en `src/assets/data/products.json`
- La base de datos simula 12 productos y 6 categorías
- El diseño es 100% responsive (mobile-first)

---

## 👨‍💻 Desarrollado por Isaac Esteban Haro Torres

**Ingeniero en Sistemas · Full Stack · Automatización · Data**

- 📧 Email: zackharo1@gmail.com
- 📱 WhatsApp: 098805517
- 💻 GitHub: https://github.com/ieharo1
- 🌐 Portafolio: https://ieharo1.github.io/portafolio-isaac.haro/

---

© 2026 Isaac Esteban Haro Torres - Todos los derechos reservados.
