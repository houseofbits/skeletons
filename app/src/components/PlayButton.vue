<template>
  <button
    class="play-button"
    :class="{ paused: isPlaying }"
    aria-label="Play / Pause"
    @click="$emit('toggle')"
  >
    <span class="icon"></span>
  </button>
</template>

<script setup>
defineProps({
  isPlaying: {
    type: Boolean,
    default: true
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.play-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(70px);
  -webkit-backdrop-filter: blur(70px);

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.15s ease;
}

.play-button:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.play-button:active {
  transform: scale(0.95);
}

/* ICON BASE */
.icon {
  position: relative;
  width: 24px;
  height: 24px;
}

/* PLAY */
.play-button:not(.paused) .icon {
  width: 0;
  height: 0;
  margin-left: 4px;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 18px solid #fff;
}

/* PAUSE */
.play-button.paused .icon::before,
.play-button.paused .icon::after {
  content: '';
  position: absolute;
  top: 0;
  width: 8px;
  height: 24px;
  background: #fff;
  border-radius: 2px;
}

.play-button.paused .icon::before {
  left: 0;
}

.play-button.paused .icon::after {
  right: 0;
}
</style>
