<template>
  <div class="relative content-1080p">
    <RouterView />
    <NavBar />
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

const router = useRouter();
const language = useLanguage();

onMounted(() => {
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
</style>