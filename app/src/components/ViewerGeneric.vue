<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>
  <!-- <div class="btn btn-primary btn-play" @click="play">Play</div> -->
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "../services/ScenePreloadService";
import { useRenderer3D } from "../composables/Renderer3D";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  model: { type: String, required: true },
});

const originalBoneMaterialColor = 14997948;
const container = ref(null);
let render3d, mixer;

function logCamera() {
  console.log("Camera position: ", render3d.camera.position);
  console.log("Camera target: ", render3d.controls.target);
  // console.log(render3d.camera);
}

onMounted(() => {
  render3d = initRenderer3D(container.value, true);
  
  render3d.camera.position.set(128.68624793019552, 27.206282993959626, 14.222991132157553);
  render3d.controls.target.set(0, 0, 0);

  render3d.camera.fov = 25;
  render3d.controls.update();

  const catFallScene = ScenePreloadService.getAsset('animation-preview-scene');
  render3d.scene.add(catFallScene.clone());

  render3d.scene.traverse((child) => {
    if (child.isLight) {
      child.intensity = child.intensity * 600;
      child.shadow.mapSize.width = 2048;
      child.shadow.mapSize.height = 2048;
    }
  });

  const model = ScenePreloadService.getAsset(props.model);
  model.name = 'Group';
  render3d.scene.add(model);

  const material = new THREE.MeshStandardMaterial({color: 0xff0000});
  material.color = new THREE.Color(originalBoneMaterialColor);

  render3d.scene.traverse((child) => {
    if (child.isLight) {
      child.shadow.normalBias = 0.05;
      child.shadow.bias = -0.00002;
    }
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
    }
  });

  const light = new THREE.AmbientLight(new THREE.Color(0.25, 0.25, 0.2));
  light.intensity = 1;
  render3d.scene.add(light);

  const animatedModel = render3d.scene.getObjectByName('Group');
  if (animatedModel && animatedModel.animations?.length > 0) {
    const clips = animatedModel.animations;
    mixer = new THREE.AnimationMixer(animatedModel)
    mixer.timeScale = 1.0;//0.2;

    const action = mixer.clipAction(clips[0]);
    action.time = 0;//200 / 30;
    action.play();
  }

  render3d.render((delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  onBeforeUnmount(render3d.dispose);
});

function play() {
  const animatedModel = render3d.scene.getObjectByName('Group');
  if (animatedModel && animatedModel.animations?.length > 0) {
    const clips = animatedModel.animations;
    mixer = new THREE.AnimationMixer(animatedModel)
    mixer.timeScale = 1.0;

    const action = mixer.clipAction(clips[0]);
    action.time = 0;//200 / 30;
    action.play();
  }
}

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

.btn-play {
  position: absolute;
  top: 120px;
  left: 20px;
}
</style>
