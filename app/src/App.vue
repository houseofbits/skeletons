<template>
  <div class="relative content-1080p">
    <RouterView />
  </div>
  <div class="relative">
    <router-link to="/screen1" class="btn btn-primary mr">Screen 1</router-link>
    <router-link to="/screen2" class="btn btn-primary mr">Screen 2</router-link>
    <router-link to="/screen3" class="btn btn-primary">Screen 3</router-link>
  </div>
</template>

<script setup lang="ts">

import TimeoutService from "@src/services/TimeoutService";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

onMounted(() => {
    TimeoutService.registerCallback(() => {
        // selectLanguage('lv');
        router.push('/');
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