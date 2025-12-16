<template>
  <TilesView :config="[
    configFish,
    configFrog,
    configLizard,
    configBird,
    configJackal,
  ]" :animate="true" />
</template>

<script setup lang="ts">
import configFish from "@/src/helpers/screen1/configFish";
import configFrog from "@/src/helpers/screen1/configFrog";
import configLizard from "@/src/helpers/screen1/configLizard";
import configBird from "@/src/helpers/screen1/configBird";
import configJackal from "@/src/helpers/screen1/configJackal";
import TilesView from "@src/components/TilesView.vue";
</script>

<style scoped lang="scss"></style>
