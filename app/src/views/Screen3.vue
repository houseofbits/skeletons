<template>
  <div v-show="selectedNavGroup === null">
    <GroupView :is-visible="selectedNavGroup === null" />
  </div>
  <div class="multi-tiles" v-show="selectedNavGroup === 1">
    <TilesView :config="[
      configFish1,
      configFrog1,
      configLizard1,
      configBird1,
      configJackal1,
    ]" :animate="true" :is-visible="selectedNavGroup === 1" />
  </div>
  <div class="multi-tiles" v-show="selectedNavGroup === 2">
    <TilesView :config="[
      configFish2,
      configFrog2,
      configLizard2,
      configBird2,
      configJackal2,
    ]" :animate="true" :is-visible="selectedNavGroup === 2" />
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

const { shouldShowNavGroup, selectedNavGroup } = useNavigationState();

shouldShowNavGroup.value = true;
selectedNavGroup.value = null;

</script>

<style scoped lang="scss">
.multi-tiles {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 0;
  left: 0;
}
</style>
