<template>
  <main class="app-shell">
    <Transition name="screen" mode="out-in">
      <PantallaBienvenida v-if="pantalla === 'inicio'" key="inicio" @comenzar="iniciarExploracion" />
      <SeleccionContenidos v-else key="galaxia" @volver-inicio="volverInicio" />
    </Transition>

    <button class="music-toggle" type="button" :aria-pressed="musicaActiva" :aria-label="musicaActiva ? 'Desactivar música' : 'Activar música'" @click="alternarMusica">
      <span class="music-icon" aria-hidden="true">{{ musicaActiva ? '♫' : '♪' }}</span>
      <span>{{ musicaActiva ? 'Música activada' : 'Música desactivada' }}</span>
      <span class="music-state" aria-hidden="true">{{ musicaActiva ? 'ON' : 'OFF' }}</span>
    </button>

    <Transition name="warp">
      <div v-if="transicionActiva" class="warp-overlay" aria-live="polite" role="status">
        <div class="warp-stars"></div>
        <div class="warp-core"></div>
        <div class="warp-rocket" aria-hidden="true">🚀</div>
        <p>¡Despegando hacia la galaxia!</p>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { ref, provide, onBeforeUnmount, onMounted } from 'vue'
import PantallaBienvenida from './components/PantallaBienvenida.vue'
import SeleccionContenidos from './components/SeleccionContenidos.vue'

const pantalla = ref('inicio')
const transicionActiva = ref(false)
const musicaActiva = ref(true)
let temporizadorDespegue
let musicAudio = null
let musicFadeTimer = null
let audioStarted = false
let musicStartPending = false
const activeEffects = new Set()

// Una sola pista instrumental acompaña toda la experiencia, desde el inicio hasta los planetas.
const MUSIC_SOURCE = '/audio/musica-astromat.mp3'

// Efectos independientes: cada planeta tiene su propio timbre y melodía breve.
const effects = {
  rocket: '/audio/despegue-cohete.mp3',
  back: '/audio/regreso-galaxia.mp3',
  'planet-sumas-restas': '/audio/sonido-planeta-sumas-restas.mp3',
  'planet-multiplicacion': '/audio/sonido-planeta-multiplicacion.mp3',
  'planet-division': '/audio/sonido-planeta-division.mp3',
  'planet-problemas': '/audio/sonido-planeta-problemas.mp3',
  'planet-patrones': '/audio/sonido-planeta-patrones.mp3'
}

function clearMusicFade() {
  if (musicFadeTimer) clearInterval(musicFadeTimer)
  musicFadeTimer = null
}

function startMusic(reset = false) {
  if (!musicaActiva.value || typeof window === 'undefined' || musicStartPending) return
  const source = MUSIC_SOURCE
  if (!musicAudio) {
    musicAudio = new Audio()
    musicAudio.preload = 'auto'
    musicAudio.loop = true
  }

  const sourceChanged = !musicAudio.src.endsWith(source)
  if (sourceChanged || reset) {
    musicAudio.pause()
    musicAudio.src = source
    musicAudio.currentTime = 0
    musicAudio.volume = 0
  } else if (!musicAudio.paused) {
    return
  }

  clearMusicFade()
  musicStartPending = true
  musicAudio.play().then(() => {
    musicStartPending = false
    if (!musicaActiva.value) {
      musicAudio.pause()
      musicAudio.volume = 0
      return
    }
    audioStarted = true
    const targetVolume = 0.86
    let volume = musicAudio.volume
    musicFadeTimer = setInterval(() => {
      volume = Math.min(targetVolume, volume + 0.065)
      if (musicAudio) musicAudio.volume = volume
      if (volume >= targetVolume) clearMusicFade()
    }, 35)
  }).catch(() => {
    musicStartPending = false
    // El navegador puede bloquear audio hasta una interacción explícita.
  })
}

function stopMusic() {
  clearMusicFade()
  if (musicAudio) {
    musicAudio.pause()
    musicAudio.volume = 0
  }
}


function playUiSound(kind = 'back') {
  if (!musicaActiva.value || typeof window === 'undefined') return
  const source = effects[kind]
  if (!source) return
  const sound = new Audio(source)
  sound.preload = 'auto'
  sound.volume = 0.92
  activeEffects.add(sound)
  const release = () => activeEffects.delete(sound)
  sound.addEventListener('ended', release, { once: true })
  sound.addEventListener('error', release, { once: true })
  sound.play().catch(release)
}

function alternarMusica() {
  musicaActiva.value = !musicaActiva.value
  if (musicaActiva.value) startMusic()
  else {
    stopMusic()
    activeEffects.forEach(sound => sound.pause())
    activeEffects.clear()
  }
}

function iniciarAudioPorInteraccion() {
  if (!audioStarted && musicaActiva.value) startMusic()
}

provide('audio', { playUiSound })
onMounted(() => window.addEventListener('pointerdown', iniciarAudioPorInteraccion, { once: true, capture: true }))

function iniciarExploracion() {
  if (transicionActiva.value) return
  clearTimeout(temporizadorDespegue)
  iniciarAudioPorInteraccion()
  playUiSound('rocket')
  transicionActiva.value = true
  temporizadorDespegue = setTimeout(() => {
    pantalla.value = 'galaxia'
    transicionActiva.value = false
  }, 1550)
}

