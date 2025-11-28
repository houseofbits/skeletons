<template>
  <div ref="container" class="fbx-viewer" @click="logCamera"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const props = defineProps({
  src: { type: String, required: true }, // path to your .fbx file
  background: { type: [String, Number], default: 0x000000 },
  isActive: { type: Boolean, default: false },
});

const container = ref(null);
let renderer, scene, camera, controls, mixer, clock;

function logCamera() {
  console.log("Camera position: ", camera.position);
  console.log("Camera target: ", controls.target);
  console.log(camera);
}

onMounted(() => {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(props.background);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setSize(1500, 1000);
  container.value.appendChild(renderer.domElement);

  // Fallback camera
  camera = new THREE.PerspectiveCamera(
    60,
    container.value.clientWidth / container.value.clientHeight,
    0.01,
    100000
  );

  camera.position.set(45.662048788766846, 12.936460903160285, 13.428404068049197);
  // camera.rotation.set(
  //   0.08323235202060293,
  //   0.632666159109924,
  //   -0.04928904964263669
  // );
  scene.add(camera);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(6.1215239666298595, 12.39541566911373, 7.408852931375124);
  controls.update();

  clock = new THREE.Clock();

  //Ambient
  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2)); // soft white light
  light.intensity = 3;
  scene.add(light);

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
        mixer.timeScale = 1.0;//0.2;
        
        const action = mixer.clipAction(clips[0]);
        action.time = 200 / 30;
        action.play();

        // clips.forEach(clip => {
        //   const action = mixer.clipAction(clip);
        //   action.play();
        // });
      }
    },
    (xhr) =>
      console.log(`Loading: ${((xhr.loaded / xhr.total) * 100).toFixed(1)}%`),
    (err) => console.error("FBX load error:", err)
  );

  console.log(scene);

  // Handle resize
  const onResize = () => {
    const w = container.value.clientWidth;
    const h = container.value.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    renderer.render(scene, camera)

    const w = container.value.clientWidth;
    const h = container.value.clientHeight;
    // renderer.setSize(w, h)
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
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
