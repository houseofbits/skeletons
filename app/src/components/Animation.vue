<template>
    <div class="animation" :class="{ 'active': isAnimationActive }">
        <slot></slot>
        <div class="overlay" @click="toggleActive">
            <PlayButton :is-playing="false"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import PlayButton from './PlayButton.vue';
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
</style>
