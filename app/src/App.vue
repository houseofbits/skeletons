<template>
  <div v-if="ScenePreloadService.ready.value" class="relative content-1080p">
    <!-- <RouterView /> -->
      <component v-if="currentComponent" :is="currentComponent" />
    <NavBar />
  </div>
  <div v-else class="relative content-1080p">
    <p class="loader-title">Skeletal Anatomy ({{ currentRouteName }}) {{ pkg.version }}</p>

    <p class="loader-progress">{{ ScenePreloadService.progress }}%</p>

    <div class="log-window">
      <div v-for="(line, i) in ScenePreloadService.logs.value" :key="i">{{ line }}</div>
    </div>
  </div>
  <div class="relative">
    <a href="index.html?screen1" class="btn btn-primary mr">Mugurkauls</a>
    <a href="index.html?screen2" class="btn btn-primary mr">Galvaskauss</a>
    <a href="index.html?screen3" class="btn btn-primary mr">Ribas un ekstremitātes</a>
    <!-- <a href="animation" class="btn btn-primary mr">Animation test</a> -->

    <div class="btn btn-secondary mr" @click="language.selectLanguage(Language.LV)">LV</div>
    <div class="btn btn-secondary mr" @click="language.selectLanguage(Language.EN)">EN</div>
  </div>
</template>

<script setup lang="ts">

import TimeoutService from "@src/services/TimeoutService";
import { onMounted, type Component, ref, markRaw } from "vue";
import { useRouter } from "vue-router";
import { useLanguage } from "@src/composables/Language";
import { Language } from "@src/services/TranslationsService";
import NavBar from "@src/components/NavBar.vue";
import ScenePreloadService, { type Models } from "@src/services/ScenePreloadService";
import pkg from '../../package.json'
import { useNavigationState } from "@src/composables/NavigationState";
import Screen1Assets from "@src/helpers/Screen1Assets";
import Screen2Assets from "@src/helpers/Screen2Assets";
import Screen3Assets from "@src/helpers/Screen3Assets";
// import AnimationTestAssets from "@src/helpers/AnimationTestAssets";
import Screen1 from "@src/views/Screen1.vue";
import Screen2 from "@src/views/Screen2.vue";
import Screen3 from "@src/views/Screen3.vue";

const { resetNavigationState } = useNavigationState();

const router = useRouter();
const language = useLanguage();
const currentComponent = ref<Component|null>(null);
const currentRouteName = ref<string|null>(null);

interface ViewDef {
  name: string
  assets: Models;
  view: Component;
};

const routeAssets: Record<string, ViewDef> = {
  'screen1': {
    name: "Mugurkauls",
    assets: Screen1Assets,
    view: Screen1,
  },
  'screen2': {
    name: "Galvaskauss",
    assets: Screen2Assets,
    view: Screen2,
  },
  'screen3': {
    name: "Ribas un ekstremitātes",
    assets: Screen3Assets,
    view: Screen3,
  }
  // 'animation': AnimationTestAssets,
};

const getViewDef = (url: string) => {
  const name = Object.keys(routeAssets).find(key => url.includes(key));
  return name ? routeAssets[name] : undefined;
};

onMounted(async () => {
  await router.isReady();
  const viewDef = getViewDef(router.currentRoute.value.fullPath);
  currentRouteName.value = viewDef?.name ?? null;
  const assets = viewDef?.assets ?? [];
  if (viewDef?.view) {
    currentComponent.value = markRaw(viewDef?.view);
  }

  ScenePreloadService.preloadAssets(assets);

  TimeoutService.registerCallback(() => {
    // selectLanguage('lv');
    // router.push('/');
    resetNavigationState();
  });

  language.loadTranslations([
    'translations/common.json',
  ]).then(() => {
    console.log('Translations loaded');
  }).catch((e: Error) => {
    console.error('Failed to load translations:', e.message);
  });
});
</script>

<style scoped>
.mr {
  margin-right: 8px;
}

.btn {
  margin-top: 8px;
}

.loader-title {
  font-size: 24px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  margin-left: 8px;
  margin-top: 24px;
}

.loader-progress {
  font-size: 18px;
  color: rgb(255, 255, 255);
  margin-left: 8px;
  margin-top: 8px;
}

.log-window {
  overflow-y: auto;
  color: rgb(255, 255, 255);
  padding: 8px;
  font-family: monospace;
  font-size: 12px;
  border-radius: 4px;
}
</style>