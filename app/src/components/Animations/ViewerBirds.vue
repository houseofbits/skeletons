<template>
  <div>
    <viewer-birds-part class="viewer-foot-part1" :isActive="props.isActive" :isVisible="props.isVisible"
      :isPlaying="isPlaying" :cameraPos="bearCameraPos" :cameraTarget="bearCameraTarget" model="owl" scene="birdsScene"
      @pivot-rotation="
        () => {
          isRotationIconActive = false;
        }
      ">
      <div class="foot-text-container">
        <span class="foot-text">Pēdminis</span>
      </div>
    </viewer-birds-part>

    <viewer-birds-part class="viewer-foot-part2" :isActive="props.isActive" :isVisible="props.isVisible"
      :isPlaying="isPlaying" :cameraPos="horseCameraPos" :cameraTarget="horseCameraTarget" model="penguin"
      scene="birdsScene" @pivot-rotation="
        () => {
          isRotationIconActive = false;
        }
      ">
      <div class="foot-text-container">
        <span class="foot-text">Nagminis</span>
      </div>
    </viewer-birds-part>

    <viewer-birds-part class="viewer-foot-part3" :isActive="props.isActive" :isVisible="props.isVisible"
      :isPlaying="isPlaying" :cameraPos="catCameraPos" :cameraTarget="catCameraTarget" model="ostritch"
      scene="birdsScene" @pivot-rotation="
        () => {
          isRotationIconActive = false;
        }
      ">
      <div class="foot-text-container">
        <span class="foot-text">Pirkstminis</span>
      </div>
    </viewer-birds-part>
  </div>
</template>

<script setup>
import {
  reactive,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "@src/services/ScenePreloadService";
import { useRenderer3D } from "@src/composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";
import { useCameraController } from "@src/composables/CameraController";
import RotationIcon from "@src/components/RotationIcon.vue";
import ViewerBirdsPart from "@src/components/Animations/components/ViewerBirdsPart.vue";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true },
});

const ANIMATION_STATE_CHANGE_INTERVAL = 10000; // 10 seconds
const ANIMATION_CAMERA_BLEND_DURATION = 5000; // 3 seconds

const isRotationIconActive = ref(true);
const isPlaying = ref(false);
let timerAnimationState = null;

const bearCameraPos = reactive(
  new THREE.Vector3(
    -6.710051406094502,
    3.447459855211276,
    9.128839714851335)
);
const bearCameraTarget = reactive(
  new THREE.Vector3(
    -16.877770224675444,
    -1.1317420980008293,
    -19.320408885410398)
);

const horseCameraPos = reactive(
  new THREE.Vector3(
    5.892054052943013,
    4.730618047794569,
    16.24947549273488)
);
const horseCameraTarget = reactive(
  new THREE.Vector3(
    -8.04560936613739,
    1.1423013092364684,
    -22.74806747546578)
);

const catCameraPos = reactive(
  new THREE.Vector3(
    18.073607509103606,
    6.198199974636078,
    25.00155752468397)
);
const catCameraTarget = reactive(
  new THREE.Vector3(
    1.4793016158393164,
    4.6806220890567936,
    -26.070019466688574)
);

const cameraWide = [
  {
    position: new THREE.Vector3(
      -6.710051406094502,
      3.447459855211276,
      9.128839714851335
    ),
    target: new THREE.Vector3(
      -16.877770224675444,
      -1.1317420980008293,
      -19.320408885410398
    ),
  },
  {
    position: new THREE.Vector3(
      5.892054052943013,
      4.730618047794569,
      16.24947549273488
    ),
    target: new THREE.Vector3(
      -8.04560936613739,
      1.1423013092364684,
      -22.74806747546578
    ),
  },
  {
    position: new THREE.Vector3(
      18.073607509103606,
      6.198199974636078,
      25.00155752468397
    ),
    target: new THREE.Vector3(
      1.4793016158393164,
      4.6806220890567936,
      -26.070019466688574
    ),
  },
];

const cameraNear = [
  {
    position: new THREE.Vector3(
      -13.336799331628653,
      7.928331323286592,
      14.261674118661956
    ),
    target: new THREE.Vector3(
      0.29277173633069287,
      2.976599768682843,
      0.6171574890268569
    ),
  },
  {
    position: new THREE.Vector3(
      -19.599590119672637,
      4.86924623440446,
      10.11210642285623
    ),
    target: new THREE.Vector3(
      0.6177808326344226,
      3.926213621550388,
      0.23771801950970228
    ),
  },
  {
    position: new THREE.Vector3(
      -15.200459964506273, 5.676571217167571, 11.202429586598127
    ),
    target: new THREE.Vector3(
      0.1149115543585532, 2.821758029468611, 0.05558772402821313
    ),
  },
];

function blendCameras() {
  bearCameraPos.lerpVectors(
    cameraWide[0].position,
    cameraNear[0].position,
    cameraBlend.value
  );
  bearCameraTarget.lerpVectors(
    cameraWide[0].target,
    cameraNear[0].target,
    cameraBlend.value
  );

  horseCameraPos.lerpVectors(
    cameraWide[1].position,
    cameraNear[1].position,
    cameraBlend.value
  );
  horseCameraTarget.lerpVectors(
    cameraWide[1].target,
    cameraNear[1].target,
    cameraBlend.value
  );

  catCameraPos.lerpVectors(
    cameraWide[2].position,
    cameraNear[2].position,
    cameraBlend.value
  );
  catCameraTarget.lerpVectors(
    cameraWide[2].target,
    cameraNear[2].target,
    cameraBlend.value
  );
}

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      isRotationIconActive.value = true;
    }
  },
  { immediate: true }
);

onMounted(() => {
  timerAnimationState = setInterval(() => {
    isPlaying.value = !isPlaying.value;
  }, ANIMATION_STATE_CHANGE_INTERVAL);

  blendCameras();
});

function useLinearBlend(isActive, duration = 5000) {
  const blend = ref(isActive.value ? 1 : 0);

  let frameId = 0;

  watch(isActive, (active) => {
    cancelAnimationFrame(frameId);

    const start = blend.value;
    const target = active ? 1 : 0;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);

      blend.value = start + (target - start) * progress;

      blendCameras();

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
  });

  onUnmounted(() => cancelAnimationFrame(frameId));

  return blend;
}

const cameraBlend = useLinearBlend(isPlaying, ANIMATION_CAMERA_BLEND_DURATION);
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

.viewer-foot-part1 {
  width: 639px;
  height: 1080px;
  display: block;
  border-right: solid 1px rgba(180, 180, 180, 0.2);
}

.viewer-foot-part2 {
  position: absolute;
  top: 0;
  left: 639px;
  width: 639px;
  height: 1080px;
  display: block;
  border-left: solid 1px rgba(180, 180, 180, 0.2);
  border-right: solid 1px rgba(180, 180, 180, 0.2);
}

.viewer-foot-part3 {
  position: absolute;
  top: 0;
  left: 1278px;
  width: 639px;
  height: 1080px;
  display: block;
  border-left: solid 1px rgba(180, 180, 180, 0.2);
}

.foot-text-container {
  position: absolute;
  height: 50px;
  width: 639px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
}

.foot-text {
  font-size: 43px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  margin-left: 40px;
}

.foot-subtext {
  font-size: 30px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  margin-right: 40px;
}
</style>
