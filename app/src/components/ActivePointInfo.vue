<template>
    <div class="info-window" @click="close" :class="{active: isActive}">
        <div class="window">
            {{ translate(point.text) }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { type ActivePoint } from "@src/types/Config";
import { ref, onMounted } from "vue";
import { useLanguage } from "@src/composables/Language";

const { translate } = useLanguage();

const props = defineProps<{
    point: ActivePoint
}>();

const emit = defineEmits(['close']);

const isActive = ref(false);

function close() {
    emit('close');
}

onMounted(() => {
    isActive.value = true;
});

</script>

<style lang="scss" scoped>
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.info-window {
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;

    & .window {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 32px;
        border-radius: 10px;
        font-size: 22px;
        line-height: 26px;
    }


    &.active {
        opacity: 1;

        & .window {
            animation: fadeInScale 0.3s ease-in-out;
        }
    }
}
</style>