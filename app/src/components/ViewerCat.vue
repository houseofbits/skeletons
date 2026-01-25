<template>
  <div>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
    <PlayButton
      class="btn-play"
      @click="playPauseAnimation"
      :is-playing="isAnimationPlaying"
    />
    <!-- <div class="btn btn-primary btn-next" @click="stepForwardAnimation">
      Step forward
    </div> -->
    <div class="divider-border"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "../services/ScenePreloadService";
import { useRenderer3D } from "../composables/Renderer3D";
import { use3DCamera } from "../composables/CameraController";
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

let cam1 = null;
let cam2 = null;

function logCamera() {
  // console.log("Camera position: ", render3d.camera.position);
  // console.log("Camera target: ", render3d.controls.target);

  if (cam1 == null || cam2 == null) {
    return;
  }

  console.log("Camera1 position: ", cam1.camera.position);
  console.log("Camera1 target: ", cam1.controls.target);
  console.log("Camera2 position: ", cam2.camera.position);
  console.log("Camera2 target: ", cam2.controls.target);
}

function initAnimation() {
  const animatedModel = render3d.scene.getObjectByName("Group");
  if (animatedModel && animatedModel.animations?.length > 0) {
    const clips = animatedModel.animations;
    animation.mixer = new THREE.AnimationMixer(animatedModel);
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
      paused: true,
    });

    animation.gsapTimeline
      .to(
        pivot.position,
        {
          x: 0,
          y: -30,
          z: 0,
          duration: 8,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        animation.mixer,
        {
          timeScale: 1.0,
          duration: 8,
          ease: "power1.out",
        },
        0
      );
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
    if (newTime > animation.action.getClip().duration) {
      newTime = 0;
    }

    animation.action.time = newTime;
    animation.mixer.update(0);

    animation.gsapTimeline.time(newTime / animation.mixer.timeScale);
  }
}

onMounted(() => {
  render3d = initRenderer3D(container.value, false);

  // render3d.camera.position.set(
  //   153.62562089378935,
  //   -7.07344970129659,
  //   -50.81826781490016
  // );
  // render3d.controls.target.set(
  //   -3.843766682705013,
  //   7.8974697941971685,
  //   -0.31677150604446797
  // );

  // render3d.camera.fov = 25;
  // render3d.controls.update();

  const catFallScene = ScenePreloadService.getAsset("catScene").clone();
  render3d.scene.add(catFallScene);

  const model = ScenePreloadService.getAsset("catFall");
  model.name = "Group";
  const pivotRotation = usePivotRotation(render3d.renderer.domElement);
  pivotRotation.pivot.add(model);
  render3d.scene.add(pivotRotation.pivot);
  pivot = pivotRotation.pivot;
  // pivotRotation.setEnabled(false);

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

      if (
        child.material.name === "Cat_Low_Poly" ||
        child.material.name === "asRed2" ||
        child.material.name === "asBlue2"
      ) {
        child.material = boneMaterial;
      }
      if (child.material.name === "asGreen2") {
        child.material = boneHilightMaterial;
      }
    }
  });

  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2));
  light.intensity = 1;
  render3d.scene.add(light);

  cam1 = use3DCamera("MainCam1", render3d.renderer, false);
  cam2 = use3DCamera("MainCam2", render3d.renderer, false);

  render3d.scene.add(cam1.camera);
  render3d.scene.add(cam2.camera);

  cam1.camera.position.set(209.95928439162913, -12.029180385731102, -12.453310798798382);
  cam1.controls.target.set(-3.57385144949077, 3.118806515666467, 2.478930199032835);
  cam1.camera.fov = 25;
  cam1.controls.update();

  const cam2InitPos = new THREE.Vector3(108.46331703875357, 15.535748000000002, 3.788903684248791);
  const cam2InitTarget = new THREE.Vector3(-1.5371662133000208, 15.535748000000002, 2.2891935863438984);

  cam2.camera.position.set(cam2InitPos.x, cam2InitPos.y, cam2InitPos.z);
  cam2.controls.target.set(cam2InitTarget.x, cam2InitTarget.y, cam2InitTarget.z);
  cam2.camera.fov = 25;
  cam2.controls.update();


  // render3d.render((delta) => {
  //   if (animation.mixer) {
  //     animation.mixer.update(delta);
  //   }
  // });

  render3d.renderRaw((width, height, delta) => {
    if (animation.mixer) {
      animation.mixer.update(delta);
    }

    render3d.renderer.setSize(width, height);
    render3d.renderer.setScissorTest(true);

    const divider = 0.35;

    cam2.camera.position.y = cam2InitPos.y + pivot.position.y;
    cam2.controls.target.y = cam2InitTarget.y + pivot.position.y;

    render3d.renderer.setViewport(0, 0, width * divider, height);
    render3d.renderer.setScissor(0, 0, width * divider, height);
    cam1.update(width * divider, height);
    render3d.renderer.render(render3d.scene, cam1.camera);

    render3d.renderer.setViewport(
      width * divider,
      0,
      width * (1.0 - divider),
      height
    );
    render3d.renderer.setScissor(
      width * divider,
      0,
      width * (1.0 - divider),
      height
    );
    cam2.update(width * (1.0 - divider), height);
    render3d.renderer.render(render3d.scene, cam2.camera);

    
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

.divider-border {
  position: absolute;
  height:1080px;
  width: 1px;
  top:0;
  left:671px;
  border-left: solid 1px rgba(180, 180, 180, 0.2);
}
</style>
