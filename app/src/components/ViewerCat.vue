<template>
  <div>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
    <div class="btn btn-primary btn-play" @click="play">Play</div>
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

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: false },
});

const originalBoneMaterialColor = 14997948;
const container = ref(null);
let render3d, mixer;
let pivot = null;
let animationPlaying = null;

function logCamera() {
  console.log("Camera position: ", render3d.camera.position);
  console.log("Camera target: ", render3d.controls.target);
  // console.log(render3d.camera);
}

function playAnimation() {
  const animatedModel = render3d.scene.getObjectByName('Group');
  if (animatedModel && animatedModel.animations?.length > 0) {
    const clips = animatedModel.animations;
    mixer = new THREE.AnimationMixer(animatedModel)
    mixer.timeScale = 1.0;


    const action = mixer.clipAction(clips[0]);
    // action.time = 200 / 30;
    action.play();
    action.setLoop(THREE.LoopOnce);

    if (pivot) {
      if (animationPlaying) {
        animationPlaying.kill();
      };
      pivot.position.set(0, 20, 0);

      // render3d.camera.position.set(113.26140436977622, -3.9165300354975274, -36.061920672506005);
      // render3d.controls.target.set(-3.5693443200606003, 7.173470469768186, 0.775001860830176);
      // render3d.controls.update();

      animationPlaying = gsap.to(pivot.position, {
        x: 0,
        y: -30,
        z: 0,
        duration: 8,
        ease: "power1.inOut"
      });

      // gsap.to(render3d.controls.target, {
      //   x: 0.19823798211067456, y: -11.85257362829387, z: 1.6196289236085364,
      //   duration: 1,
      //   delay: 6,
      //   ease: "power2.inOut",
      //   onUpdate: () => {
      //     render3d.controls.update();
      //   },
      // });
      // gsap.to(render3d.camera.position, {
      //   x: 78.118988513895, y: -14.775887107899953, z: -7.911587896122452,
      //   duration: 1,
      //   delay: 6,
      //   ease: "power2.inOut",
      //   onUpdate: () => {
      //     render3d.controls.update();
      //   },
      // });
    }
  }
}

onMounted(() => {
  render3d = initRenderer3D(container.value, false);

  // render3d.camera.position.set(113.26140436977622, -3.9165300354975274, -36.061920672506005);
  // render3d.controls.target.set(-3.5693443200606003, 7.173470469768186, 0.775001860830176);

  render3d.camera.position.set(140.04757093740184,-8.575213700125868,-44.5347886683078);
  render3d.controls.target.set(-3.7582807000121026, 5.075361899222495, 0.8074271097605541);

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
    if (mixer) {
      mixer.update(delta);
    }
  });

  onBeforeUnmount(render3d.dispose);
});

function play() {
  playAnimation();
}

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
  top: 120px;
  left: 20px;
}
</style>
