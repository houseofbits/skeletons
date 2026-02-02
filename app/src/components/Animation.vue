<template>
    <div class="animation" :class="{ 'active': isAnimationActive }">
        <slot></slot>
        <div class="overlay" @click="toggleActive">
            <div class="play-button" :class="{ 'active': isAnimationActive }">
                <span class="icon" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNavigationState } from "@src/composables/NavigationState";

const props = defineProps<{
    title: string;
}>();

const emit = defineEmits<{
    (e: 'toggle', val: boolean): void;
}>();

const { isAnimationActive, setAnimationActive } = useNavigationState();

function toggleActive() {
    if (!isAnimationActive.value) {
        setAnimationActive(props.title);
    }
}

</script>

<style scoped lang="scss">
.animation {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 400px;
    height: 220px;
    border-top: solid 1px rgba(255, 255, 255, 0.1);
    transition: all 0.4s ease;

    & .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.4s ease;
    }

    &.active {
        width: 100%;
        height: 100%;
        border: none;

        & .overlay {
            backdrop-filter: blur(0px);
            pointer-events: none;
        }
    }
}

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

  opacity: 1;

  transition: all 0.15s ease;

  &.active {
    opacity: 0;
  }
}

.icon {
  position: relative;
  width: 24px;
  height: 24px;
}

.play-button .icon {
  width: 0;
  height: 0;
  margin-left: 4px;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 18px solid #fff;
}
</style>
