<template>
  <h1>Screen 1</h1>

  <div class="test">
    <div class="test2">{{ translate('hello') }}</div>
  </div>

</template>

<script setup lang="ts">
import { useLanguage } from "@src/composables/Language";

const { translate } = useLanguage();

</script>

<style scoped lang="scss"></style>
