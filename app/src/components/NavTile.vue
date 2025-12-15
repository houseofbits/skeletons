<template>
    <div class="tile" :class="outerClass">
        <slot></slot>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useNavigationState } from "../composables/NavigationState";
const { setTitle} = useNavigationState();

const props = defineProps<{
    isActive?: boolean;
    width: string | number;
    height: string | number;
    left: string | number;
    top: string | number;
    title: string;
}>();

watch(() => props.isActive, (isActive) => {
    setTitle(isActive ? props.title : null);
});

const outerClass = computed(() => {
    if (props.isActive) {
        return [
            `x-1`,
            `y-1`,
            `height-full`,
            `width-full`,
            'z-index-high',
            'active'
        ];
    }

    return [
        `x-${props.left}`,
        `y-${props.top}`,
        `height-${props.height}`,
        `width-${props.width}`,
        'z-index-normal'
    ];
});

</script>

<style lang="scss" scoped>
.tile {
    background: #072026;
    background: linear-gradient(178deg, rgba(7, 32, 38, 1) 69%, rgba(44, 44, 59, 1) 100%);
    border: 1px, solid rgba($color: #b4b4b4, $alpha: 0.1);
    position: absolute;
    transition: all 0.3s ease-in-out;

    & .title {
        position: absolute;
        bottom: 32px;
        left: 32px;
        color: rgba(255,255,255,0.9);
        font-size: 40px;
        font-weight: bold;
        opacity: 0.9;
    }

    &.active {
        & .title {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
    }

    &.z-index-high {
        z-index: 10;
    }

    &.z-index-normal {
        z-index: 1;
    }    

    &.width-full {
        width: 100%;
    }

    &.width-1 {
        width: 33.33%;
    }

    &.width-2 {
        width: 66.66%;
    }

    &.height-full {
        height: 100%;
    }

    &.height-1 {
        height: 50%;
    }

    &.height-2 {
        height: 100%;
    }

    &.x-1 {
        left: 0%;
    }

    &.x-2 {
        left: 33.33%;
    }

    &.x-3 {
        left: 66.66%;
    }

    &.y-1 {
        top: 0%;
    }

    &.y-2 {
        top: 50%;
    }
}
</style>