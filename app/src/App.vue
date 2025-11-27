<template>
  <div v-if="ScenePreloadService.ready.value" class="relative content-1080p">
    <RouterView />
    <NavBar />
  </div>
  <div v-else class="relative content-1080p">
   <p class="loader-title">Skeletal Anatomy v{{ pkg.version }}</p>

    <p class="loader-progress">{{ ScenePreloadService.progress }}%</p>

    <div class="log-window">
      <div v-for="(line, i) in ScenePreloadService.logs.value" :key="i">{{ line }}</div>
    </div>
  </div>
  <div class="relative">
    <router-link to="/screen1" class="btn btn-primary mr">Screen 1</router-link>
    <router-link to="/screen2" class="btn btn-primary mr">Screen 2</router-link>
    <router-link to="/screen3" class="btn btn-primary mr">Screen 3</router-link>

    <div class="btn btn-primary mr" @click="language.selectLanguage(Language.LV)">LV</div>
    <div class="btn btn-primary mr" @click="language.selectLanguage(Language.EN)">EN</div>
  </div>
</template>

<script setup lang="ts">

import TimeoutService from "@src/services/TimeoutService";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useLanguage } from "@src/composables/Language";
import { Language } from "@src/services/TranslationsService";
import NavBar from "@src/components/NavBar.vue";
import ScenePreloadService from "@src/services/ScenePreloadService";
import pkg from '../../package.json'

const router = useRouter();
const language = useLanguage();

onMounted(() => {
  ScenePreloadService.preloadAssets();

  TimeoutService.registerCallback(() => {
    // selectLanguage('lv');
    router.push('/');
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