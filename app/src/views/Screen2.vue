<template>
  <NavTile :is-active="isNavTileSelected(1)" title="Zivis" width="1" height="1" left="1" top="1"
    @click="setSelectedNavTile(1)">
    <Viewer asset="fish" :is-active="isNavTileSelected(1)" :config="configFish" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(2)" title="Abinieki" width="1" height="1" left="2" top="1"
    @click="setSelectedNavTile(2)">
    <Viewer asset="frog" :is-active="isNavTileSelected(2)" :config="configFrog" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(3)" title="Rāpuļi" width="1" height="1" left="3" top="1"
    @click="setSelectedNavTile(3)">
    <Viewer asset="lizard" :is-active="isNavTileSelected(3)" :config="configLizard" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(4)" title="Putni" width="1" height="1" left="1" top="2"
    @click="setSelectedNavTile(4)">
    <Viewer asset="pigeon" :is-active="isNavTileSelected(4)" :config="configBird" />
  </NavTile>

  <NavTile :is-active="isNavTileSelected(5)" title="Zīdītāji" width="2" height="1" left="2" top="2"
    @click="setSelectedNavTile(5)">
    <Viewer asset="jackal" :is-active="isNavTileSelected(5)" :config="configJackal" />
  </NavTile>
</template>

<script setup lang="ts">
import Viewer from "@src/components/Viewer.vue";
import NavTile from "@src/components/NavTile.vue";
import { useNavigationState } from "../composables/NavigationState";
import configFish from "@/src/helpers/screen2/configFish";
import configFrog from "@/src/helpers/screen2/configFrog";
import configLizard from "@/src/helpers/screen2/configLizard";
import configBird from "@/src/helpers/screen2/configBird";
import configJackal from "@/src/helpers/screen2/configJackal";

const { setSelectedNavTile,
  isNavTileSelected } = useNavigationState();

</script>

<style scoped lang="scss"></style>
