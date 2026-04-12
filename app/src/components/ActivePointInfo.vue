<template>
  <div class="info-window" @click="close" :class="{ active: isActive }">
    <div class="window">
      <img
        v-if="hasTranslation(point.translationKey + '.imageUrl')"
        :src="point.translationKey + '.imageUrl'"
      />
      <div class="text-section">
        <div
          v-if="hasTranslation(point.translationKey + '.title')"
          v-html="translate(point.translationKey + '.title')"
          class="title"
        />
        <div v-html="translate(point.translationKey + '.text')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ActivePoint } from "@src/types/Config";
import { ref, onMounted } from "vue";
import { useLanguage } from "@src/composables/Language";

const { translate, hasTranslation } = useLanguage();

defineProps<{
  point: ActivePoint;
}>();

const emit = defineEmits(["close"]);

const isActive = ref(false);

function close() {
  emit("close");
}

onMounted(() => {
  isActive.value = true;
});
</script>

<style lang="scss" scoped>
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-window {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  & .window {
    background: #787878;
    background: linear-gradient(
      90deg,
      rgba(80, 80, 80, 0.7) 0%,
      rgba(102, 102, 102, 0.7) 64%,
      rgba(32, 32, 32, 0.7) 100%
    );
    color: rgba(255, 255, 255, 0.8);
    // padding: 32px;
    font-size: 22px;
    line-height: 26px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    flex-direction: row;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    & .text-section {
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding-top: 64px;
      padding-bottom: 64px;
      justify-content: center;
      padding-left: 32px;

      & .title {
        font-weight: bold;
      }
    }
  }

  &.active {
    opacity: 1;

    & .window {
      animation: fadeInScale 0.3s ease-in-out;
    }
  }
}
</style>