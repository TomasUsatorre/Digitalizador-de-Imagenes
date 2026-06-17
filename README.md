# Digitalizador de Imágenes

**Trabajo Práctico Integrador — Comunicación de Datos**  
**UTN FRLP — Grupo 01 — S32 — 2026**

Integrantes: Traversa Facundo · Usatorre Tomás · Santillán Lucas · Nosetti María Constanza

---

## Descripción

Aplicación web desarrollada con **React + Vite y JS** que permite cargar imágenes y digitalizarlas mediante:

- Muestreo espacial a distintas resoluciones (100×100 hasta 1000×1000)
- Reducción de profundidad de bits por canal (1 a 24 bits)
- Aplicación de compresión JPEG configurable
- Comparación visual entre imagen original y transformada
- Descarga de la imagen procesada

---

## Estructura del proyecto

```
Proyecto/
├── Entrega 1/        → Documento de diseño y planificación (.docx)
├── Entrega 2/        → Código fuente de la aplicación
│   ├── src/
│   │   ├── App.jsx           # Componente principal React
│   │   ├── main.jsx          # Punto de entrada
│   │   └── imageProcessor.js # Lógica de muestreo y cuantización
│   ├── index.html
│   ├── style.css
│   ├── logo.png
│   ├── vite.config.js
│   └── package.json
└── Entrega 3/        → Presentación final y ejecutable
```

---

## Cómo ejecutar

1. Ingresar a la carpeta `Entrega 2`:

   ```bash
   cd "Entrega 2"
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir en el navegador:

   ```
   http://localhost:5173
   ```

---

## Tecnologías utilizadas

- **React** — manejo de estado y componentes
- **Vite** — entorno de desarrollo
- **Canvas API** — procesamiento de imágenes en el navegador
- **JavaScript (ES6+)** — lógica de muestreo y cuantización
- **HTML + CSS** — estructura y estilos
