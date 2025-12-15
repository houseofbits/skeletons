<template>
  <div v-show="selectedNavGroup === null">
    <NavGroupTile :is-active="true" :left="0" title="Ribas" subtitle="un krūšu kauls" @click="selectGroup(1)">
      <BasicViewer asset="jackal"
        :camera-position="{ x: 26.903458858152014, y: 0.3085318542698676, z: -27.36639027167504 }"
        :camera-target="{ x: 8.329575215343231, y: 13.173785743333053, z: -5.2308977119308535 }"
        :activate="groupActive" />
    </NavGroupTile>
    <NavGroupTile :is-active="true" :left="1" title="Ekstremitātes" subtitle="un to joslas" @click="selectGroup(2)">
      <BasicViewer asset="frog"
        :camera-position="{ x: 60.11466692319426, y: 118.24839386147517, z: -37.417388280344674 }"
        :camera-target="{ x: 13.317509842977977, y: 7.7212291813095755, z: -4.649666125992658 }"
        :activate="groupActive" />
    </NavGroupTile>
  </div>
  <div v-show="selectedNavGroup !== null">
    <TilesView :config="{
      fish: configFish,
      frog: configFrog,
      bird: configBird,
      lizard: configLizard,
      jackal: configJackal,
    }" :animate="false" />
  </div>
</template>

<script setup lang="ts">
import TilesView from "@src/components/TilesView.vue";
import BasicViewer from "@src/components/BasicViewer.vue";
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

const { setSelectedNavTile, shouldShowNavGroup, selectedNavGroup } = useNavigationState();

function selectGroup(group: number) {
  selectedNavGroup.value = group;
  setSelectedNavTile(null);
}

shouldShowNavGroup.value = true;
selectedNavGroup.value = null;

const configFrog = computed(() => (selectedNavGroup.value === 1) ? configFrog1 : configFrog2);
const configJackal = computed(() => (selectedNavGroup.value === 1) ? configJackal1 : configJackal2);
const configFish = computed(() => (selectedNavGroup.value === 1) ? configFish1 : configFish2);
const configBird = computed(() => (selectedNavGroup.value === 1) ? configBird1 : configBird2);
const configLizard = computed(() => (selectedNavGroup.value === 1) ? configLizard1 : configLizard2);

const groupActive = computed(() => selectedNavGroup.value === null);

</script>

<style scoped lang="scss"></style>
