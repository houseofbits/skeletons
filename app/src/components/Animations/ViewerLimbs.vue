<template>
  <div>
    <ViewerLimbsPart
      v-for="(c, id) in config"
      class="limbs-tile border-right"
      :class="getClass(id)"
      :scene="c?.scene"
      :camera-pos="getCameraPosition(id)"
      :camera-target="getCameraTarget(id)"
      :is-active="id === activePart"
      :hilight-bone-index="selectedBoneIndex"
      @click="selectItem(id)"
      :key="id"
    >
      <span class="limbs-text">{{ c?.title }}</span>
      <span
        class="bone-text"
        :class="{ 'bone-text-fade': id === activePart }"
        :key="selectedBoneIndex"
        >{{ boneNames[selectedBoneIndex] }}</span
      >
    </ViewerLimbsPart>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import ViewerLimbsPart from "@src/components/Animations/components/ViewerLimbsPart.vue";
import config from "@src/utils/limbsAnimationConfig";

const props = defineProps({
  isActive: { type: Boolean, default: true },
  initiallyActive: {
    type: Number,
    default: null,
  },
});

const currentItems = ref([0, 1, 2, 3]);

const backItems = ref([4, 5]);

const activePart = ref<number | null>(null);
const selectedBoneIndex = ref(0);
let selectedBoneTimer: null | ReturnType<typeof setInterval> = null;

const boneNames = [
  "Aukšdelms",
  "Spieķa kauls",
  "Elkoņa kauls",
  "Plaukstas pamata kauli",
  "Delnas kauli",
  "Pirkstu falangas",
];

watch(
  () => props.isActive,
  (val: boolean) => {
    if (val) {
      if (props.initiallyActive !== null) {
        selectItem(props.initiallyActive);
      }
    }
  }
);

function getClass(id: number) {
  const classes = [];
  if (id === activePart.value) {
    classes.push("active");
  }

  const index = currentItems.value.findIndex((val) => id == val);
  if (index >= 0) {
    classes.push("tile" + index);
    classes.push("current");
  } else {
    classes.push("back");
  }

  return classes;
}

function getCameraPosition(id: number) {
  if (activePart.value === id) {
    return config[id]?.activeCameraPos;
  }

  return config[id]?.iconCameraPos;
}

function getCameraTarget(id: number) {
  if (activePart.value === id) {
    return config[id]?.activeCameraTarget;
  }

  return config[id]?.iconCameraTarget;
}

function selectItem(id: number) {
  if (activePart.value != null) {
    swapByIndex(activePart.value);
  }
  activePart.value = id;

  if (!currentItems.value.includes(id)) {
    swapMissing(id);
  }
}

function swapMissing(id) {
  const backIndex = backItems.value.indexOf(id);

  if (backIndex === -1) {
    console.log("ID not found in backItems");
    return;
  }

  const temp = currentItems.value[0];
  if (temp === undefined) {
    return;
  }

  currentItems.value[0] = id;
  backItems.value[backIndex] = temp;
}

function swapByIndex(id: number) {
  // console.log('select', id);
  const index = currentItems.value.indexOf(id);
  if (index < 0) {
    return;
  }

  // define the pair mapping
  const pairMap: Record<number, number> = {
    0: 1,
    1: 0,
    2: 3,
    3: 2,
  };

  const targetIndex = pairMap[index];

  if (targetIndex === undefined) {
    throw new Error("Invalid index");
  }

  if (backItems.value.length === 0) {
    throw new Error("Back array is empty");
  }

  // perform swap
  const swapped = currentItems.value[targetIndex];
  const shifted = backItems.value.shift();
  if (shifted != undefined) {
    currentItems.value[targetIndex] = shifted;
  }
  if (swapped != undefined) {
    backItems.value.push(swapped);
  }
}

onMounted(() => {
  selectedBoneTimer = setInterval(() => {
    selectedBoneIndex.value = (selectedBoneIndex.value + 1) % 6;
  }, 3000);

  if (props.initiallyActive !== null) {
    selectItem(props.initiallyActive);
  }
});
</script>

<style lang="scss">
.limbs-tile {
  position: absolute;
  top: 0;
  width: 25%;
  height: 100%;
  z-index: 4;
  transition: all 300ms ease-out;

  &.back {
    display: none;
    left: -25%;
  }

  &.current {
    z-index: 5;
    display: block;
  }

  &.tile0 {
    left: 0px;
  }
  &.tile1 {
    left: 25%;
  }
  &.tile2 {
    left: 50%;
  }
  &.tile3 {
    left: 75%;
  }

  &.active {
    width: 50%;
    z-index: 10;

    &.tile1 {
      left: 0;
    }
    &.tile3 {
      left: 50%;
    }
  }
}

.border-right {
  border: 1px solid rgba($color: #b4b4b4, $alpha: 0.2);
}
.limbs-text {
  position: absolute;
  bottom: 32px;
  left: 32px;
  font-size: 48px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
}

.bone-text-fade {
  animation: bone-text-crossfade 2s ease forwards;
}

@keyframes bone-text-crossfade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bone-text {
  position: absolute;
  bottom: 32px;
  right: 32px;
  font-size: 32px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
}
</style>
  