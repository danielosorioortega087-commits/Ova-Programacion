<template>
  <main class="galaxy-screen" aria-label="Selección de contenidos">
    <div class="galaxy-backdrop" aria-hidden="true">
      <span v-for="star in 52" :key="star" class="star" :style="starStyle(star)">{{ star % 7 === 0 ? '✦' : '·' }}</span>
      <div class="nebula nebula-a"></div>
      <div class="nebula nebula-b"></div>
      <div class="nebula nebula-c"></div>
    </div>

    <header class="galaxy-header">
      <button class="home-button" type="button" @click="regresarInicio" aria-label="Volver a la pantalla de entrada">
        <span aria-hidden="true">←</span> Inicio
      </button>
      <div class="header-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span> CENTRO DE EXPLORACIÓN</p>
        <h1>Elige tu planeta</h1>
        <p class="subtitle">Cada mundo guarda un espacio para un nuevo contenido.</p>
      </div>
      <div class="header-orbit" aria-hidden="true">✦</div>
    </header>

    <Transition name="topic-panel" mode="out-in">
      <section v-if="!contenidoSeleccionado" key="galaxy" class="galaxy-map" aria-label="Planetas con contenidos disponibles">
        <div class="orbit orbit-one" aria-hidden="true"></div>
        <div class="orbit orbit-two" aria-hidden="true"></div>
        <div class="orbit orbit-three" aria-hidden="true"></div>
        <div class="orbit orbit-four" aria-hidden="true"></div>
        <div class="sun-core" aria-hidden="true"><span>✦</span></div>
        <div class="sun-glow" aria-hidden="true"></div>

        <button
          v-for="(contenido, index) in contenidos"
          :key="contenido.id"
          class="planet-entry"
          :class="[`planet-position-${index + 1}`, `planet-color-${index + 1}`]"
          type="button"
          :aria-label="`Abrir ${contenido.titulo}`"
          @click="abrirContenido(contenido)"
        >
          <span class="planet-system" aria-hidden="true">
            <span class="planet-halo"></span>
            <span class="planet-ball"><span class="planet-mark">{{ contenido.icono }}</span></span>
            <span v-if="index === 2" class="planet-ring"></span>
            <span v-if="index === 4" class="planet-moon"></span>
          </span>
          <span class="planet-label">
            <strong>{{ contenido.titulo }}</strong>
            <small>{{ contenido.subtitulo }}</small>
          </span>
        </button>

        <div class="floating-astronaut" aria-hidden="true">🧑‍🚀</div>
        <div class="floating-satellite" aria-hidden="true">🛰️</div>
      </section>

      <section v-else key="placeholder" class="content-placeholder" aria-live="polite">
        <div class="placeholder-stars" aria-hidden="true">✦　·　✧　·　✦</div>
        <div class="placeholder-planet" :class="`placeholder-color-${contenidoSeleccionado.id}`" aria-hidden="true">
          <span>{{ contenidoSeleccionado.icono }}</span><i></i>
        </div>
        <p class="eyebrow"><span class="eyebrow-dot"></span> EXPLORANDO ESTE PLANETA</p>
        <h2>{{ contenidoSeleccionado.titulo }}</h2>
        <div class="learning-card">
          <span class="learning-symbol" aria-hidden="true">{{ contenidoSeleccionado.icono }}</span>
          <p class="learning-intro">{{ contenidoSeleccionado.descripcion }}</p>
          <div class="learning-tags">
            <span v-for="item in contenidoSeleccionado.claves" :key="item">✦ {{ item }}</span>
          </div>
        </div>
        <div class="placeholder-actions">
          <button type="button" class="back-galaxy" @click="volverPlanetas">← Volver a los planetas</button>
          <button type="button" class="another-topic" @click="volverPlanetas">Elegir otro planeta <span aria-hidden="true">✦</span></button>
        </div>
      </section>
    </Transition>

    <footer class="galaxy-footer">
      <span class="footer-star" aria-hidden="true">✦</span>
      <span>{{ contenidoSeleccionado ? 'Tu próxima aventura te espera en la galaxia.' : 'Pulsa un planeta para explorar su espacio de contenido.' }}</span>
      <span class="footer-star" aria-hidden="true">✦</span>
    </footer>
  </main>
</template>

<script setup>
import { ref, inject } from 'vue'

const emit = defineEmits(['volverInicio'])
const contenidoSeleccionado = ref(null)
const audio = inject('audio', null)

