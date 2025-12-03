<template>
    <div class="tile" :class="outerClass">
        <slot></slot>
        <div class="title">
            {{ title }}
            <div class="subtitle">{{ subtitle }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    isActive?: boolean;
    left: number;
    title?: string;
    subtitle: string;
}>();

const outerClass = computed(() => {

    const positionClass = props.left === 1 ? 'x-1' : 'x-2';

    if (props.isActive) {
        return [
            'active',
            positionClass
        ];
    }

    return [
        positionClass
    ];
});

</script>

<style lang="scss" scoped>
.tile {
    background: #072026;
    background: linear-gradient(178deg, rgba(7, 32, 38, 1) 69%, rgba(44, 44, 59, 1) 100%);
    border: 1px, solid rgba($color: #b4b4b4, $alpha: 0.1);
    position: absolute;
    transition: all 0.4s ease-in;
    width:50%;
    height:100%;

    & .title {
        position: absolute;
        bottom: 32px;
        left: 32px;
        color: rgba(255,255,255,0.9);
        font-size: 48px;
        font-weight: bold;
        opacity: 0.9;

        & .subtitle {
            font-size: 24px;
            font-weight: normal;
            color: rgba(255,255,255,0.6);
        }
    }

    &.x-1 {
        left: 0;
    }
    &.x-2 {
        left: 50%;

        & .title {

            left: auto;
            right: 32px;
        }
    }
}
</style>