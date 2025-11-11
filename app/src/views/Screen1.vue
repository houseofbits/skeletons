<template>
  <h1>Screen 1</h1>

  <div class="test">
    <div class="test2">{{ translate('hello') }}</div>
  </div>

  <NavTile :is-active="isNavTileSelected(1)" title="Zivis" width="1" height="1" left="1" top="1"
    @click="setSelectedNavTile(1)">
    <!-- <Viewer3D /> -->

  </NavTile>

  <NavTile :is-active="isNavTileSelected(2)" title="Abinieki" width="1" height="1" left="2" top="1"
    @click="setSelectedNavTile(2)">
    
  </NavTile>

  <NavTile :is-active="isNavTileSelected(3)" title="Rāpuļi" width="1" height="1" left="3" top="1"
    @click="setSelectedNavTile(3)" >
    <Viewer src="/models/tortoise.FBX" :is-active="isNavTileSelected(3)" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(4)" title="Putni" width="1" height="1" left="1" top="2"
    @click="setSelectedNavTile(4)" />

  <NavTile :is-active="isNavTileSelected(5)" title="Zīdītāji" width="2" height="1" left="2" top="2"
    @click="setSelectedNavTile(5)" >
    <Viewer src="/models/cat-scene.FBX" :is-active="isNavTileSelected(5)" />
  </NavTile>


</template>

<script setup lang="ts">
import { useLanguage } from "@src/composables/Language";
import Viewer3D from "@src/components/Viewer3D.vue";
import Viewer from "@src/components/Viewer.vue";
import NavTile from "../components/NavTile.vue";
import { useNavigationState } from "../composables/NavigationState";

const { translate } = useLanguage();
const { setSelectedNavTile,
  isNavTileSelected } = useNavigationState();

</script>

<style scoped lang="scss"></style>
