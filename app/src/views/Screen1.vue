<template>
  <h1>Screen 1</h1>

  <div class="test">
    <div class="test2">{{ translate('hello') }}</div>
  </div>

  <NavTile :is-active="isNavTileSelected(1)" title="Zivis" width="1" height="1" left="1" top="1"
    @click="setSelectedNavTile(1)">
    <Viewer src="/models/fish.FBX" :is-active="isNavTileSelected(1)" :camera-config="configFish" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(2)" title="Abinieki" width="1" height="1" left="2" top="1"
    @click="setSelectedNavTile(2)">
    <Viewer src="/models/frog.FBX" :is-active="isNavTileSelected(2)" :camera-config="configFrog" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(3)" title="Rāpuļi" width="1" height="1" left="3" top="1"
    @click="setSelectedNavTile(3)" >
    <Viewer src="/models/lizard.FBX" :is-active="isNavTileSelected(3)" :camera-config="configLizard" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(4)" title="Putni" width="1" height="1" left="1" top="2"
    @click="setSelectedNavTile(4)">
    <Viewer src="/models/pigeon.FBX" :is-active="isNavTileSelected(4)" :camera-config="configBird" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(5)" title="Zīdītāji" width="2" height="1" left="2" top="2"
    @click="setSelectedNavTile(5)" >
    <Viewer src="/models/jackal.FBX" :is-active="isNavTileSelected(5)" :camera-config="configJackal" />
    <!-- <Viewer src="/models/testcat_1.fbx" :is-active="isNavTileSelected(5)" /> -->
  </NavTile>
</template>

<script setup lang="ts">
import { useLanguage } from "@src/composables/Language";
import Viewer from "@src/components/Viewer.vue";
import NavTile from "@src/components/NavTile.vue";
import { useNavigationState } from "../composables/NavigationState";
import configFish from "@/src/helpers/screen1/configFish";
import configFrog from "@/src/helpers/screen1/configFrog";
import configLizard from "@/src/helpers/screen1/configLizard";
import configBird from "@/src/helpers/screen1/configBird";
import configJackal from "@/src/helpers/screen1/configJackal";

const { translate } = useLanguage();
const { setSelectedNavTile,
  isNavTileSelected } = useNavigationState();

</script>

<style scoped lang="scss"></style>
