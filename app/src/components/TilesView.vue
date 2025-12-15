<template>

  <NavTile v-for="(tile, i) in tiles" :key="tile.asset" :is-active="isNavTileSelected(i + 1)" :title="tile.title"
    :width="tile.width" :height="tile.height" :left="tile.x" :top="tile.y" @click="setSelectedNavTile(i + 1)">
    <Viewer :asset="tile.asset" :is-active="isNavTileSelected(i + 1)" :config="tile.config"
      :camera-config="getCameraConfig(i)" />
  </NavTile>
</template>

<script setup lang="ts">
// import { useLanguage } from "@src/composables/Language";
import Viewer from "@src/components/Viewer.vue";
import NavTile from "@src/components/NavTile.vue";
import { useNavigationState } from "../composables/NavigationState";
import { reactive } from "vue";
import TileOccupancyService from '@src/services/TileOccupancyService';
import useTimeoutInterval from "../composables/TimeoutInterval";
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import type Config from "@src/types/Config";

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
  animate: {
    type: Boolean,
    default: () => true,
  },
});

// const { translate } = useLanguage();
const { setSelectedNavTile,
  isNavTileSelected, shouldShowNavGroup } = useNavigationState();

shouldShowNavGroup.value = false;

const service = new TileOccupancyService();

interface TileSettings {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  asset: string;
  config: Config;
};

const tiles = reactive<TileSettings[]>([
  {
    x: 1,
    y: 1,
    width: 1,
    height: 1,
    title: "Zivis",
    asset: 'fish',
    config: props.config.fish,
  },
  {
    x: 2,
    y: 1,
    width: 1,
    height: 1,
    title: "Abinieki",
    asset: 'frog',
    config: props.config.frog,
  },
  {
    x: 3,
    y: 1,
    width: 1,
    height: 1,
    title: "Rāpuļi",
    asset: 'lizard',
    config: props.config.lizard
  },
  {
    x: 1,
    y: 2,
    width: 1,
    height: 1,
    title: "Putni",
    asset: 'pigeon',
    config: props.config.bird,
  },
  {
    x: 2,
    y: 2,
    width: 2,
    height: 1,
    title: "Zīdītāji",
    asset: 'jackal',
    config: props.config.jackal,
  },
]);

function updateTiles(id: number, sx: number, sy: number, tx: number, ty: number, copy: boolean) {
  let width = 1, height = 1, x = tx, y = ty;
  if (copy) {
    width = (sx != tx) ? 2 : 1;
    height = (sy != ty) ? 2 : 1;
    x = Math.min(sx, tx);
    y = Math.min(sy, ty);
  }

  const tile = tiles[id - 1];
  if (tile) {
    tile.x = x + 1;
    tile.y = y + 1;
    tile.width = width;
    tile.height = height;
  }
}

function getCameraConfig(index: number) {
  const tile = tiles[index];
  if (!tile) {
    return;
  }

  const cam = tile.config.cameraConfig;
  if (isNavTileSelected(index + 1)) {
    return cam[CameraConfigTypes.CAMERA_FULL];
  }

  if (tile) {
    if (tile.width > tile.height) {
      return cam[CameraConfigTypes.CAMERA_ICON_HORIZ];
    }

    if (tile.width < tile.height) {
      return cam[CameraConfigTypes.CAMERA_ICON_VERT];
    }
  }

  return cam[CameraConfigTypes.CAMERA_ICON_RECT];
}

if (props.animate) {
  useTimeoutInterval(() => {
    service.resolveTiles(updateTiles);
  }, 2000);
}

</script>

<style scoped lang="scss"></style>
