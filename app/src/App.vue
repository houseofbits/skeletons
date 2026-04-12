<template>
  <div v-if="ScenePreloadService.ready.value" class="relative content-1080p">
    <!-- <RouterView />  -->
    <component v-if="currentComponent" :is="currentComponent" />
    <NavBar />
  </div>
  <div v-else class="relative content-1080p">
    <p class="loader-title">
      Skeletal Anatomy ({{ currentRouteName }}) {{ pkg.version }}
    </p>

    <p class="loader-progress">{{ ScenePreloadService.progress }}%</p>

    <div class="log-window" ref="terminal">
      <div v-for="(line, i) in ScenePreloadService.logs.value" :key="i">
        {{ line }}
      </div>
    </div>
  </div>
  <div class="relative rows">
    <div>
      <a href="index.html?screen1" class="btn btn-primary mr">Mugurkauls</a>
      <a href="index.html?screen2" class="btn btn-primary mr">Galvaskauss</a>
      <a href="index.html?screen3" class="btn btn-primary mr">Ribas un ekstremitātes</a>
      <!-- <a href="animation" class="btn btn-primary mr">Animation test</a> -->

      <div class="btn btn-secondary mr" @click="language.selectLanguage(Language.LV)">
        LV
      </div>
      <div class="btn btn-secondary mr" @click="language.selectLanguage(Language.EN)">
        EN
      </div>
    </div>
    <!-- <div v-if="isDev"> -->
    <div>
      <a href="index.html?animation" class="btn btn-primary mr">Model preview</a>
      <a href="index.html?clips" class="btn btn-primary mr">Animation clips</a>
    </div>
    <div>
      <div @click="reloadTranslations" class="btn btn-primary mr">Reload translations</div>
    </div>    
  </div>
</template>

<script setup lang="ts">
import TimeoutService from "@src/services/TimeoutService";
import { onMounted, type Component, ref, markRaw, watch, nextTick } from "vue";
import { useLanguage } from "@src/composables/Language";
import { Language } from "@src/services/TranslationsService";
import NavBar from "@src/components/NavBar.vue";
import ScenePreloadService, {
  type Models,
} from "@src/services/ScenePreloadService";
import pkg from "../../package.json";
import { useNavigationState } from "@src/composables/NavigationState";
import Screen1Assets from "@src/helpers/Screen1Assets";
import Screen2Assets from "@src/helpers/Screen2Assets";
import Screen3Assets from "@src/helpers/Screen3Assets";
import AnimationTestAssets from "@src/helpers/AnimationTestAssets";
import AnimationClipsAssets from "@src/helpers/AnimationClipsAssets";
import Screen1 from "@src/views/Screen1.vue";
import Screen2 from "@src/views/Screen2.vue";
import Screen3 from "@src/views/Screen3.vue";
import AnimationTest from "@src/views/AnimationTest.vue";
import AnimationClips from "@src/views/AnimationClips.vue";

// const isDev = import.meta.env.DEV

const { resetNavigationState } = useNavigationState();

const language = useLanguage();
const currentComponent = ref<Component | null>(null);
const currentRouteName = ref<string | null>(null);
const terminal = ref<null | HTMLElement>(null);

interface ViewDef {
  name: string;
  assets: Models;
  view: Component;
}

const routeAssets: Record<string, ViewDef> = {
  screen1: {
    name: "Mugurkauls",
    assets: Screen1Assets,
    view: Screen1,
  },
  screen2: {
    name: "Galvaskauss",
    assets: Screen2Assets,
    view: Screen2,
  },
  screen3: {
    name: "Ribas un ekstremitātes",
    assets: Screen3Assets,
    view: Screen3,
  },
  animation: {
    name: "Animation",
    assets: AnimationTestAssets,
    view: AnimationTest,
  },
  clips: {
    name: "Clips",
    assets: AnimationClipsAssets,
    view: AnimationClips,
  },
};

const getViewDef = (url: string) => {
  const name = Object.keys(routeAssets).find((key) => url.includes(key));
  return name ? routeAssets[name] : undefined;
};

async function reloadTranslations() {
  await language.reloadTranslations();
}

onMounted(async () => {
  const viewDef = getViewDef(window.location.href);
  currentRouteName.value = viewDef?.name ?? null;
  const assets = viewDef?.assets ?? [];
  if (viewDef?.view) {
    currentComponent.value = markRaw(viewDef?.view);
  }

  ScenePreloadService.preloadAssets(assets);

  TimeoutService.registerCallback((timeout: boolean) => {
    if (timeout) {
      resetNavigationState();
    }
  });

  language
    .loadTranslations([
      "translations/common.json",
      "translations/screen1.json",
      "translations/screen2.json",
      "translations/screen3.json",
    ])
    .then(() => {
      console.log("Translations loaded");
    })
    .catch((e: Error) => {
      console.error("Failed to load translations:", e.message);
    });
});

watch(
  () => ScenePreloadService.logs.value,
  async () => {
    await nextTick();
    if (terminal.value) {
      terminal.value.scrollTop = terminal.value.scrollHeight;
    }
  },
  { deep: true }
);
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
  position: absolute;
  top: 120px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  color: rgb(255, 255, 255);
  padding: 8px;
  font-family: monospace;
  font-size: 12px;
  border-radius: 4px;
}

.rows {
  display: flex;
  flex-direction: column;
}
</style>