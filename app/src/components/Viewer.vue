<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>
</template>

<script setup>
import gsap from "gsap";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import ScenePreloadService from "../services/ScenePreloadService";

const props = defineProps({
  src: { type: String, required: true }, // path to your .fbx file
  background: { type: [String, Number], default: 0x000000 },
  isActive: { type: Boolean, default: false },
  cameraConfig: {
    type: Object,
    required: true,
  }
});


// const cameras = ref([]);

const container = ref(null);
let renderer, scene, camera, controls, mixer, clock;
let activeCamera = null;

function logCamera() {
  console.log("Camera position: ", activeCamera.position);
  console.log("Camera target: ", controls.target);
  console.log("Camera fov: ", activeCamera.fov);
}

function setIconCameraPosition() {
  const duration = 0.6;
  gsap.timeline()
    .to(controls.target, {
      duration: duration,
      x: props.cameraConfig.iconTarget.x,
      y: props.cameraConfig.iconTarget.y,
      z: props.cameraConfig.iconTarget.z,
      ease: "power2.out",
      onUpdate: () => controls.update()
    })
    .to(camera.position, {
      duration: duration,
      x: props.cameraConfig.iconPos.x,
      y: props.cameraConfig.iconPos.y,
      z: props.cameraConfig.iconPos.z,
      ease: "power2.out",
      onUpdate: () => controls.update()
    }, "<"); // "<" = run at same tie  
}

function setInitialCameraPosition() {
  const duration = 0.8;
  gsap.timeline()
    .to(controls.target, {
      duration: duration,
      x: props.cameraConfig.initialTarget.x,
      y: props.cameraConfig.initialTarget.y,
      z: props.cameraConfig.initialTarget.z,
      ease: "power2.out",
      onUpdate: () => controls.update()
    })
    .to(camera.position, {
      duration: duration,
      x: props.cameraConfig.initialPos.x,
      y: props.cameraConfig.initialPos.y,
      z: props.cameraConfig.initialPos.z,
      ease: "power2.out",
      onUpdate: () => controls.update()
    }, "<"); // "<" = run at same tie
}

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      setInitialCameraPosition();
    } else {
      setIconCameraPosition();
    }
  }
);

onMounted(() => {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(props.background);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(1500, 1000);
  container.value.appendChild(renderer.domElement);

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  // Fallback camera
  camera = new THREE.PerspectiveCamera(
    33,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    100000
  );
  camera.name = 'MainCamera';

  camera.position.set(props.cameraConfig.iconPos.x, props.cameraConfig.iconPos.y, props.cameraConfig.iconPos.z);
  scene.add(camera);
  activeCamera = camera;
  controls = new OrbitControls(camera, renderer.domElement);

  setIconCameraPosition();

  clock = new THREE.Clock();

  const fishScene = ScenePreloadService.getAsset("fish");
  
  const loader = new FBXLoader();
  loader.load(
    props.src,
    (object) => {
      scene.add(object);

      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true; // optional
        }

        if (child.isLight) {
          child.intensity = child.intensity * 800;
        }
      });

      // Animation (if available)
      if (object.animations?.length > 0) {
        const clips = object.animations;
        mixer = new THREE.AnimationMixer(object)
        mixer.timeScale = 0.2;

        clips.forEach(clip => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      }

      // const spotLight = scene.getObjectByName("Spot001");
      // if (spotLight) {
      //   spotLight.shadow.mapSize.set(512, 512);
      //   // spotLight.shadow.bias = 0.001 
      // }

      // const spotLight2 = scene.getObjectByName("Spot002");
      // if (spotLight2) {
      //   spotLight2.shadow.mapSize.set(2048, 2048);     
      //   // spotLight2.shadow.bias = -0.001 
      // }
    },
    (xhr) =>
      console.log(`Loading: ${((xhr.loaded / xhr.total) * 100).toFixed(1)}%`),
    (err) => console.error("FBX load error:", err)
  );

  // Handle resize
  const onResize = () => {
    const w = container.value.clientWidth;
    const h = container.value.clientHeight;
    renderer.setSize(w, h);
    activeCamera.aspect = w / h;
    activeCamera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize);


  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    if (activeCamera) {
      renderer.render(scene, activeCamera);

      const w = container.value.clientWidth;
      const h = container.value.clientHeight;
      // renderer.setSize(w, h)
      activeCamera.aspect = w / h;
      activeCamera.updateProjectionMatrix();
    }
  };
  animate();

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
    renderer.dispose();
    controls.dispose();
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material))
          obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
  });
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
