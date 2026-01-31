<template>
  <div v-show="selectedNavGroup === null">
    <GroupView />
  </div>
  <div v-show="selectedNavGroup !== null">
    <TilesView :config="[
      configFish,
      configFrog,
      configLizard,
      configBird,
      configJackal,
    ]" :animate="true" />
  </div>
</template>

<script setup lang="ts">
import TilesView from "@src/components/TilesView.vue";
import GroupView from "@src/components/GroupView.vue";
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

const { shouldShowNavGroup, selectedNavGroup } = useNavigationState();

shouldShowNavGroup.value = true;
selectedNavGroup.value = null;

const configFrog = computed(() => (selectedNavGroup.value === 1) ? configFrog1 : configFrog2);
const configJackal = computed(() => (selectedNavGroup.value === 1) ? configJackal1 : configJackal2);
const configFish = computed(() => (selectedNavGroup.value === 1) ? configFish1 : configFish2);
const configBird = computed(() => (selectedNavGroup.value === 1) ? configBird1 : configBird2);
const configLizard = computed(() => (selectedNavGroup.value === 1) ? configLizard1 : configLizard2);

</script>

<style scoped lang="scss"></style>
