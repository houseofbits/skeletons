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
import { tweenColor, transitionCamera } from "@src/utils/transitions";

const props = defineProps({
  asset: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  config: {
    type: Object,
    required: true,
  }
});

const originalBoneMaterialColor = 14997948;

const container = ref(null);
let render3d;

const { initRenderer3D } = useRenderer3D();

function logCamera() {
  console.log("Camera position: ", render3d.camera.position);
  console.log("Camera target: ", render3d.controls.target);
  console.log("Camera fov: ", render3d.camera.fov);
}

function setIconCameraPosition() {
  const duration = 0.6;
  transitionCamera(
    render3d.controls,
    props.config.iconPos,
    props.config.iconTarget,
    duration,
    "power2.out"
  );
}

function setInitialCameraPosition() {
  const duration = 0.8;
  transitionCamera(
    render3d.controls,
    props.config.initialPos,
    props.config.initialTarget,
    duration,
    "power2.out"
  );
}

function hilightBoneMeshes() {
  if (props.config.activeBones.length > 0) {
    for (const boneConfig of props.config.activeBones) {
      for (const meshName of boneConfig.meshNames) {
        const mesh = render3d.scene.getObjectByName(meshName);
        tweenColor(mesh, boneConfig.materialColor, 0.5);
      }
    }
  }
}

function resetHilightedBoneMeshes() {
  if (props.config.activeBones.length > 0) {
    for (const boneConfig of props.config.activeBones) {
      for (const meshName of boneConfig.meshNames) {
        const mesh = render3d.scene.getObjectByName(meshName);
        tweenColor(mesh, originalBoneMaterialColor, 0.7);
      }
    }
  }
}

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      setInitialCameraPosition();
      hilightBoneMeshes();
      // console.log(render3d.scene);
    } else {
      setIconCameraPosition();
      resetHilightedBoneMeshes();
    }
  }
);

function prepareMeshMaterials() {
  if (props.config.activeBones.length > 0) {
    for (const boneConfig of props.config.activeBones) {
      for (const meshName of boneConfig.meshNames) {
        const mesh = render3d.scene.getObjectByName(meshName);
        if (mesh && mesh.material) {
          const material = mesh.material.clone();
          mesh.material = material;
        }
      }
    }
  }
}

onMounted(() => {
  render3d = initRenderer3D(container.value);

  const fishScene = ScenePreloadService.getAsset(props.asset);
  render3d.scene.add(fishScene.clone());

  render3d.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }

    if (child.isLight) {
      child.intensity = child.intensity * 800;
    }
  });
  
  prepareMeshMaterials();
  setIconCameraPosition();

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
