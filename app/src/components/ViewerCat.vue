<template>
  <div>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
    <PlayButton class="btn-play" @click="playPauseAnimation" :is-playing="isAnimationPlaying" />
    <div class="btn btn-primary btn-next" @click="stepForwardAnimation">Step forward</div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "../services/ScenePreloadService";
import { useRenderer3D } from "../composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";
import { boneMaterial, boneHilightMaterial } from "@src/helpers/Materials";
import gsap from "gsap";
import PlayButton from "@src/components/PlayButton.vue";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: false },
});

const originalBoneMaterialColor = 14997948;
const container = ref(null);
let render3d, mixer;

const animation = {
  mixer: null,
  action: null,
  gsapTimeline: null,
  hasFinished: false,
};

let pivot = null;
let animationPlaying = null;
const isAnimationPlaying = ref(false);

function logCamera() {
  // console.log("Camera position: ", render3d.camera.position);
  // console.log("Camera target: ", render3d.controls.target);
}

function initAnimation() {
  const animatedModel = render3d.scene.getObjectByName('Group');
  if (animatedModel && animatedModel.animations?.length > 0) {

    const clips = animatedModel.animations;
    animation.mixer = new THREE.AnimationMixer(animatedModel)
    animation.mixer.timeScale = 1.5;

    animation.action = animation.mixer.clipAction(clips[0]);
    animation.action.setLoop(THREE.LoopOnce);
    animation.action.paused = true;
    animation.action.clampWhenFinished = true;
    animation.action.play();
    animation.mixer.addEventListener("finished", (event) => {
      if (event.action === animation.action) {
        isAnimationPlaying.value = false;
        animation.hasFinished = true;
        animation.gsapTimeline.pause();
      }
    });

    pivot.position.set(0, 20, 0);

    animation.gsapTimeline = gsap.timeline({
      paused: true
    });

    animation.gsapTimeline
      .to(pivot.position, {
        x: 0,
        y: -30,
        z: 0,
        duration: 8,
        ease: "power1.inOut"
      }, 0)
      .to(animation.mixer, {
        timeScale: 1.0,
        duration: 8,
        ease: "power1.out"
      }, 0);
  }

  playPauseAnimation();
}

function playPauseAnimation() {
  if (isAnimationPlaying.value) {
    // Pause
    animation.action.paused = true;
    animation.gsapTimeline.pause();
    isAnimationPlaying.value = false;
  } else {
    if (animation.hasFinished) {
      // Restart
      animation.action.reset();
      animation.gsapTimeline.restart();
      animation.hasFinished = false;
      pivot.position.set(0, 20, 0);
    }
    // Play
    animation.action.paused = false;
    animation.action.play();
    animation.gsapTimeline.play();
    isAnimationPlaying.value = true;
  }
}

function stepForwardAnimation() {
  if (animation.mixer) {
    animation.action.paused = true;
    animation.gsapTimeline.pause();
    isAnimationPlaying.value = false;

    const stepDuration = 0.2;
    let newTime = animation.action.time + stepDuration;
    if(newTime > animation.action.getClip().duration) {
        newTime = 0;
    }

    animation.action.time = newTime;
    animation.mixer.update(0);

    animation.gsapTimeline.time(newTime / animation.mixer.timeScale);
  }
}

onMounted(() => {
  render3d = initRenderer3D(container.value, false);

  render3d.camera.position.set(153.62562089378935, -7.07344970129659, -50.81826781490016);
  render3d.controls.target.set(-3.843766682705013, 7.8974697941971685, -0.31677150604446797);

  render3d.camera.fov = 25;
  render3d.controls.update();

  const catFallScene = ScenePreloadService.getAsset('catScene').clone();
  render3d.scene.add(catFallScene);

  const model = ScenePreloadService.getAsset('catFall');
  model.name = 'Group';
  const pivotRotation = usePivotRotation(render3d.renderer.domElement);
  pivotRotation.pivot.add(model);
  render3d.scene.add(pivotRotation.pivot);
  pivot = pivotRotation.pivot;

  render3d.scene.traverse((child) => {
    if (child.isLight) {
      child.intensity = child.intensity * 600;
      child.shadow.mapSize.width = 2048;
      child.shadow.mapSize.height = 2048;
    }
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      if (child.material.name === 'Cat_Low_Poly' || child.material.name === 'asRed2' || child.material.name === 'asBlue2') {
        child.material = boneMaterial;
      }
      if (child.material.name === 'asGreen2') {
        child.material = boneHilightMaterial;
      }
    }
  });

  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2));
  light.intensity = 1;
  render3d.scene.add(light);

  render3d.render((delta) => {
    if (animation.mixer) {
      animation.mixer.update(delta);
    }
  });

  onBeforeUnmount(render3d.dispose);

  initAnimation();
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

.btn-play {
  position: absolute;
  top: 140px;
  left: 20px;
}

.btn-next {
  position: absolute;
  top: 155px;
  left: 100px;
}
</style>
