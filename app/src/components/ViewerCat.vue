<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "../services/ScenePreloadService";
import { useRenderer3D } from "../composables/Renderer3D";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: false },
});

const container = ref(null);
let render3d, mixer;

function logCamera() {
  console.log("Camera position: ", render3d.camera.position);
  console.log("Camera target: ", render3d.controls.target);
  console.log(render3d.camera);
}

onMounted(() => {
  render3d = initRenderer3D(container.value);

  render3d.camera.position.set(76.64059891042186, 33.98536526016632, 18.017461834739485);
  render3d.controls.target.set(7.526513403769392, 17.705962494108352, 7.4957053875706405);
  render3d.controls.update();

  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2)); // soft white light
  light.intensity = 3;
  render3d.scene.add(light);

  const catFall = ScenePreloadService.getAsset('catFall');
  render3d.scene.add(catFall);

  render3d.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }

    if (child.isLight) {
      // child.intensity = child.intensity * 800;
    }
  });

  console.log(render3d.scene);

  const animatedModel = render3d.scene.getObjectByName('Group');
  if (animatedModel && animatedModel.animations?.length > 0) {
    console.log(animatedModel);
    const clips = animatedModel.animations;
    mixer = new THREE.AnimationMixer(animatedModel)
    mixer.timeScale = 1.0;//0.2;

    const action = mixer.clipAction(clips[0]);
    action.time = 200 / 30;
    action.play();
  }

  render3d.render((delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

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
