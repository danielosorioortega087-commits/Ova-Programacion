<template>
  <button class="main-button" :class="[`tone-${color}`, { 'is-wide': anchoCompleto }]" :disabled="deshabilitado" @click="$emit('click')">
    <span>{{ texto }}</span>
    <span class="button-arrow" aria-hidden="true">{{ icono }}</span>
  </button>
</template>

<script setup>
defineProps({
  texto: { type: String, default: 'Continuar' },
  color: { type: String, default: 'primary' },
  deshabilitado: { type: Boolean, default: false },
  anchoCompleto: { type: Boolean, default: false },
  icono: { type: String, default: '→' }
})
defineEmits(['click'])
</script>

<style scoped>
.main-button { display: inline-flex; align-items: center; justify-content: center; gap: 16px; min-height: 54px; padding: 13px 24px; border: 0; border-radius: 18px; color: white; font-size: 1rem; font-weight: 900; cursor: pointer; box-shadow: 0 7px 0 rgba(0,0,0,.18), 0 12px 30px rgba(76,90,255,.2); transition: transform .18s ease, filter .18s ease, box-shadow .18s ease; }
.main-button:hover:not(:disabled) { transform: translateY(-3px); filter: brightness(1.1); box-shadow: 0 10px 0 rgba(0,0,0,.14), 0 16px 34px rgba(76,90,255,.28); }
.main-button:active:not(:disabled) { transform: translateY(2px); box-shadow: 0 3px 0 rgba(0,0,0,.18); }
.main-button:focus-visible { outline: 3px solid #fff; outline-offset: 4px; }
.main-button:disabled { opacity: .45; cursor: not-allowed; }
.tone-primary { background: linear-gradient(135deg, #8a63ff, #5665f5); }
.tone-success { background: linear-gradient(135deg, #38d6a5, #16a987); }
.tone-soft { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.18); }
.button-arrow { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 10px; background: rgba(255,255,255,.18); font-size: 1.25rem; }
.is-wide { width: 100%; }
</style>
