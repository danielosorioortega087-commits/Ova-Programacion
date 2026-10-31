<template>
  <section class="welcome-screen" aria-label="Pantalla de bienvenida">
    <div class="space-background" aria-hidden="true">
      <svg class="space-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="space-fill" cx="50%" cy="45%" r="75%">
            <stop offset="0" stop-color="#253978" />
            <stop offset=".52" stop-color="#121b46" />
            <stop offset="1" stop-color="#05091f" />
          </radialGradient>
          <radialGradient id="nebula-purple">
            <stop offset="0" stop-color="#8d68ff" stop-opacity=".55" />
            <stop offset="1" stop-color="#5844d8" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="nebula-cyan">
            <stop offset="0" stop-color="#39d9ff" stop-opacity=".38" />
            <stop offset="1" stop-color="#2479c8" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="planet-blue" cx="28%" cy="24%" r="78%">
            <stop offset="0" stop-color="#c6f5ff" />
            <stop offset=".35" stop-color="#6c9fe9" />
            <stop offset=".75" stop-color="#354caa" />
            <stop offset="1" stop-color="#18245d" />
          </radialGradient>
          <radialGradient id="planet-lilac" cx="30%" cy="24%" r="78%">
            <stop offset="0" stop-color="#ffe3f2" />
            <stop offset=".4" stop-color="#b37bea" />
            <stop offset="1" stop-color="#49357f" />
          </radialGradient>
          <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="1600" height="900" fill="url(#space-fill)" />
        <ellipse class="svg-nebula nebula-purple" cx="300" cy="210" rx="430" ry="270" fill="url(#nebula-purple)" />
        <ellipse class="svg-nebula nebula-cyan" cx="1330" cy="690" rx="440" ry="300" fill="url(#nebula-cyan)" />
        <ellipse class="svg-nebula nebula-blue" cx="900" cy="430" rx="500" ry="260" fill="url(#nebula-purple)" opacity=".4" />

        <g class="stars-layer stars-layer-one" fill="#ffffff">
          <circle cx="90" cy="105" r="2.2"/><circle cx="220" cy="330" r="1.5"/><circle cx="365" cy="80" r="1.8"/>
          <circle cx="510" cy="230" r="1.3"/><circle cx="690" cy="110" r="2"/><circle cx="835" cy="300" r="1.4"/>
          <circle cx="1010" cy="115" r="1.7"/><circle cx="1190" cy="250" r="2.1"/><circle cx="1430" cy="130" r="1.6"/>
          <circle cx="1510" cy="430" r="2"/><circle cx="130" cy="650" r="1.5"/><circle cx="390" cy="790" r="1.9"/>
          <circle cx="610" cy="650" r="1.3"/><circle cx="820" cy="790" r="1.9"/><circle cx="1080" cy="620" r="1.5"/>
          <circle cx="1450" cy="790" r="1.8"/><circle cx="1540" cy="600" r="1.3"/><circle cx="950" cy="500" r="1.2"/>
        </g>
        <g class="stars-layer stars-layer-two" fill="#9fdfff">
          <circle cx="155" cy="245" r="2"/><circle cx="310" cy="500" r="1.4"/><circle cx="555" cy="420" r="1.8"/>
          <circle cx="740" cy="590" r="1.4"/><circle cx="930" cy="190" r="2"/><circle cx="1135" cy="420" r="1.4"/>
          <circle cx="1350" cy="330" r="1.8"/><circle cx="1480" cy="540" r="1.3"/><circle cx="70" cy="835" r="1.6"/>
          <circle cx="490" cy="865" r="1.4"/><circle cx="760" cy="45" r="1.5"/><circle cx="1240" cy="845" r="1.8"/>
        </g>
        <g class="orbital-lines" fill="none" stroke="#a7c4ff" stroke-opacity=".14">
          <ellipse cx="820" cy="455" rx="590" ry="245" transform="rotate(-17 820 455)" />
          <ellipse cx="820" cy="455" rx="720" ry="330" transform="rotate(13 820 455)" stroke-dasharray="5 16" />
        </g>

        <g class="svg-planet planet-float-one" filter="url(#soft-glow)">
          <circle cx="250" cy="610" r="76" fill="url(#planet-blue)" />
          <ellipse cx="250" cy="610" rx="105" ry="24" fill="none" stroke="#c4ddff" stroke-opacity=".65" stroke-width="7" transform="rotate(-21 250 610)" />
          <ellipse cx="225" cy="582" rx="30" ry="9" fill="#ffffff" opacity=".18" transform="rotate(-24 225 582)" />
        </g>
        <g class="svg-planet planet-float-two" filter="url(#soft-glow)">
          <circle cx="1330" cy="260" r="55" fill="url(#planet-lilac)" />
          <path d="M1282 250 Q1330 230 1378 252" fill="none" stroke="#ffffff" stroke-opacity=".2" stroke-width="7" />
        </g>
        <g class="svg-planet planet-float-three">
          <circle cx="1110" cy="760" r="27" fill="#f5c77b" opacity=".8" />
          <circle cx="1100" cy="751" r="7" fill="#fff2c9" opacity=".8" />
        </g>
        <g class="shooting-star" filter="url(#soft-glow)">
          <path d="M0 0 L115 58" stroke="#d8f7ff" stroke-width="3" stroke-linecap="round" />
          <circle cx="0" cy="0" r="4" fill="#ffffff" />
        </g>
      </svg>
      <div class="space-vignette"></div>
    </div>

    <div class="welcome-content">
      <div class="logo-stage">
        <div class="logo-aura" aria-hidden="true"></div>
        <img
          class="astronaut-logo"
          src="/astronauta-logo.png"
          alt="Astronauta, mascota de la misión matemática"
          draggable="false"
        />
        <span class="logo-spark spark-one" aria-hidden="true">✦</span>
        <span class="logo-spark spark-two" aria-hidden="true">✧</span>
        <span class="logo-spark spark-three" aria-hidden="true">✦</span>
      </div>

      <h1 class="welcome-question" aria-label="Astromat: números a bordo">
        <span class="title-main">Astromat:</span>
        <span class="title-subline">números a bordo</span>
      </h1>

      <div class="launch-button">
        <BotonPrincipal texto="Comenzar" icono="🚀" @click="emit('comenzar')" />
      </div>
    </div>
  </section>
