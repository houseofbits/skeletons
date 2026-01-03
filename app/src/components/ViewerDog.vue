<template>
  <div>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
    <div class="btn btn-primary btn-play" @click="play">Play</div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "../services/ScenePreloadService";
import { useRenderer3D } from "../composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: false },
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
  render3d = initRenderer3D(container.value, false);

  render3d.camera.position.set(154.0305698377881, 36.749830464126774, 36.512778766792984);
  render3d.controls.target.set(6.201491736114454, 18.123757394595394, 9.642520475540605);

  render3d.camera.fov = 25;
  render3d.controls.update();

  const catFallScene = ScenePreloadService.getAsset('catFallScene').clone();
  render3d.scene.add(catFallScene);

  const model = ScenePreloadService.getAsset('dogBreathing');
  model.name = 'Group';

  const pivotRotation = usePivotRotation(render3d.renderer.domElement);
  pivotRotation.pivot.add(model);
  render3d.scene.add(pivotRotation.pivot);

  const boneMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0.7758223476257268, 0.6938718871722084, 0.5028864818811943),
    shininess: 32,
    specular: new THREE.Color(0.06743726399864605, 0.06743726399864605, 0.06743726399864605),
    reflectivity: 1,
    name: 'boneMaterial',
  });

  const boneHilightMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color("#d98602"),
    shininess: 32,
    specular: new THREE.Color(0.06743726399864605, 0.06743726399864605, 0.06743726399864605),
    reflectivity: 1,
    name: 'hilightedMaterial',
  });  

  render3d.scene.traverse((child) => {
    if (child.isLight) {
      child.shadow.normalBias = 0.05;
      child.shadow.bias = -0.00002;
      child.intensity = child.intensity * 600;
      child.shadow.mapSize.width = 2048;
      child.shadow.mapSize.height = 2048;
    }
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      if (child.material.name === 'shader_69') {
        child.material = boneMaterial;
      }

      if (child.material.name === 'ribMat_M' || child.material.name === 'ribMat_C') {
        child.material = boneHilightMaterial;
      }      
    }
  });



  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2));
  light.intensity = 1;
  render3d.scene.add(light);
  // console.log(render3d.scene);

  const animatedModel = render3d.scene.getObjectByName('Group');
  if (animatedModel && animatedModel.animations?.length > 0) {
    // console.log(animatedModel);
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
