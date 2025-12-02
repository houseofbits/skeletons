<template>
  <div class="callout" :style="outerStyle">
    <div class="line-segment">
      <div class="line-segment-horizontal">{{ text }}</div>
    </div>
    <div class="circle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  position: { type: Object, default: { x: 0, y: 0 } },
});
const outerStyle = computed(() => {
    return {
        left: props.position.x + 'px',
        top: props.position.y + 'px',
    };
});

</script>

<style lang="scss" scoped>
.callout {
  position: absolute;
  margin-left:-15px;
  margin-top:-15px;
  top: 200px;
  left: 200px;
  width: 30px;
  height: 30px;
  // border: solid 1px blue;

  & .circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #ccc;
    border-radius: 15px;
    background-color: #965c5c;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: 15px 15px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }

  & .line-segment {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.9);
    transform-origin: left center;
    transform: translateX(15px) translateY(15px) rotate(15deg);

    & .line-segment-horizontal {
      position: absolute;
      display: flex;
      width: auto;
      height: 30px;
      // border: solid 1px red;
      transform-origin: left center;
      color: white;
      font-size: 24px;
      flex-wrap: nowrap;
      white-space: nowrap;
      transform: translateX(155px) translateY(-15px) rotate(-15deg);
    }
  }
}
</style>