// Son espacios de ejemplo: aquí no se incluyen lecciones ni actividades reales.
const contenidos = [
  { id: 'sumas-restas', titulo: 'Contenido de suma y resta', subtitulo: 'Planeta numérico', icono: '＋', descripcion: 'Descubre cómo reunir cantidades, quitar elementos y resolver operaciones paso a paso en situaciones de la vida cotidiana.', claves: ['Adición', 'Sustracción', 'Cálculo mental'] },
  { id: 'multiplicacion', titulo: 'Contenido de multiplicación', subtitulo: 'Mundo de los grupos', icono: '×', descripcion: 'Aprende a sumar cantidades iguales de forma rápida y a reconocer la multiplicación en grupos, arreglos y situaciones cotidianas.', claves: ['Sumas repetidas', 'Tablas', 'Productos'] },
  { id: 'division', titulo: 'Contenido de división', subtitulo: 'Anillos de reparto', icono: '÷', descripcion: 'Explora cómo repartir una cantidad en partes iguales, formar grupos y comprender la relación entre dividir y multiplicar.', claves: ['Repartos iguales', 'Cociente', 'Residuo'] },
  { id: 'problemas', titulo: 'Contenido de problemas', subtitulo: 'Nebulosa de retos', icono: '?', descripcion: 'Pon a prueba tu razonamiento: interpreta información, identifica qué operación necesitas y encuentra soluciones a diferentes desafíos.', claves: ['Comprensión', 'Razonamiento', 'Solución'] },
  { id: 'patrones', titulo: 'Contenido de patrones', subtitulo: 'Sistema de secuencias', icono: '✧', descripcion: 'Observa regularidades, descubre qué cambia y qué se repite, y completa secuencias numéricas y visuales siguiendo una regla.', claves: ['Secuencias', 'Regularidades', 'Reglas'] }
]

function abrirContenido(contenido) {
  audio?.playUiSound(`planet-${contenido.id}`)
  contenidoSeleccionado.value = contenido
}

function volverPlanetas() {
  audio?.playUiSound('back')
  contenidoSeleccionado.value = null
}

function regresarInicio() {
  emit('volverInicio')
}