function volverInicio() {
  playUiSound('back')
  pantalla.value = 'inicio'
}

onBeforeUnmount(() => {
  clearTimeout(temporizadorDespegue)
  stopMusic()
  activeEffects.forEach(sound => sound.pause())
  activeEffects.clear()
  window.removeEventListener('pointerdown', iniciarAudioPorInteraccion, true)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Orbitron:wght@500;600;700;800;900&display=swap');
:root { font-family: 'Nunito', 'Trebuchet MS', sans-serif; color: #f7f8ff; background: #070b22; font-synthesis: none; }
* { box-sizing: border-box; }
html, body, #__nuxt { min-height: 100%; margin: 0; }
body { min-width: 320px; min-height: 100vh; }
button { font: inherit; }
.app-shell { min-height: 100vh; overflow: hidden; background: #070b22; }
.music-toggle { position: fixed; z-index: 1200; top: 18px; right: 18px; display: inline-flex; align-items: center; gap: 9px; min-height: 44px; padding: 9px 13px; border: 1px solid #cbd8ff55; border-radius: 999px; background: #101936d9; color: #f3f5ff; box-shadow: 0 8px 28px #02061570, inset 0 1px 0 #ffffff20; backdrop-filter: blur(12px); cursor: pointer; font-size: .78rem; font-weight: 900; transition: transform .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease; }
.music-toggle:hover { transform: translateY(-3px) scale(1.055); border-color: #a9dfff; background: #28366bdc; box-shadow: 0 12px 32px #4b86ff55, 0 0 20px #77dfff35; }
.music-toggle:active { transform: scale(.96); }
.music-icon { font-size: 1.25rem; color: #9ceaff; text-shadow: 0 0 12px #6bdcff; animation: music-pulse 1.5s ease-in-out infinite; }
.music-state { padding: 3px 6px; border-radius: 8px; background: #62dcb533; color: #8ff5d1; font-size: .62rem; letter-spacing: .06em; }
@keyframes music-pulse { 50% { transform: scale(1.2); } }
.screen-enter-active, .screen-leave-active { transition: opacity .28s ease, transform .28s ease; }
.screen-enter-from { opacity: 0; transform: translateY(12px) scale(.985); }
.screen-leave-to { opacity: 0; transform: translateY(-8px) scale(.99); }
.warp-overlay { position: fixed; inset: 0; z-index: 1000; overflow: hidden; display: grid; place-items: center; background: radial-gradient(ellipse at center, #293d91 0%, #111638 44%, #030611 100%); }
.warp-overlay p { position: relative; z-index: 3; align-self: center; margin-top: 220px; padding: 0 18px; text-align: center; font-family: 'Orbitron', sans-serif; font-size: clamp(1rem, 3vw, 1.55rem); font-weight: 800; text-shadow: 0 0 18px #72d8ff; animation: text-pulse .6s ease-in-out infinite alternate; }
.warp-stars { position: absolute; inset: -60%; background-image: radial-gradient(#fff 1.5px, transparent 2px), radial-gradient(#8de5ff 1px, transparent 2px), radial-gradient(#fff 1px, transparent 2px); background-size: 54px 54px, 83px 83px, 117px 117px; background-position: 0 0, 20px 30px, 40px 12px; animation: warp-travel .65s linear infinite; }
.warp-core { position: absolute; z-index: 1; width: 34px; height: 34px; border-radius: 50%; background: white; box-shadow: 0 0 30px 18px #73d9ff, 0 0 90px 55px #6555ff; animation: core-grow 1.45s ease-in forwards; }
.warp-rocket { position: absolute; z-index: 4; left: 5vw; bottom: 4vh; font-size: clamp(3.6rem, 8vw, 6.5rem); filter: drop-shadow(0 0 20px #8fe7ff); transform: rotate(-35deg); animation: rocket-launch 1.45s cubic-bezier(.45,.05,.75,.35) forwards; }
.warp-rocket::after { position: absolute; content: '🔥'; font-size: .65em; left: -28%; bottom: -22%; transform: rotate(35deg); filter: drop-shadow(0 0 12px #ffb05c); }
.warp-enter-active { animation: overlay-in .18s ease-out; }.warp-leave-active { animation: overlay-out .24s ease-in forwards; }
@keyframes warp-travel { to { transform: scale(2.5) rotate(9deg); } }
@keyframes core-grow { 0% { transform: scale(.2); opacity: 0; } 25% { opacity: 1; } 100% { transform: scale(75); opacity: 1; } }
@keyframes rocket-launch { 0% { transform: translate(0,0) rotate(-35deg) scale(.7); opacity: 0; } 12% { opacity: 1; } 55% { transform: translate(38vw,-48vh) rotate(-35deg) scale(1.05); } 100% { transform: translate(115vw,-125vh) rotate(-35deg) scale(.75); opacity: 0; } }
@keyframes text-pulse { to { opacity: .65; transform: translateY(-3px); } }
@keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }@keyframes overlay-out { to { opacity: 0; } }
@media (max-width: 560px) { .music-toggle { top: 10px; right: 10px; gap: 6px; min-height: 40px; padding: 7px 10px; font-size: .68rem; } }
@media (prefers-reduced-motion: reduce) { .screen-enter-active, .screen-leave-active, .warp-stars, .warp-core, .warp-rocket, .warp-overlay p, .music-icon { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
</style>
