<template>
  <div>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
    <PlayButton class="btn-play" @click="playPauseAnimation" :is-playing="isAnimationPlaying" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScenePreloadService from "@src/services/ScenePreloadService";
import { useRenderer3D } from "@src/composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";
import { boneMaterial, boneHilightMaterial } from "@src/helpers/Materials";
import gsap from "gsap";
import PlayButton from "@src/components/PlayButton.vue";
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";

const { initRenderer3D } = useRenderer3D();

const props = defineProps({
  isActive: { type: Boolean, default: true },
});

const animation = {
  mixer: null,
  action: null,
  gsapTimeline: null,
  hasFinished: false,
  animatedSpeed: 0,
};

const container = ref(null);
const isAnimationPlaying = ref(false);
let render3d, mixer;

function playAnimation(reset = false) {
  if (animation.action === null) return;

  if (animation.hasFinished || reset) {
    // Restart
    animation.action.reset();
    animation.gsapTimeline.restart();
    animation.hasFinished = false;
  }
  // Play
  animation.action.paused = false;
  animation.action.play();
  animation.gsapTimeline.play();
  isAnimationPlaying.value = true;
}

function pauseAnimation() {
  if (animation.action === null) return;
  // Pause
  animation.action.paused = true;
  animation.gsapTimeline.pause();
  isAnimationPlaying.value = false;
}

watch(() => props.isActive, (newVal) => {
  if (newVal) {
    playAnimation(true);
  } else {
    pauseAnimation();
  }
}, { immediate: true });

function logCamera() {
  // console.log("Camera position: ", render3d.camera.position);
  // console.log("Camera target: ", render3d.controls.target);
  // console.log(render3d.camera);
}

function playPauseAnimation() {
  if (isAnimationPlaying.value) {
    pauseAnimation();
  } else {
    playAnimation();
  }
}

function initAnimation() {
  const animatedModel = render3d.scene.getObjectByName("Group");
  if (animatedModel && animatedModel.animations?.length > 0) {
    const clips = animatedModel.animations;
    animation.mixer = new THREE.AnimationMixer(animatedModel);
    animation.action = animation.mixer.clipAction(clips[0]);
    animation.action.setLoop(THREE.LoopOnce);
    animation.action.paused = true;
    animation.action.clampWhenFinished = false;
    animation.action.time = 0;

    animation.gsapTimeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        animation.action.paused = true;
        isAnimationPlaying.value = false;
        animation.hasFinished = true;
      },
    });


    animation.gsapTimeline
      // forward
      .to({ speed: 0 }, {
        speed: 0.5,
        duration: 6.5,
        ease: "power1.inOut",
        onUpdate() {
          animation.animatedSpeed = this.targets()[0].speed;
        },
      })
      .to(shellMaterial, {
        opacity: 0.5,
        duration: 1,
        delay: 5.5,
        ease: "power1.inOut",
      }, "<")
      .to({ speed: 0.5 }, {
        speed: 0,
        duration: 4,
        ease: "power1.out",
        onUpdate() {
          animation.animatedSpeed = this.targets()[0].speed;
        },
      })
      .to(shellMaterial, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }, "<")
      // reverse
      .to({ speed: 0 }, {
        speed: -0.5,
        duration: 6,
        ease: "power1.inOut",
        onUpdate() {
          animation.animatedSpeed = this.targets()[0].speed;
        },
      })
      .to(shellMaterial, {
        opacity: 1,
        duration: 2,
        ease: "power1.out",
        delay: 4,
      }, "<")
      // slow to stop
      .to({ speed: -0.5 }, {
        speed: 0,
        duration: 4,
        ease: "power1.out",
        onUpdate() {
          animation.animatedSpeed = this.targets()[0].speed;
        },
      });
  }
}

const shellMaterial = new THREE.MeshPhongMaterial({
  color: new THREE.Color("#937666"),
  shininess: 32,
  // specular: new THREE.Color(0.06743726399864605, 0.06743726399864605, 0.06743726399864605),
  specular: new THREE.Color(0.2, 0.2, 0.2),
  reflectivity: 1,
  name: "hilightedMaterial",
});

onMounted(() => {
  render3d = initRenderer3D(container.value, false);

  render3d.camera.position.set(
    26.967259163778515,
    15.695219592134237,
    14.726310588584106
  );
  render3d.controls.target.set(
    7.636261956105356,
    5.826977764423226,
    4.74801146578979
  );

  render3d.camera.fov = 25;
  render3d.controls.update();

  const catFallScene = ScenePreloadService.getAsset("turtleScene").clone();
  render3d.scene.add(catFallScene);

  const model = ScenePreloadService.getAsset("turtleModel");
  model.name = "Group";

  const pivotRotation = usePivotRotation(render3d.renderer.domElement);
  pivotRotation.setEnabled(true);
  pivotRotation.pivot.add(model);
  render3d.scene.add(pivotRotation.pivot);

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      if (
        child.material.name === "shell" ||
        child.material.name === "caparaceHalf_R" ||
        child.material.name === "caparace_full"
      ) {
        child.material = shellMaterial.clone();
      } else if (child.material.name === "backbone_MAT") {
        child.material = boneHilightMaterial;
      } else {
        child.material = boneMaterial.clone();
      }

      if (child.name === "caparace_full") {
        child.visible = false;
      }

    }
  });

  render3d.scene.traverse((child) => {
    if (child.isLight) {
      child.shadow.normalBias = 0.05;
      child.shadow.bias = -0.00002;
      child.castShadow = true;
    }
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      if (child.name === "caparaceHalf_L") {
        child.material = shellMaterial;
        child.material.transparent = true;
        child.material.opacity = 1;
        child.castShadow = false;
        child.receiveShadow = true;

      }

    }
  });

  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2));
  light.intensity = 2;
  render3d.scene.add(light);

  render3d.render((delta) => {
    if (animation.mixer && animation.action.paused === false) {
      if (animation.animatedSpeed !== 0) {
        const dt = delta * animation.animatedSpeed;
        animation.action.time += dt;
        animation.action.time = Math.max(0, Math.min(animation.action.time, animation.action.getClip().duration));
      }
      animation.mixer.update(0);
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
</style>
