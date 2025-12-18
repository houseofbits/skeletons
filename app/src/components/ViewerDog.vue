<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>
  <div class="btn btn-primary btn-play" @click="play">Play</div>
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

const originalBoneMaterialColor = 14997948;
const container = ref(null);
let render3d, mixer;

function logCamera() {
  // console.log("Camera position: ", render3d.camera.position);
  // console.log("Camera target: ", render3d.controls.target);
  // console.log(render3d.camera);
}

onMounted(() => {
  render3d = initRenderer3D(container.value);
  
  render3d.camera.position.set(76.64059891042186, 33.98536526016632, 18.017461834739485);
  render3d.controls.target.set(7.526513403769392, 17.705962494108352, 7.4957053875706405);

  render3d.camera.fov = 25;
  render3d.controls.update();

  const catFallScene = ScenePreloadService.getAsset('catFallScene');
  render3d.scene.add(catFallScene);

  render3d.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      // child.material = child.material.clone();
    }

    if (child.isLight) {
      child.intensity = child.intensity * 600;
      child.shadow.mapSize.width = 2048;
      child.shadow.mapSize.height = 2048;
    }
  });

  // const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2));
  // light.intensity = 1;
  // render3d.scene.add(light);

  const model = ScenePreloadService.getAsset('dogBreathing');
  model.name = 'Group';
  render3d.scene.add(model);

  const material = new THREE.MeshStandardMaterial({color: 0xff0000});
  material.color = new THREE.Color(originalBoneMaterialColor);

  render3d.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
      // child.material = material;

      // child.geometry.computeVertexNormals();
      // child.geometry.normalizeNormals();
      // child.geometry.computeTangents();

      // child.scale.x *= -1;
      // child.geometry.computeVertexNormals();
      // child.material.side = THREE.DoubleSide; // optional
      // const geometry = child.geometry;

      // // Flip normals by multiplying by -1
      // geometry.attributes.normal.array.forEach((v, i, arr) => {
      //   arr[i] = arr[i] * -1;
      // });

      // geometry.attributes.normal.needsUpdate = true;


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
