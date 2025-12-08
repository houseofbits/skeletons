<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>
  <!-- <template v-if="showActivePoints">
    <Callout
      v-for="(pos, i) in activePointPositions"
      :text="getActivePointText(i)"
      :position="pos"
      :key="i"
    />
  </template> -->

  <Sidebar v-if="showActivePoints" :selected="selectedActivePoint" :active-points="props.config.activePoints"
    @select="(i) => selectedActivePoint = i" />
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

const props = defineProps({
  asset: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  config: {
    type: Object,
    required: true,
  },
  activate: { type: Boolean, default: true },
});

const originalBoneMaterialColor = 14997948;
const hilightedBoneMaterialColor = '#ccb102';

const container = ref(null);
let render3d;
const activePointPositions = ref([]);
const showActivePoints = ref(false);
const selectedActivePoint = ref(-1);
let showActivePointsTimeout = null;

const { initRenderer3D } = useRenderer3D();

function logCamera() {
  // console.log("Camera position: ", render3d.camera.position);
  // console.log("Camera target: ", render3d.controls.target);
  // console.log("Camera fov: ", render3d.camera.fov);
}

function setIconCameraPosition() {
  const duration = 0.9;
  transitionCamera(
    render3d.controls,
    props.config.iconPos,
    props.config.iconTarget,
    duration,
    "power2.inOut"
  );
}

function setInitialCameraPosition() {
  const duration = 1.6;
  transitionCamera(
    render3d.controls,
    props.config.initialPos,
    props.config.initialTarget,
    duration,
    "power2.inOut",
    () => {
      // showActivePoints.value = true;
    },
    prepareActivePoints
  );
}

function hilightBoneMeshes() {
  if (props.config.activePoints.length === 0) {
    return;
  }

  if (selectedActivePoint.value < 0) {
    return;
  }

  let i = 0;
  for (const activePoint of props.config.activePoints) {
    const color = (selectedActivePoint.value === i) ? hilightedBoneMaterialColor : originalBoneMaterialColor;
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

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      setInitialCameraPosition();
      if (showActivePointsTimeout) {
        clearTimeout(showActivePointsTimeout);
        showActivePointsTimeout = null;
      }
      showActivePointsTimeout = setTimeout(() => {
        showActivePoints.value = true;
      }, 600);
      render3d.controls.enabled = true;
      // render3d.controls.minPolarAngle = Math.PI * 0.1;
      // render3d.controls.maxPolarAngle = Math.PI * 0.4;


      console.log(render3d.scene);
    } else {
      render3d.controls.enabled = false;
      render3d.controls.minAzimuthAngle = Infinity;
      render3d.controls.maxAzimuthAngle = Infinity;

      setIconCameraPosition();
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
  () => props.config,
  () => {
    if (!props.isActive) {
      setIconCameraPosition();
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
        }
      }
    }
  }
}

function initCamera() {
  let pos = new THREE.Vector3(
    props.config.iconPos.x,
    props.config.iconPos.y,
    props.config.iconPos.z
  );
  const target = new THREE.Vector3(
    props.config.iconTarget.x,
    props.config.iconTarget.y,
    props.config.iconTarget.z
  );

  pos = pos.lerp(target, 0.3);

  render3d.camera.position.set(pos.x, pos.y, pos.z);
  render3d.controls.target.set(
    props.config.iconTarget.x,
    props.config.iconTarget.y,
    props.config.iconTarget.z
  );
  render3d.controls.update();

  setIconCameraPosition();
}

watch(
  () => props.activate,
  (newVal) => {
    if (newVal) {
      initCamera();
    }
  }
);

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
    }

    if (child.isLight) {
      child.intensity = child.intensity * 600;
    }
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  render3d.scene.add(ambientLight);

  prepareMeshMaterials();

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
</style>
