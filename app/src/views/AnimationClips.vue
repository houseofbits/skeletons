<template>
  <template v-for="(comp, index) in comps" :key="index">
    <component :is="comp" v-show="selectedCompIndex === index" />
  </template>

  <ul class="animation-list">
    <li @click="selectedCompIndex = 0">Bird breastbones</li>
    <li @click="selectedCompIndex = 1">Cat fall</li>
    <li @click="selectedCompIndex = 2">Dog panting</li>
  </ul>
</template>

<script setup lang="ts">
import ViewerCat from "@src/components/Animations/ViewerCat.vue";
import ViewerDog from "@src/components/Animations/ViewerDog.vue";
import ViewerBirds from "@src/components/Animations/ViewerBirds.vue";
import { ref } from "vue";

const comps = [
  ViewerBirds,
  ViewerCat,
  ViewerDog,
];

const selectedCompIndex = ref(0);

</script>

<style scoped lang="scss">
.animation-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
  position: absolute;
  top: 35px;
  right: 900px;
  display: flex;
  z-index: 1000;
  li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);

    &:hover {
      color: rgba(255, 255, 255, 1);
      text-decoration: underline;
    }
  }
}
</style>
