<template>
  <div>
    <viewer-birds-part class="viewer-foot-part1" :isActive="props.isActive" :isVisible="props.isVisible"
      :isPlaying="isPlaying" :cameraPos="owlCameraPos" :cameraTarget="owlCameraTarget" model="owl" scene="birdsOwlScene"
      @pivot-rotation="
        () => {
          isRotationIconActive = false;
        }
      ">
      <div class="foot-text-container">
        <span class="foot-text">Pūce</span>
      </div>
    </viewer-birds-part>

    <viewer-birds-part class="viewer-foot-part2" :isActive="props.isActive" :isVisible="props.isVisible"
      :isPlaying="isPlaying" :cameraPos="penguinCameraPos" :cameraTarget="penguinCameraTarget" model="penguin"
      scene="birdsPenguinScene" @pivot-rotation="
        () => {
          isRotationIconActive = false;
        }
      ">
      <div class="foot-text-container">
        <span class="foot-text">Pingvīns</span>
      </div>
    </viewer-birds-part>

    <viewer-birds-part class="viewer-foot-part3" :isActive="props.isActive" :isVisible="props.isVisible"
      :isPlaying="isPlaying" :cameraPos="ostrichCameraPos" :cameraTarget="ostrichCameraTarget" model="ostritch"
      scene="birdsOstrichScene" @pivot-rotation="
        () => {
          isRotationIconActive = false;
        }
      ">
      <div class="foot-text-container">
        <span class="foot-text">Strauss</span>
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

const owlCameraPos = reactive(
  new THREE.Vector3(-4.320986701872094 , 4.585677832662597 , 8.157381858522243)
);
const owlCameraTarget = reactive(
  new THREE.Vector3(0.36815708959759363 , 1.856740856527578 , -0.42505086007632886)
);

const penguinCameraPos = reactive(
  new THREE.Vector3(
    5.251244875684141 , 7.175924370064184 , 15.749620362686361)
);
const penguinCameraTarget = reactive(
  new THREE.Vector3(-0.11770712529492643 , 3.0514163268823857 , -0.8426455970559769)
);

const ostrichCameraPos = reactive(
  new THREE.Vector3(13.380206946221463 , 12.694823044694312 , 20.400679196452376)
);
const ostrichCameraTarget = reactive(
  new THREE.Vector3(-1.1533777672701047 , 3.9177029666519796 , -0.8300893961633995)
);

const cameraWide = [
  {
    position: new THREE.Vector3(-4.320986701872094 , 4.585677832662597 , 8.157381858522243 ),
    target: new THREE.Vector3(
      0.36815708959759363 , 1.856740856527578 , -0.42505086007632886
    ),
  },
  {
    position: new THREE.Vector3(
      5.892054052943013,
      4.730618047794569,
      16.24947549273488
    ),
    target: new THREE.Vector3(
      -0.11770712529492643 , 3.0514163268823857 , -0.8426455970559769
    ),
  },
  {
    position: new THREE.Vector3(
      13.380206946221463 , 12.694823044694312 , 20.400679196452376
    ),
    target: new THREE.Vector3(
      -1.1533777672701047 , 3.9177029666519796 , -0.8300893961633995
    ),
  },
];

const cameraNear = [
  {
    position: new THREE.Vector3(-1.3805419629499898 , 1.7687210043595698 , 3.696088306808056),
    target: new THREE.Vector3( 0.12225164745075588 , 1.7746231289409125 , -0.5124668104413683),
  },
  {
    position: new THREE.Vector3(2.999277467224509 , 1.2535067644208377 , 7.355213033952559),
    target: new THREE.Vector3(-0.0895594627137195 , 2.524189172946306 , -0.7206954551908242),
  },
  {
    position: new THREE.Vector3(3.0726246115209133 , 5.379924772558001 , 10.969410829968202),
    target: new THREE.Vector3(-0.6125400798889684 , 4.464130367188207 , -1.0389505676371713),
  },
];

function blendCameras() {
  owlCameraPos.lerpVectors(
    cameraWide[0].position,
    cameraNear[0].position,
    cameraBlend.value
  );
  owlCameraTarget.lerpVectors(
    cameraWide[0].target,
    cameraNear[0].target,
    cameraBlend.value
  );

  penguinCameraPos.lerpVectors(
    cameraWide[1].position,
    cameraNear[1].position,
    cameraBlend.value
  );
  penguinCameraTarget.lerpVectors(
    cameraWide[1].target,
    cameraNear[1].target,
    cameraBlend.value
  );

  ostrichCameraPos.lerpVectors(
    cameraWide[2].position,
    cameraNear[2].position,
    cameraBlend.value
  );
  ostrichCameraTarget.lerpVectors(
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