function starStyle(index) {
  const x = ((index * 37) % 97) + 1
  const y = ((index * 53) % 93) + 2
  const delay = (index % 11) * -0.31
  const size = index % 9 === 0 ? '1.15rem' : index % 4 === 0 ? '.85rem' : '.65rem'
  return { left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s`, fontSize: size }
}
</script>

<style scoped>
.galaxy-screen { position: relative; display: flex; min-height: 100svh; flex-direction: column; overflow: hidden; isolation: isolate; padding: clamp(18px, 3vw, 34px) clamp(16px, 4vw, 54px) 22px; color: #f8f8ff; background: radial-gradient(ellipse at 50% 44%, #1b245a 0%, #101536 49%, #070b22 100%); }
.galaxy-backdrop { position: absolute; z-index: -2; inset: 0; overflow: hidden; background: radial-gradient(ellipse at 50% 48%, #29377855, transparent 55%), linear-gradient(140deg, #151b47, #080d26 65%); }
.galaxy-backdrop::after { position: absolute; inset: 0; content: ''; background: radial-gradient(ellipse at center, transparent 30%, #02051690 100%); }
.star { position: absolute; color: #e2e9ff; opacity: .52; text-shadow: 0 0 12px #9ab7ff; animation: star-glimmer 2.8s ease-in-out infinite alternate; }
.nebula { position: absolute; width: 38vw; aspect-ratio: 1; border-radius: 50%; filter: blur(65px); opacity: .2; pointer-events: none; }
.nebula-a { top: 12%; left: 4%; background: #6753ff; }.nebula-b { right: 2%; bottom: 1%; background: #00c5ee; }.nebula-c { top: 38%; left: 39%; background: #974cff; opacity: .12; }
.galaxy-header { position: relative; display: grid; grid-template-columns: minmax(105px, 1fr) minmax(0, 3fr) minmax(105px, 1fr); align-items: start; width: min(100%, 1320px); margin: 0 auto; }
.home-button { justify-self: start; display: inline-flex; align-items: center; gap: 9px; padding: 10px 15px; border: 1px solid #d8e4ff2b; border-radius: 14px; background: #ffffff0b; color: #e2e8ff; font-weight: 800; cursor: pointer; transition: transform .25s ease, background .25s ease, border-color .25s ease; }
.home-button span { font-size: 1.3rem; line-height: .8; }.home-button:hover { transform: translateX(-3px); border-color: #9bb6ff8c; background: #ffffff17; }
.header-copy { text-align: center; }.eyebrow { display: flex; align-items: center; justify-content: center; gap: 9px; margin: 0 0 12px; color: #a6b7ff; font-size: .72rem; font-weight: 900; letter-spacing: .2em; }
.eyebrow-dot { width: 7px; height: 7px; flex: 0 0 7px; border-radius: 50%; background: #77f2f2; box-shadow: 0 0 12px #6af3ff; }
.header-copy h1 { margin: 0; font-family: 'Orbitron', 'Nunito', sans-serif; font-size: clamp(1.6rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -.035em; text-shadow: 0 0 28px #728bff48; }
.subtitle { margin: 12px 0 0; color: #b9c4ea; font-size: clamp(.86rem, 1.5vw, 1rem); }.header-orbit { justify-self: end; display: grid; width: 42px; aspect-ratio: 1; place-items: center; border: 1px solid #9bafff35; border-radius: 50%; color: #d5ddff; font-size: 1.35rem; box-shadow: 0 0 25px #7d88ff15; animation: header-orbit 8s linear infinite; }
.galaxy-map { position: relative; display: grid; flex: 1; width: min(100%, 1100px); min-height: 520px; margin: 2px auto 0; place-items: center; }
.orbit { position: absolute; top: 50%; left: 50%; border: 1px solid #a4b9ff25; border-radius: 50%; transform: translate(-50%, -50%) rotate(-18deg); pointer-events: none; }
.orbit-one { width: clamp(300px, 39vw, 440px); height: clamp(180px, 23vw, 260px); }.orbit-two { width: clamp(430px, 60vw, 670px); height: clamp(260px, 36vw, 395px); transform: translate(-50%, -50%) rotate(22deg); border-style: dashed; border-color: #a4b9ff1e; }.orbit-three { width: clamp(550px, 76vw, 855px); height: clamp(340px, 48vw, 525px); transform: translate(-50%, -50%) rotate(-7deg); border-color: #a4b9ff1a; }.orbit-four { width: clamp(660px, 89vw, 990px); height: clamp(420px, 58vw, 620px); transform: translate(-50%, -50%) rotate(14deg); border-style: dashed; border-color: #a4b9ff13; }
.sun-core { position: absolute; z-index: 1; display: grid; width: clamp(66px, 8vw, 94px); aspect-ratio: 1; place-items: center; border: 1px solid #fff5bdc9; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #fff8d2 0%, #ffc86e 27%, #ff9c65 54%, #ae4fba 83%); color: white; font-size: clamp(1.4rem, 3vw, 2.2rem); box-shadow: 0 0 20px #ffc86eaa, 0 0 55px #ffab6c5c, 0 0 125px #b47aff35, inset -8px -8px 18px #ae4fba80; animation: sun-pulse 4s ease-in-out infinite; }
.sun-glow { position: absolute; width: clamp(125px, 17vw, 190px); aspect-ratio: 1; border-radius: 50%; background: #b6a5ff15; filter: blur(15px); animation: glow-breathe 4s ease-in-out infinite; }
.planet-entry { position: absolute; z-index: 4; display: flex; align-items: center; gap: 10px; padding: 7px; border: 0; border-radius: 19px; background: transparent; color: inherit; text-align: left; cursor: pointer; transition: transform .32s cubic-bezier(.2,.8,.2,1), filter .32s ease; animation: planet-arrive .8s cubic-bezier(.2,.8,.2,1) both; }
.planet-entry:hover, .planet-entry:focus-visible { z-index: 8; transform: translateY(-6px) scale(1.055); filter: brightness(1.12); outline: none; }.planet-entry:focus-visible .planet-system { outline: 2px solid #fff; outline-offset: 5px; }
.planet-system { position: relative; display: grid; width: clamp(68px, 9vw, 100px); aspect-ratio: 1; flex: 0 0 auto; place-items: center; }.planet-ball { position: relative; z-index: 1; display: grid; width: 72%; aspect-ratio: 1; place-items: center; overflow: hidden; border: 1px solid #e4e9ff8c; border-radius: 50%; background: var(--planet-gradient); box-shadow: inset -12px -9px 15px #03071f75, inset 8px 7px 16px #ffffff30, 0 0 26px var(--planet-glow); transition: transform .35s ease, box-shadow .35s ease; }
.planet-ball::before { position: absolute; top: 18%; left: 10%; width: 50%; height: 22%; border-radius: 50%; background: #ffffff25; content: ''; transform: rotate(-25deg); filter: blur(1px); }.planet-mark { position: relative; z-index: 2; color: #fff; font-family: 'Orbitron', sans-serif; font-size: clamp(1rem, 2.2vw, 1.55rem); font-weight: 900; text-shadow: 0 1px 8px #10133280; }
.planet-halo { position: absolute; inset: 0; border: 1px solid var(--planet-glow); border-radius: 50%; opacity: .3; transform: scale(.87); transition: transform .35s ease, opacity .35s ease; }.planet-entry:hover .planet-ball { transform: rotate(-7deg) scale(1.1); box-shadow: inset -12px -9px 15px #03071f75, inset 8px 7px 16px #ffffff30, 0 0 42px var(--planet-glow); }.planet-entry:hover .planet-halo { transform: scale(1.15); opacity: .8; }
.planet-ring { position: absolute; z-index: 2; width: 105%; height: 33%; border: 4px solid #c5d3ffb3; border-left-color: #e3eaff60; border-bottom-color: #91a7ff9c; border-radius: 50%; transform: rotate(-24deg); pointer-events: none; }.planet-moon { position: absolute; z-index: 3; top: 4%; right: 8%; width: 13px; aspect-ratio: 1; border-radius: 50%; background: #dfe8ff; box-shadow: 0 0 10px #a5bcff; }
.planet-label { display: flex; max-width: 220px; flex-direction: column; gap: 4px; padding: 10px 13px; border: 1px solid #c6d3ff22; border-radius: 14px; background: linear-gradient(135deg, #101733d9, #171d45c9); box-shadow: 0 8px 24px #0206152e; backdrop-filter: blur(8px); transition: border-color .3s ease, background .3s ease; }.planet-entry:hover .planet-label { border-color: #9cb4ff75; background: #252e5ae8; }.planet-label strong { font-size: clamp(.7rem, 1.3vw, .92rem); font-weight: 900; line-height: 1.3; }.planet-label small { color: #abb8e6; font-size: .72rem; }
.planet-color-1 { --planet-gradient: radial-gradient(circle at 30% 26%, #b8fbff, #4b91d9 42%, #3a4caa 70%, #23255e); --planet-glow: #70cfff8c; }.planet-color-2 { --planet-gradient: radial-gradient(circle at 30% 28%, #fff0c0, #e88f95 42%, #9e519e 72%, #453b8c); --planet-glow: #ed9bc88c; }.planet-color-3 { --planet-gradient: radial-gradient(circle at 30% 28%, #e0bcff, #9564e8 45%, #5642a8 73%, #252c6f); --planet-glow: #b38cff91; }.planet-color-4 { --planet-gradient: radial-gradient(circle at 30% 28%, #ceffc7, #4dc8a8 42%, #20809f 70%, #194b7c); --planet-glow: #6affd78c; }.planet-color-5 { --planet-gradient: radial-gradient(circle at 30% 28%, #ffe9ad, #d6ac54 43%, #9b663b 72%, #41355c); --planet-glow: #ffda8c80; }
.planet-position-1 { top: 8%; left: 16%; flex-direction: row-reverse; animation-delay: .04s; }.planet-position-2 { top: 19%; right: 7%; animation-delay: .12s; }.planet-position-3 { top: 61%; right: 7%; animation-delay: .2s; }.planet-position-4 { bottom: 3%; left: 24%; animation-delay: .28s; }.planet-position-5 { top: 53%; left: 4%; flex-direction: row-reverse; animation-delay: .36s; }
.floating-astronaut { position: absolute; top: 21%; left: 45%; font-size: clamp(1.3rem, 3vw, 2rem); filter: drop-shadow(0 0 16px #a3c0ff88); animation: astronaut-drift 5s ease-in-out infinite; pointer-events: none; }.floating-satellite { position: absolute; right: 32%; bottom: 11%; font-size: clamp(1.15rem, 2vw, 1.65rem); opacity: .8; animation: satellite-drift 8s ease-in-out infinite; pointer-events: none; }
.galaxy-footer { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 4px; color: #9faddf; font-size: .82rem; text-align: center; }.footer-star { color: #a4d8ff; text-shadow: 0 0 12px #8edbff; }
.content-placeholder { position: relative; display: flex; width: min(100%, 760px); min-height: 520px; flex: 1; flex-direction: column; align-items: center; justify-content: center; align-self: center; padding: 36px 10px 28px; text-align: center; }.placeholder-stars { margin-bottom: 8px; color: #b9c9ff; letter-spacing: .45em; text-shadow: 0 0 18px #91aaff; animation: star-glimmer 2s ease-in-out infinite alternate; }.placeholder-planet { position: relative; display: grid; width: 114px; aspect-ratio: 1; place-items: center; margin: 8px 0 24px; border: 1px solid #ffffff6b; border-radius: 50%; background: radial-gradient(circle at 28% 24%, #c8fbff, #5b91d9 43%, #35459b 74%, #171f58); box-shadow: inset -15px -12px 18px #03071f80, inset 9px 8px 20px #ffffff2b, 0 0 44px #70cfff55; animation: placeholder-float 4s ease-in-out infinite; }.placeholder-planet span { position: relative; z-index: 2; color: white; font-family: 'Orbitron', sans-serif; font-size: 2.5rem; font-weight: 900; text-shadow: 0 0 12px #fff8; }.placeholder-planet i { position: absolute; width: 125%; height: 31%; border: 3px solid #d9e5ff83; border-radius: 50%; transform: rotate(-20deg); }.placeholder-color-sumas-restas { background: radial-gradient(circle at 28% 24%, #c8fbff, #5b91d9 43%, #35459b 74%, #171f58); }.placeholder-color-multiplicacion { background: radial-gradient(circle at 28% 24%, #fff0c0, #e88f95 42%, #9e519e 72%, #453b8c); }.placeholder-color-division { background: radial-gradient(circle at 28% 24%, #e0bcff, #9564e8 45%, #5642a8 73%, #252c6f); }.placeholder-color-problemas { background: radial-gradient(circle at 28% 24%, #ceffc7, #4dc8a8 42%, #20809f 70%, #194b7c); }.placeholder-color-patrones { background: radial-gradient(circle at 28% 24%, #ffe9ad, #d6ac54 43%, #9b663b 72%, #41355c); }
.content-placeholder .eyebrow { margin-bottom: 10px; }.content-placeholder h2 { margin: 0 0 23px; font-family: 'Orbitron', 'Nunito', sans-serif; font-size: clamp(1.25rem, 3.5vw, 2rem); font-weight: 800; line-height: 1.35; text-wrap: balance; }.placeholder-card { width: min(100%, 520px); padding: 25px clamp(18px, 4vw, 34px) 24px; border: 1px solid #bccbff2b; border-radius: 24px; background: linear-gradient(135deg, #ffffff0d, #8b9dff0b); box-shadow: 0 22px 70px #00000024, inset 0 1px 0 #ffffff0b; backdrop-filter: blur(12px); }.placeholder-icon { color: #b4c8ff; font-size: 2rem; text-shadow: 0 0 18px #9baeff; }.placeholder-card p { margin: 13px 0 0; color: #eaf0ff; font-size: 1rem; }.placeholder-card .placeholder-description { color: #b5c0e2; font-size: .9rem; line-height: 1.65; }.coming-soon { display: inline-block; margin-top: 22px; padding: 7px 12px; border: 1px solid #b0c4ff30; border-radius: 999px; color: #aebfff; font-size: .66rem; font-weight: 900; letter-spacing: .16em; }.placeholder-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }.back-galaxy, .another-topic { min-height: 48px; padding: 12px 18px; border: 1px solid #d3deff36; border-radius: 15px; background: #ffffff0a; color: #e6ebff; font-weight: 800; cursor: pointer; transition: transform .25s ease, background .25s ease, box-shadow .25s ease; }.back-galaxy:hover { transform: translateX(-3px); background: #ffffff15; }.another-topic { border-color: #9d9dff70; background: linear-gradient(120deg, #8b69ff, #526cf5); box-shadow: 0 6px 18px #7465ff30; }.another-topic:hover { transform: translateY(-3px); box-shadow: 0 10px 25px #7465ff50; }.another-topic span { margin-left: 8px; }
.learning-card { width: min(100%, 600px); padding: 28px clamp(18px, 4vw, 36px); border: 1px solid #b9caff35; border-radius: 24px; background: linear-gradient(135deg, #ffffff12, #8b9dff12); box-shadow: 0 22px 70px #00000024, inset 0 1px 0 #ffffff12; backdrop-filter: blur(12px); }
.learning-symbol { display: inline-grid; width: 48px; height: 48px; place-items: center; border-radius: 16px; background: #a8c4ff20; color: #d9e7ff; font-size: 1.8rem; text-shadow: 0 0 16px #9baeff; }
.learning-intro { margin: 16px 0 20px; color: #eaf0ff; font-size: 1rem; line-height: 1.75; }
.learning-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 9px; }
.learning-tags span { padding: 8px 12px; border: 1px solid #a9bfff30; border-radius: 999px; background: #ffffff0b; color: #c8d7ff; font-size: .78rem; font-weight: 800; }
.topic-panel-enter-active, .topic-panel-leave-active { transition: opacity .3s ease, transform .3s ease; }.topic-panel-enter-from { opacity: 0; transform: translateY(12px) scale(.98); }.topic-panel-leave-to { opacity: 0; transform: translateY(-8px) scale(.99); }
@keyframes star-glimmer { from { opacity: .28; transform: scale(.85); } to { opacity: .9; transform: scale(1.15); } }@keyframes header-orbit { to { transform: rotate(360deg); } }@keyframes sun-pulse { 0%,100% { transform: scale(1); filter: saturate(1); } 50% { transform: scale(1.045); filter: saturate(1.2); } }@keyframes glow-breathe { 0%,100% { opacity: .6; transform: scale(.9); } 50% { opacity: 1; transform: scale(1.15); } }@keyframes planet-arrive { from { opacity: 0; transform: translateY(13px) scale(.9); } to { opacity: 1; transform: translateY(0) scale(1); } }@keyframes astronaut-drift { 0%,100% { transform: translate(0,0) rotate(-9deg); } 50% { transform: translate(11px,-13px) rotate(8deg); } }@keyframes satellite-drift { 0%,100% { transform: translate(0,0) rotate(-8deg); } 50% { transform: translate(-10px,8px) rotate(12deg); } }@keyframes placeholder-float { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-8px) rotate(3deg); } }
@media (max-width: 760px) { .galaxy-header { grid-template-columns: 1fr auto; gap: 16px 8px; }.home-button { grid-column: 1; grid-row: 1; }.header-orbit { grid-column: 2; grid-row: 1; }.header-copy { grid-column: 1 / -1; grid-row: 2; }.galaxy-map { min-height: 670px; margin-top: 4px; }.orbit-one { width: 62vw; height: 38vw; }.orbit-two { width: 88vw; height: 54vw; }.orbit-three { width: 110vw; height: 72vw; }.orbit-four { width: 125vw; height: 85vw; }.planet-system { width: 64px; }.planet-entry { gap: 4px; }.planet-label { max-width: 150px; padding: 8px 10px; }.planet-label small { display: none; }.planet-label strong { font-size: .72rem; }.planet-position-1 { top: 7%; left: 1%; }.planet-position-2 { top: 19%; right: 0; }.planet-position-3 { top: 57%; right: 0; }.planet-position-4 { bottom: 4%; left: 8%; }.planet-position-5 { top: 47%; left: -3%; }.floating-astronaut { top: 34%; left: 49%; }.floating-satellite { right: 28%; bottom: 20%; } }
@media (max-width: 440px) { .galaxy-screen { padding: 16px 12px 18px; }.header-copy h1 { font-size: 1.55rem; }.subtitle { max-width: 290px; margin-left: auto; margin-right: auto; font-size: .8rem; }.galaxy-map { min-height: 630px; }.planet-system { width: 54px; }.planet-label { max-width: 126px; padding: 7px 8px; }.planet-label strong { font-size: .64rem; }.planet-position-1 { left: -6%; }.planet-position-2 { right: -7%; }.planet-position-3 { right: -6%; }.planet-position-4 { left: -3%; }.planet-position-5 { left: -9%; }.sun-core { width: 60px; }.galaxy-footer { padding: 0 6px; font-size: .72rem; }.content-placeholder { min-height: 0; padding: 28px 2px 25px; }.placeholder-planet { width: 94px; }.placeholder-actions { flex-direction: column; width: min(100%, 280px); }.placeholder-actions button { width: 100%; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; } }
</style>
