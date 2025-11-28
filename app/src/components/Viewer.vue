<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>
</template>

<script setup>
import gsap from "gsap";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "../services/ScenePreloadService";
import { useRenderer3D } from "../composables/Renderer3D";

const props = defineProps({
  asset: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  cameraConfig: {
    type: Object,
    required: true,
  }
});

const container = ref(null);
let render3d;
let activeCamera = null;

const { initRenderer3D } = useRenderer3D();

function logCamera() {
  console.log("Camera position: ", render3d.camera.position);
  console.log("Camera target: ", render3d.controls.target);
  console.log("Camera fov: ", render3d.camera.fov);
}

function setIconCameraPosition() {
  const duration = 0.6;
  gsap.timeline()
    .to(render3d.controls.target, {
      duration: duration,
      x: props.cameraConfig.iconTarget.x,
      y: props.cameraConfig.iconTarget.y,
      z: props.cameraConfig.iconTarget.z,
      ease: "power2.out",
      onUpdate: () => render3d.controls.update()
    })
    .to(render3d.camera.position, {
      duration: duration,
      x: props.cameraConfig.iconPos.x,
      y: props.cameraConfig.iconPos.y,
      z: props.cameraConfig.iconPos.z,
      ease: "power2.out",
      onUpdate: () => render3d.controls.update()
    }, "<"); // "<" = run at same tie  
}

function setInitialCameraPosition() {
  const duration = 0.8;
  gsap.timeline()
    .to(render3d.controls.target, {
      duration: duration,
      x: props.cameraConfig.initialTarget.x,
      y: props.cameraConfig.initialTarget.y,
      z: props.cameraConfig.initialTarget.z,
      ease: "power2.out",
      onUpdate: () => render3d.controls.update()
    })
    .to(render3d.camera.position, {
      duration: duration,
      x: props.cameraConfig.initialPos.x,
      y: props.cameraConfig.initialPos.y,
      z: props.cameraConfig.initialPos.z,
      ease: "power2.out",
      onUpdate: () => render3d.controls.update()
    }, "<"); // "<" = run at same tie
}

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      setInitialCameraPosition();
    } else {
      setIconCameraPosition();
    }
  }
);

onMounted(() => {
  render3d = initRenderer3D(container.value);

  activeCamera = render3d.camera;

  setIconCameraPosition();

  const fishScene = ScenePreloadService.getAsset(props.asset);

  render3d.scene.add(fishScene.clone());

  render3d.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true; // optional
    }

    if (child.isLight) {
      child.intensity = child.intensity * 800;
    }
  });

  // Handle resize
  const onResize = () => {
    const w = container.value.clientWidth;
    const h = container.value.clientHeight;
    render3d.renderer.setSize(w, h);
    activeCamera.aspect = w / h;
    activeCamera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize);

  render3d.render();

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
