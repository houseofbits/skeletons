<template>
  <div>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
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
import { boneMaterial, boneHilightMaterial } from "@src/helpers/Materials";
import { useCameraController } from "@src/composables/CameraController";
import RotationIcon from "@src/components/RotationIcon.vue";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true },
});

const isRotationIconActive = ref(true);
const originalBoneMaterialColor = 14997948;
const container = ref(null);
let render3d, mixer, cameraController;

function logCamera() {
  console.log("Camera position: ", cameraController.camera.position);
  console.log("Camera target: ", cameraController.controls.target);
  // console.log(render3d.camera);
}

watch(
  () => props.isVisible,
  (val) => {
    if (val) {
      render3d.startRendering(container.value, cameraController);
    } else {
      render3d.stopRendering();
    }
  },
);

watch(() => props.isActive, (newVal) => {
  if (newVal) {
    isRotationIconActive.value = true;
  }
}, { immediate: true });

onMounted(() => {
  cameraController = useCameraController('turtle-camera', container.value, false);
  render3d = initRenderer3D();
  if (props.isVisible) {
    render3d.startRendering(container.value, cameraController);
  }

  cameraController.camera.position.set(-19.13895791474941, 5.897375353041317, 17.480325897246452);
  cameraController.controls.target.set(-0.5377894660426883, 3.1000084719021634, -1.1412397384959674);

  cameraController.camera.fov = 25;
  cameraController.controls.update();

  const catFallScene = ScenePreloadService.getAsset('sharkScene').clone();
  render3d.scene.add(catFallScene);

  const model = ScenePreloadService.getAsset('sharkJaw');
  model.name = 'Group';

  const pivotRotation = usePivotRotation(container.value);
  pivotRotation.setOnRotationCallback(() => {
    isRotationIconActive.value = false;
  }); 
  pivotRotation.setEnabled(true);
  pivotRotation.setLimits(-3.79, 2.046);
  pivotRotation.pivot.add(model);
  render3d.scene.add(pivotRotation.pivot);

  render3d.scene.traverse((child) => {
    if (child.isLight) {
      child.castShadow = true;
      child.shadow.normalBias = 0.01;
      child.shadow.bias = -0.0001;
      child.shadow.mapSize.width = 2048;
      child.shadow.mapSize.height = 2048;
    }
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      if (child.material.name === 'bone_MAT.001') {
        child.material = boneMaterial;
      }

      if (child.material.name === 'selection_MAT.001') {
        child.material = boneHilightMaterial;
      }      
    }
  });

  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.1));
  light.intensity = 3;
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

  render3d.registerRenderCallback((delta) => {
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
