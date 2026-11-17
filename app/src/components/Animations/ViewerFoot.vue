<template>
  <div>
    <viewer-foot-part
    :isActive="props.isActive"
    :isVisible="props.isVisible"
      model="bearLeg"
      scene="bearLegScene"    
      ></viewer-foot-part>
  </div>

  <RotationIcon :is-active="isRotationIconActive" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "@src/services/ScenePreloadService";
import { useRenderer3D } from "@src/composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";
import { useCameraController } from "@src/composables/CameraController";
import RotationIcon from "@src/components/RotationIcon.vue";
import ViewerFootPart from "@src/components/Animations/components/ViewerFootPart.vue";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true },
});

onMounted(() => {

});
</script>

<style>
.fbx-viewer {
  width: 100%;
  height: 100%;
  display: block;
  background: #000;
}

.fbx-viewer canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
