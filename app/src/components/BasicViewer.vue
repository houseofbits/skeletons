<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "../services/ScenePreloadService";
import { useRenderer3D } from "../composables/Renderer3D";
import { transitionCamera } from "@src/utils/transitions";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  asset: { type: String, required: true },
  cameraPosition: { type: Object, default: () => ({ x: 10, y: 0, z: 0 }) },
  cameraTarget: { type: Object, default: () => ({ x: 0, y: 0, z: 0 }) },
  activate: { type: Boolean, default: true },
});


const redraw = ref(true);
const originalBoneMaterialColor = 14997948;
const container = ref(null);
let render3d, mixer;

function logCamera() {
  console.log("Camera position: ", render3d.camera.position);
  console.log("Camera target: ", render3d.controls.target);
  console.log(render3d.camera);
}

function initCamera() {
  redraw.value = true;

  let pos = new THREE.Vector3(props.cameraPosition.x, props.cameraPosition.y, props.cameraPosition.z);
  const target = new THREE.Vector3(props.cameraTarget.x, props.cameraTarget.y, props.cameraTarget.z);

  pos = pos.lerp(target, 0.3);

  render3d.camera.position.set(pos.x, pos.y, pos.z);
  render3d.controls.target.set(props.cameraTarget.x, props.cameraTarget.y, props.cameraTarget.z);
  render3d.controls.update();

  const duration = 0.9;
  transitionCamera(
    render3d.controls,
    props.cameraPosition,
    props.cameraTarget,
    duration,
    "power2.inOut",
    () => {
      redraw.value = false;
    }
  );
}

watch(
  () => props.activate,
  (newVal) => {
    if (newVal) {
      initCamera();
    }
  }
);

onMounted(() => {
  render3d = initRenderer3D(container.value);

  const asset = ScenePreloadService.getAsset(props.asset);
  if (asset) {
    render3d.scene.add(asset.clone());
  } else {
    console.error(props.asset, "not found");
  }

  initCamera();

  render3d.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }

    if (child.isLight) {
      child.intensity = child.intensity * 400;
    }
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  render3d.scene.add(ambientLight);

  render3d.render(() => { }, redraw.value);

  onBeforeUnmount(render3d.dispose);
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