</template>

<script setup>
import BotonPrincipal from './BotonPrincipal.vue'
const emit = defineEmits(['comenzar'])
</script>

<style scoped>
.welcome-screen {
  position: relative;
  display: grid;
  min-height: 100svh;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  padding: 30px 22px;
  background: #0a0e2b;
}

/* Fondo SVG espacial con nebulosas, planetas y estrellas en movimiento continuo. */
.space-background {
  position: absolute;
  z-index: -1;
  inset: -2%;
  overflow: hidden;
  background: #080d2a;
  animation: space-scene-drift 24s ease-in-out infinite alternate;
}
.space-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.space-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 25%, rgba(3, 6, 22, .56) 100%); pointer-events: none; }
.svg-nebula { transform-box: fill-box; transform-origin: center; filter: blur(24px); }
.nebula-purple { animation: nebula-breathe 17s ease-in-out infinite alternate; }
.nebula-cyan { animation: nebula-breathe 21s ease-in-out infinite alternate-reverse; }
.nebula-blue { animation: nebula-breathe 25s ease-in-out infinite alternate; }
.stars-layer-one { animation: starfield-drift 55s linear infinite; }
.stars-layer-two { animation: starfield-drift-reverse 72s linear infinite; }
.orbital-lines { transform-box: fill-box; transform-origin: center; animation: orbit-drift 90s linear infinite; }
.svg-planet { transform-box: fill-box; transform-origin: center; }
.planet-float-one { animation: planet-float-one 13s ease-in-out infinite; }
.planet-float-two { animation: planet-float-two 16s ease-in-out infinite; }
.planet-float-three { animation: planet-float-three 11s ease-in-out infinite; }
.shooting-star { opacity: 0; animation: shooting-star-travel 9s ease-in-out infinite; }

