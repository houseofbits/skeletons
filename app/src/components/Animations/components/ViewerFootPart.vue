<template>
  <div>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "@src/services/ScenePreloadService";
import { useRenderer3D } from "@src/composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";
import { boneMaterial, boneHilightMaterial, boneDarkMaterial } from "@src/helpers/Materials";
import { useCameraController } from "@src/composables/CameraController";
import gsap from "gsap";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true },
  model: { type: String, reqquired: true },
  scene: { type: String, reqquired: true },
  cameraPos: { type: Object, required: true },
  cameraTarget: { type: Object, required: true },
  isPlaying: { type: Boolean, default: false },
});

const emit = defineEmits(["pivot-rotation"]);

const CAMERA_REPOS_ENABLED = false; // Set to true to enable camera repositioning and disable pivot rotation

const originalBoneMaterialColor = 14997948;
const container = ref(null);
let render3d, mixer, cameraController;
let darkMaterial = boneDarkMaterial.clone();
let isStopping = false;
let action = null;

let targetTimeScale = 0
const fadeSpeed = 1.5 // timescale units per second

let targetOpacity = 1;

watch(
  () => props.isPlaying,
  (value) => {
    if (!action) return;

    targetTimeScale = value ? 1 : 0
    targetOpacity = value ? 0.1 : 1
  }
);

watch(
  () => props.cameraPos,
  (pos) => {
    if (CAMERA_REPOS_ENABLED) {
      return;
    }

    gsap.to(cameraController.camera.position, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        cameraController.controls.update();
      },
    });
  },
  {deep: true}
);

watch(
  () => props.cameraTarget,
  (pos) => {
    if (CAMERA_REPOS_ENABLED) {
      return;
    }

    gsap.to(cameraController.controls.target, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        cameraController.controls.update();
      },
    });
  },
  {deep: true}
);

function logCamera() {
  if (CAMERA_REPOS_ENABLED) {
    console.log("Camera position: ", cameraController.camera.position);
    console.log("Camera target: ", cameraController.controls.target);
  }
}

watch(
  () => props.isVisible,
  (val) => {
    if (val) {
      render3d.startRendering(container.value, cameraController);
    } else {
      render3d.stopRendering();
    }
  }
);

watch(
  () => props.isActive,
  (newVal) => {

  },
  { immediate: true }
);

onMounted(() => {
  cameraController = useCameraController(
    "turtle-camera",
    container.value,
    CAMERA_REPOS_ENABLED
  );
  render3d = initRenderer3D();

  render3d.registerRenderCallback((delta) => {
    if (mixer) {
      mixer.update(delta);

        action.timeScale = THREE.MathUtils.damp(
          action.timeScale,
          targetTimeScale,
          fadeSpeed,
          delta
        )
        
        darkMaterial.opacity = THREE.MathUtils.damp(
          darkMaterial.opacity,
          targetOpacity,
          fadeSpeed,
          delta
        )
    }
  });

  if (props.isVisible) {
    render3d.startRendering(container.value, cameraController);
  }

  cameraController.camera.position.set(
    props.cameraPos.x,
    props.cameraPos.y,
    props.cameraPos.z
  );
  cameraController.controls.target.set(
    props.cameraTarget.x,
    props.cameraTarget.y,
    props.cameraTarget.z
  );

  cameraController.camera.fov = 25;
  cameraController.controls.update();

  const catFallScene = ScenePreloadService.getAsset(props.scene).clone();
  render3d.scene.add(catFallScene);

  const model = ScenePreloadService.getAsset(props.model);
  model.name = "Group";

  const pivotRotation = usePivotRotation(container.value);
  pivotRotation.setOnRotationCallback(() => {
    emit("pivot-rotation");
  });
  pivotRotation.setEnabled(!CAMERA_REPOS_ENABLED);
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

      if (child.material.name === "bone_MAT") {
        child.material = boneMaterial;
      }

      if (child.material.name === "Material.dark") {
        child.material = darkMaterial;
        darkMaterial.transparent = true;
        darkMaterial.opacity = 0.2;
      }
    }
  });

  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.1));
  light.intensity = 3;
  render3d.scene.add(light);

  const animatedModel = render3d.scene.getObjectByName("Group");
  if (animatedModel && animatedModel.animations?.length > 0) {
    const clips = animatedModel.animations;
    mixer = new THREE.AnimationMixer(animatedModel);
    mixer.timeScale = 0.7;//1.0; //0.2;

    action = mixer.clipAction(clips[0]);

    action.time = 0;
    action.play();
  }

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
