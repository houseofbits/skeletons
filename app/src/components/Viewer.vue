<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>

  <Sidebar v-if="showActivePoints" :selected="selectedActivePoint" :active-points="props.config.activePoints"
    @select="(i) => (selectedActivePoint = i)" />
</template>

<script setup>
import gsap from "gsap";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "@src/services/ScenePreloadService";
import { useRenderer3D } from "@src/composables/Renderer3D";
import Sidebar from "@src/components/Sidebar.vue";
import { tweenColor, transitionCamera } from "@src/utils/transitions";
import { toScreenPosition } from "@src/utils/utils3d";
import usePivotRotation from "@src/composables/PivotRotation";

const props = defineProps({
  asset: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  config: {
    type: Object,
    required: true,
  },
  cameraConfig: {
    type: Object,
    required: true,
  }
});

const originalBoneMaterialColor = 14997948;
const hilightedBoneMaterialColor = "#d98602";

const container = ref(null);
let render3d;
const activePointPositions = ref([]);
const showActivePoints = ref(false);
const selectedActivePoint = ref(-1);
let showActivePointsTimeout = null;
let pivot = null;

const { initRenderer3D } = useRenderer3D();

function logCamera() {
  // console.log("Camera position: ", render3d.camera.position);
  // console.log("Camera target: ", render3d.controls.target);
}

watch(() => props.cameraConfig, (cameraConf) => {
  transitionCamera(
    render3d.controls,
    cameraConf.position,
    cameraConf.target,
    cameraConf.transitionTime,
    "power2.inOut",
  );
});

watch(() => props.iconCameraConfigType, (value) => {
  if (props.isActive) {
    return;
  }

  setIconCameraPosition();
});

function hilightBoneMeshes() {
  if (props.config.activePoints.length === 0) {
    return;
  }

  if (selectedActivePoint.value < 0) {
    return;
  }

  let i = 0;
  for (const activePoint of props.config.activePoints) {
    const color =
      selectedActivePoint.value === i
        ? hilightedBoneMaterialColor
        : originalBoneMaterialColor;
    for (const meshName of activePoint.meshes) {
      const mesh = render3d.scene.getObjectByName(meshName);
      tweenColor(mesh, color, 0.7);
    }
    i++;
  }
}

function resetHilightedBoneMeshes() {
  for (const activePoint of props.config.activePoints) {
    for (const meshName of activePoint.meshes) {
      const mesh = render3d.scene.getObjectByName(meshName);
      tweenColor(mesh, originalBoneMaterialColor, 0.7);
    }
  }
}

function resetHilightedBoneMeshesInstant() {
  for (const activePoint of props.config.activePoints) {
    for (const meshName of activePoint.meshes) {
      const mesh = render3d.scene.getObjectByName(meshName);
      mesh?.material.color.set(originalBoneMaterialColor);
    }
  }
}

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      if (showActivePointsTimeout) {
        clearTimeout(showActivePointsTimeout);
        showActivePointsTimeout = null;
      }
      showActivePointsTimeout = setTimeout(() => {
        showActivePoints.value = true;
      }, 600);

      resetHilightedBoneMeshesInstant();
    } else {
      if (pivot) {
        gsap.to(pivot.rotation, {
          y: 0,
          duration: 3,
          ease: "power2.out",
        });
      }

      if (showActivePointsTimeout) {
        clearTimeout(showActivePointsTimeout);
        showActivePointsTimeout = null;
      }
      showActivePoints.value = false;
      selectedActivePoint.value = -1;
    }
  }
);

watch(
  () => selectedActivePoint.value,
  () => {
    if (selectedActivePoint.value >= 0) {
      hilightBoneMeshes();
    } else {
      resetHilightedBoneMeshes();
    }
  }
);

function getActivePointText(i) {
  return props.config.activePoints[i]?.text ?? "undefined";
}

function prepareActivePoints() {
  activePointPositions.value = [];
  if (props.config.activePoints.length === 0) {
    return;
  }

  for (const activePoint of props.config.activePoints) {
    const pointGroup = render3d.scene.getObjectByName(activePoint.name);
    if (pointGroup) {
      const point = toScreenPosition(
        pointGroup,
        render3d.camera,
        render3d.renderer
      );
      activePointPositions.value.push(point);
    }
  }
}

function prepareMeshMaterials() {
  if (props.config.activeBones.length > 0) {
    for (const boneConfig of props.config.activeBones) {
      for (const meshName of boneConfig.meshNames) {
        const mesh = render3d.scene.getObjectByName(meshName);
        if (mesh && mesh.material) {
          const material = mesh.material.clone();
          mesh.material = material;
          console.log(material);
        }
      }
    }
  }
}

function initCamera() {
  transitionCamera(
    render3d.controls,
    props.cameraConfig.position,
    props.cameraConfig.target,
    props.cameraConfig.transitionTime,
    "power2.inOut",
  );
}

function initPivot() {
  const model = render3d.scene.getObjectByName("model-group");
  if (model == undefined) {
    return;
  }

  const pivotRotation = usePivotRotation(render3d.renderer.domElement);

  pivotRotation.pivot.add(model);
  render3d.scene.add(pivotRotation.pivot);
  pivot = pivotRotation.pivot;
}

onMounted(() => {
  render3d = initRenderer3D(container.value);

  const assetScene = ScenePreloadService.getAsset(props.asset);
  if (assetScene) {
    render3d.scene.add(assetScene.clone());
  } else {
    console.error(props.asset, "not found");
  }

  render3d.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = child.material.clone();
      child.frustumCulled = false;
    }

    if (child.isLight) {
      child.intensity = child.intensity * 600;
      child.shadow.mapSize.width = 2048;
      child.shadow.mapSize.height = 2048;
    }
  });

  const backgroundModel = render3d.scene.getObjectByName("background");
  if (backgroundModel) {
    const c = backgroundModel.material.emissive;
    const scale = 2;
    backgroundModel.material.emissive.set(c.r * scale, c.g * scale, c.b * scale);
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  render3d.scene.add(ambientLight);

  prepareMeshMaterials();

  initPivot();

  initCamera();

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

.camera-btn {
  position: absolute;
  z-index: 20;
  bottom: 10px;
  left: 10px;
}
</style>