.welcome-content {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(100%, 680px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  text-align: center;
  animation: content-arrive .8s cubic-bezier(.2,.8,.2,1) both;
}
.logo-stage {
  position: relative;
  display: grid;
  width: clamp(190px, 28vw, 280px);
  aspect-ratio: 276 / 298;
  place-items: center;
  margin-bottom: clamp(22px, 3.5vh, 34px);
  isolation: isolate;
  animation: astronaut-hover 4.6s ease-in-out infinite;
}
.logo-aura {
  position: absolute;
  z-index: -1;
  inset: 13% 8%;
  border-radius: 50%;
  background: #8298ff;
  opacity: .24;
  filter: blur(35px);
  transition: opacity .35s ease, transform .45s ease;
}
.astronaut-logo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 24px;
  filter: drop-shadow(0 18px 26px rgba(2, 4, 20, .3));
  user-select: none;
  transition: transform .45s cubic-bezier(.2,.8,.2,1), filter .45s ease;
}
.logo-stage:hover .astronaut-logo { transform: scale(1.045) rotate(-2deg); filter: drop-shadow(0 22px 35px rgba(90, 126, 255, .25)); }
.logo-stage:hover .logo-aura { opacity: .46; transform: scale(1.15); }
.logo-spark { position: absolute; color: #d4e6ff; text-shadow: 0 0 14px #91aaff; animation: spark-twinkle 2.8s ease-in-out infinite alternate; pointer-events: none; }
.spark-one { top: 9%; right: -8%; font-size: 1.7rem; }
.spark-two { top: 36%; left: -11%; font-size: 1.4rem; animation-delay: .8s; }
.spark-three { right: 3%; bottom: 13%; font-size: 1.15rem; animation-delay: 1.4s; }
.welcome-question {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  margin: 0 0 26px;
  color: #f8f8ff;
  font-family: 'Orbitron', 'Trebuchet MS', sans-serif;
  font-size: clamp(1.55rem, 4.2vw, 3rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: .025em;
  text-wrap: balance;
  text-shadow: 0 0 18px rgba(132, 168, 255, .34), 0 4px 24px rgba(0, 0, 0, .35);
  animation: title-float 4.3s ease-in-out infinite, question-glow 3.8s ease-in-out infinite alternate;
}
.title-main {
  display: block;
  color: #ffffff;
  background: linear-gradient(100deg, #ffffff 12%, #c8f4ff 42%, #d9caff 70%, #ffffff 92%);
  background-size: 220% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: title-shimmer 5.5s linear infinite;
}
.title-subline {
  display: block;
  color: #dce8ff;
  font-family: 'Nunito', sans-serif;
  font-size: .58em;
  font-weight: 900;
  letter-spacing: .12em;
  text-shadow: 0 0 18px rgba(110, 208, 255, .42);
}
.launch-button { display: flex; width: 100%; justify-content: center; }
.launch-button :deep(.main-button) {
  display: inline-flex;
  min-width: clamp(240px, 34vw, 310px);
  min-height: 76px;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding: 18px 32px;
  border: 1px solid rgba(255, 255, 255, .22);
  border-radius: 24px;
  background: linear-gradient(135deg, #9b77ff 0%, #7665ff 46%, #4b6cf5 100%);
  box-shadow: 0 7px 0 #3032a0, 0 14px 34px rgba(77, 91, 255, .34), inset 0 1px 0 rgba(255, 255, 255, .26);
  color: #fff;
  font-size: clamp(1.1rem, 2.1vw, 1.3rem);
  letter-spacing: .035em;
  transition: transform .28s cubic-bezier(.2,.8,.2,1), box-shadow .28s ease, filter .28s ease;
  animation: button-breathe 3.6s ease-in-out infinite;
}
.launch-button :deep(.main-button:hover:not(:disabled)) {
  transform: translateY(-7px) scale(1.045) rotate(-.6deg);
  filter: brightness(1.1) saturate(1.08);
  box-shadow: 0 10px 0 #3032a0, 0 22px 48px rgba(104, 106, 255, .45), 0 0 34px rgba(133, 166, 255, .25), inset 0 1px 0 rgba(255, 255, 255, .36);
  animation: none;
}
.launch-button :deep(.main-button:active:not(:disabled)) { transform: translateY(1px) scale(.98); box-shadow: 0 3px 0 #3032a0, 0 6px 16px rgba(77, 91, 255, .28); }
.launch-button :deep(.main-button:focus-visible) { outline: 3px solid #dce8ff; outline-offset: 6px; }
.launch-button :deep(.button-arrow) { width: 36px; height: 36px; border-radius: 12px; font-size: 1.25rem; transition: transform .28s ease, background .28s ease; }
.launch-button :deep(.main-button:hover .button-arrow) { transform: translateX(4px) rotate(-9deg); background: rgba(255, 255, 255, .29); }

@keyframes astronaut-hover { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-9px) rotate(1deg); } }
@keyframes spark-twinkle { from { opacity: .45; transform: scale(.8) rotate(-12deg); } to { opacity: 1; transform: scale(1.12) rotate(12deg); } }
@keyframes question-glow { from { text-shadow: 0 0 14px rgba(132, 168, 255, .25), 0 4px 24px rgba(0, 0, 0, .35); } to { text-shadow: 0 0 24px rgba(132, 168, 255, .55), 0 4px 24px rgba(0, 0, 0, .35); } }
@keyframes button-breathe { 0%, 100% { box-shadow: 0 7px 0 #3032a0, 0 14px 34px rgba(77, 91, 255, .28), inset 0 1px 0 rgba(255, 255, 255, .26); } 50% { box-shadow: 0 7px 0 #3032a0, 0 18px 42px rgba(77, 91, 255, .42), inset 0 1px 0 rgba(255, 255, 255, .3); } }
@keyframes space-scene-drift { from { transform: scale(1.01) translate3d(-.25%, 0, 0); } to { transform: scale(1.07) translate3d(.3%, -1%, 0); } }
@keyframes nebula-breathe { from { transform: scale(.88) translate3d(-18px, 10px, 0); opacity: .62; } to { transform: scale(1.12) translate3d(22px, -16px, 0); opacity: 1; } }
@keyframes starfield-drift { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-42px, 28px, 0); } }
@keyframes starfield-drift-reverse { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(32px, -22px, 0); } }
@keyframes orbit-drift { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes planet-float-one { 0%,100% { transform: translate(0, 0) rotate(-4deg); } 50% { transform: translate(17px, -17px) rotate(5deg); } }
@keyframes planet-float-two { 0%,100% { transform: translate(0, 0); } 50% { transform: translate(-14px, 18px); } }
@keyframes planet-float-three { 0%,100% { transform: translate(0, 0); } 50% { transform: translate(12px, -13px); } }
@keyframes shooting-star-travel { 0%, 7% { opacity: 0; transform: translate(-80px, -55px); } 10% { opacity: 1; } 17% { opacity: 0; transform: translate(115px, 75px); } 100% { opacity: 0; transform: translate(115px, 75px); } }
@keyframes title-float { 0%,100% { transform: translateY(0) rotate(-.35deg); } 50% { transform: translateY(-7px) rotate(.35deg); } }
@keyframes title-shimmer { to { background-position: 220% center; } }
@keyframes content-arrive { from { opacity: 0; transform: translateY(14px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }

@media (max-width: 560px) {
  .welcome-screen { padding: 24px 18px; }
  .logo-stage { width: clamp(175px, 52vw, 230px); margin-bottom: 25px; }
  .welcome-question { max-width: 360px; margin-bottom: 24px; font-size: clamp(1.45rem, 6vw, 2rem); }
  .launch-button :deep(.main-button) { width: min(100%, 290px); min-height: 70px; border-radius: 22px; }
  .spark-one { right: -3%; }
  .spark-two { left: -4%; }
}
@media (max-height: 650px) and (min-width: 561px) {
  .logo-stage { width: 168px; margin-bottom: 12px; }
  .welcome-question { margin-bottom: 16px; }
  .launch-button :deep(.main-button) { min-height: 64px; }
}
@media (prefers-reduced-motion: reduce) {
  .welcome-content, .space-background, .svg-nebula, .stars-layer-one, .stars-layer-two, .orbital-lines, .svg-planet, .shooting-star, .logo-stage, .logo-spark, .welcome-question, .title-main, .launch-button :deep(.main-button) { animation: none !important; }
  .astronaut-logo, .logo-aura, .launch-button :deep(.main-button) { transition-duration: .01ms !important; }
}
</style>
