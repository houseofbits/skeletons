<template>
  <template v-if="selectedNavGroup === null">
    <NavGroupTile :is-active="true" :left="0" title="Krūšukurvis" @click="selectedNavGroup = 1">
      <Viewer asset="jackal" :is-active="isNavTileSelected(5)" :config="configJackal" />
    </NavGroupTile>
    <NavGroupTile :is-active="true" :left="1" title="Ekstremitātes" @click="selectedNavGroup = 2">
      <Viewer asset="frog" :is-active="isNavTileSelected(2)" :config="configFrog" />
    </NavGroupTile>
  </template>
  <template v-else>
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
</template>

<script setup lang="ts">
import Viewer from "@src/components/Viewer.vue";
import NavTile from "@src/components/NavTile.vue";
import { useNavigationState } from "../composables/NavigationState";
import configFish1 from "@/src/helpers/screen3_1/configFish";
import configFrog1 from "@/src/helpers/screen3_1/configFrog";
import configLizard1 from "@/src/helpers/screen3_1/configLizard";
import configBird1 from "@/src/helpers/screen3_1/configBird";
import configJackal1 from "@/src/helpers/screen3_1/configJackal";
import configFish2 from "@/src/helpers/screen3_2/configFish";
import configFrog2 from "@/src/helpers/screen3_2/configFrog";
import configLizard2 from "@/src/helpers/screen3_2/configLizard";
import configBird2 from "@/src/helpers/screen3_2/configBird";
import configJackal2 from "@/src/helpers/screen3_2/configJackal";

import { computed } from "vue";
import NavGroupTile from "../components/NavGroupTile.vue";

const { setSelectedNavTile,
  isNavTileSelected, shouldShowNavGroup, selectedNavGroup } = useNavigationState();

shouldShowNavGroup.value = true;
selectedNavGroup.value = null;

const configFrog = computed(() => (selectedNavGroup.value === 1) ? configFrog1 : configFrog2);
const configJackal = computed(() => (selectedNavGroup.value === 1) ? configJackal1 : configJackal2);
const configFish = computed(() => (selectedNavGroup.value === 1) ? configFish1 : configFish2);
const configBird = computed(() => (selectedNavGroup.value === 1) ? configBird1 : configBird2);
const configLizard = computed(() => (selectedNavGroup.value === 1) ? configLizard1 : configLizard2);

</script>

<style scoped lang="scss"></style>
