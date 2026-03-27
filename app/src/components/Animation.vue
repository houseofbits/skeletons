<template>
    <div class="animation" :class="{ 'active': isAnimationActive }">
        <component :is="props.config.animationComponent" :is-active="isCurrentAnimationActive"
            :is-visible="isCurrentAnimationActive" v-bind="props.config.animationProps ?? {}" />
        <img class="animation-placeholder-image" :class="{hidden: isCurrentAnimationActive}" :src="props.config.animationPlaceholderUrl ?? ''" />
        <div class="overlay" @click="toggleActive">
            <div class="play-button" :class="{ 'active': isCurrentAnimationActive }">
                <span class="icon" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNavigationState } from "@src/composables/NavigationState";
import type Config from "@src/types/Config";
import { computed, watch } from "vue";

const props = defineProps({
  config: {
    type: Object as () => Config,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits<{
    (e: 'toggle', val: boolean): void;
}>();

const { isAnimationActive, animationTitle, setAnimationActive } = useNavigationState();

function toggleActive() {
    if (!isAnimationActive.value) {
        setAnimationActive(props.config.animationTitle as string);
    }
}

const isCurrentAnimationActive = computed(() => {
    return props.isVisible && isAnimationActive.value && animationTitle.value === props.config.animationTitle;
});

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

    & .animation-placeholder-image{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 1;
        transition: opacity 0.4s ease;
        pointer-events: none;
        z-index: 400;

        &.hidden {
            opacity: 0;
        }
    }

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
        z-index: 500;
    }

    &.active {
        width: 1920px;
        height: 1080px;
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
