<template>
  <div ref="container" class="limbs-parts-viewer" @click="logCamera">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import ScenePreloadService from "@src/services/ScenePreloadService";
import { useRenderer3D } from "@src/composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";
import { useCameraController } from "@src/composables/CameraController";
import { boneMaterial, boneHilightMaterial } from "@src/helpers/Materials";
import gsap from "gsap";
import { transitionMaterial } from "@src/utils/transitions.ts";

const { initRenderer3D } = useRenderer3D();

const hilightBoneNames = ["part1", "part2", "part3", "part4", "part5", "part6"];

let pivot = null;

const props = defineProps({
  isVisible: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
  scene: { type: String, required: true },
  cameraPos: { type: Object, required: true },
  cameraTarget: { type: Object, required: true },
  hilightBoneIndex: { type: Number, default: null },
});

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

watch(
  () => props.hilightBoneIndex,
  (value, prevValue) => {
    if (prevValue >= 0 && prevValue < 6) {
      const obj = render3d.scene.getObjectByName(hilightBoneNames[prevValue]);
      if (obj) {
        transitionMaterial(obj.material, boneMaterial, 1);
      }
    }

    if (value >= 0 && value < 6) {
      const obj = render3d.scene.getObjectByName(hilightBoneNames[value]);
      if (obj) {
        transitionMaterial(obj.material, boneHilightMaterial, 1);
      }
    }
  }
);

const container = ref(null);
let render3d, mixer, cameraController;
let pivotRotation = null;

function logCamera() {
  // console.log("Camera position: ", cameraController.camera.position);
  // console.log("Camera target: ", cameraController.controls.target);
  // console.log(cameraController.camera);
}

function initModelMaterials(model) {
  for (const name of hilightBoneNames) {
    const obj = model.getObjectByName(name);
    if (obj) {
      obj.material = boneMaterial.clone();
    }
  }
}

function rotateToNormal() {
  gsap.to(pivotRotation.pivot.rotation, {
    y: 0,
    duration: 4,
    ease: "power2.out"
  });
}

watch(
  () => props.isActive,
  (val) => {
    pivotRotation.setEnabled(val);
    if (!val) {
      rotateToNormal();
    }
  }
);

watch(
  () => props.cameraPos,
  (pos) => {
    // render3d.camera.position.set(pos.x, pos.y, pos.z);
    // render3d.controls.update();

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
  }
);

watch(
  () => props.cameraTarget,
  (pos) => {
    // render3d.controls.target.set(pos.x, pos.y, pos.z);

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
  }
);

function initPivot() {
  const model = render3d.scene.getObjectByName("model");
  if (model == undefined) {
    return;
  }

  pivotRotation = usePivotRotation(container.value);

  pivotRotation.pivot.add(model);
  render3d.scene.add(pivotRotation.pivot);
  pivot = pivotRotation.pivot;

  pivotRotation.setEnabled(false);
}

onMounted(() => {
  cameraController = useCameraController('limbs-part-viewer-camera', container.value, false);
  render3d = initRenderer3D();
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

  const scene = ScenePreloadService.getAsset(props.scene)?.clone();
  if (scene === null) {
    return;
  }
  render3d.scene.add(scene);

  initModelMaterials(render3d.scene);

  render3d.scene.traverse((child) => {
    if (child.isLight) {
      child.shadow.normalBias = 0.05;
      child.shadow.bias = -0.00002;
      child.shadow.mapSize.width = 2048;
      child.shadow.mapSize.height = 2048;
      child.castShadow = true;
    }
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
    }
  });

  initPivot();

  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.1));
  light.intensity = 2;
  render3d.scene.add(light);

  render3d.registerRenderCallback((delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  onBeforeUnmount(render3d.dispose);
});
</script>

<style lang="scss">
.limbs-parts-viewer {
  display: block;
  background: #000;
}

.limbs-parts-viewer canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>