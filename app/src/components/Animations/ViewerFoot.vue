<template>
  <div>
    <viewer-foot-part class="viewer-foot-part1" :isActive="props.isActive" :isVisible="props.isVisible" :isPlaying="isPlaying"
      :cameraPos="bearCameraPos" :cameraTarget="bearCameraTarget" model="bearLeg" scene="bearLegScene"
      @pivot-rotation="() => { isRotationIconActive = false; }"
      >
      <div class="foot-text-container">
        <span class="foot-text">Pēdminis</span>
        <span class="foot-subtext">Lācis</span>
      </div>
    </viewer-foot-part>

    <viewer-foot-part class="viewer-foot-part2" :isActive="props.isActive" :isVisible="props.isVisible" :isPlaying="isPlaying"  
      :cameraPos="horseCameraPos" :cameraTarget="horseCameraTarget" model="horseLeg" scene="horseLegScene"
      @pivot-rotation="() => { isRotationIconActive = false; }"
      >
      <div class="foot-text-container">
        <span class="foot-text">Nagminis</span>
        <span class="foot-subtext">Zirgs</span>
      </div>
    </viewer-foot-part>

    <!-- <viewer-foot-part class="viewer-foot-part3" :isActive="props.isActive" :isVisible="props.isVisible" :isPlaying="isPlaying"  
      :cameraPos="catCameraPos" :cameraTarget="catCameraTarget" model="horseLeg" scene="horseLegScene"
      @pivot-rotation="() => { isRotationIconActive = false; }"
      <div class="foot-text-container">
        <span class="foot-text">Pirkstminis</span>
        <span class="foot-subtext">Kaķis</span>
      </div>
    </viewer-foot-part> -->
  </div>

  <RotationIcon :is-active="isRotationIconActive" position="center"/>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "@src/services/ScenePreloadService";
import { useRenderer3D } from "@src/composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";
import { useCameraController } from "@src/composables/CameraController";
import RotationIcon from "@src/components/RotationIcon.vue";
import ViewerFootPart from "@src/components/Animations/components/ViewerFootPart.vue";

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

const bearCameraPos = reactive(new THREE.Vector3(-16.69849051471435, 9.458586903467133, 19.289043006784656));
const bearCameraTarget = reactive(new THREE.Vector3(0.29277173633069287, 2.976599768682843, 0.6171574890268569));

const horseCameraPos = reactive(new THREE.Vector3(-16.69849051471435, 9.458586903467133, 19.289043006784656));
const horseCameraTarget = reactive(new THREE.Vector3(0.29277173633069287, 2.976599768682843, 0.6171574890268569));

const catCameraPos = reactive(new THREE.Vector3(-16.69849051471435, 9.458586903467133, 19.289043006784656));
const catCameraTarget = reactive(new THREE.Vector3(0.29277173633069287, 2.976599768682843, 0.6171574890268569));

const cameraWide = [
  {
    position: new THREE.Vector3(-16.69849051471435, 9.458586903467133, 19.289043006784656),
    target: new THREE.Vector3(0.29277173633069287, 2.976599768682843, 0.6171574890268569)
  },
  {
    position: new THREE.Vector3(-23.933995245247264, 15.770983679852502, 24.971944380890953),
    target: new THREE.Vector3(0.5658423726801133, 5.446963942255439, -0.13227440521105002)
  },
  {
    position: new THREE.Vector3(-19.13895791474941, 5.897375353041317, 17.480325897246452),
    target: new THREE.Vector3(-0.5377894660426883, 3.1000084719021634, -1.1412397384959674)
  }
];

const cameraNear = [
  {
    position: new THREE.Vector3(-13.336799331628653, 7.928331323286592, 14.261674118661956),
    target: new THREE.Vector3(0.29277173633069287, 2.976599768682843, 0.6171574890268569)
  },
  {
    position: new THREE.Vector3(-19.599590119672637, 4.86924623440446, 10.11210642285623),
    target: new THREE.Vector3(0.6177808326344226, 3.926213621550388, 0.23771801950970228)
  },
  {
    position: new THREE.Vector3(-19.13895791474941, 5.897375353041317, 17.480325897246452),
    target: new THREE.Vector3(-0.5377894660426883, 3.1000084719021634, -1.1412397384959674)
  }
];

function blendCameras() {
    bearCameraPos.lerpVectors(cameraWide[0].position, cameraNear[0].position, cameraBlend.value);
    bearCameraTarget.lerpVectors(cameraWide[0].target, cameraNear[0].target, cameraBlend.value);

    horseCameraPos.lerpVectors(cameraWide[1].position, cameraNear[1].position, cameraBlend.value);
    horseCameraTarget.lerpVectors(cameraWide[1].target, cameraNear[1].target, cameraBlend.value);
    
    catCameraPos.lerpVectors(cameraWide[2].position, cameraNear[2].position, cameraBlend.value);
    catCameraTarget.lerpVectors(cameraWide[2].target, cameraNear[2].target, cameraBlend.value);    
}

watch(() => props.isActive, (newVal) => {
  if (newVal) {
    isRotationIconActive.value = true;
  }
}, { immediate: true });

onMounted(() => {

    blendCameras();

    timerAnimationState = setInterval(() => {
      isPlaying.value = !isPlaying.value
    }, ANIMATION_STATE_CHANGE_INTERVAL)
});

function useLinearBlend(
  isActive,
  duration = 5000
) {
  const blend = ref(isActive.value ? 1 : 0)

  let frameId = 0

  watch(isActive, (active) => {
    cancelAnimationFrame(frameId)

    const start = blend.value
    const target = active ? 1 : 0
    const startTime = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)

      blend.value = start + (target - start) * progress

      blendCameras();

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)
  })

  onUnmounted(() => cancelAnimationFrame(frameId))

  return blend
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
