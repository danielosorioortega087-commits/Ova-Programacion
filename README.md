# OVA: Astromat: números a bordo

Objeto virtual de aprendizaje desarrollado con Vue 3 y Nuxt 3. Incluye una pantalla de bienvenida, una galaxia interactiva con cinco planetas y contenidos introductorios de matemáticas.

## Requisitos
- Node.js (versión LTS recomendada)
- npm

## Cómo ejecutarlo
1. Descomprime el ZIP.
2. Abre la carpeta `ova-mision-matematica` en Visual Studio Code (la que contiene `package.json`).
3. Abre una terminal en esa carpeta y ejecuta:

   ```bash
   npm install
   npm run dev
   ```

4. Abre la dirección que indique la terminal (normalmente `http://localhost:3000`).

## Incluye
- Pantalla de bienvenida con el título «Astromat: números a bordo».
- Fondo espacial en SVG con estrellas, nebulosas y planetas animados.
- Una sola música instrumental de fondo que continúa al cambiar de pantalla y al explorar los planetas.
- Botón para activar o desactivar la música.
- Efectos separados para el despegue, la selección de cada planeta y el regreso a la galaxia.
- Cinco planetas con contenidos introductorios de suma y resta, multiplicación, división, problemas y patrones.
- Navegación para volver a la galaxia o a la pantalla de inicio.
- Diseño adaptable a computador, tableta y celular.

La música se inicia después de la primera interacción del usuario, porque los navegadores restringen la reproducción automática.
