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
  // console.log(camera);
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
    0.1,
    100000
  );
  // camera.name = 'Camera001';

  camera.position.set(
    10.028120439794845,
    9.152506263224138,
    14.494749425317412
  );
  camera.rotation.set(
    0.08323235202060293,
    0.632666159109924,
    -0.04928904964263669
  );
  scene.add(camera);

const loader = new GLTFLoader();
loader.load(
    '/models/gltf-test-scene.glb',
    (gltf) => {
        scene.add(gltf.scene);

        gltf.scene.traverse((child) => {
          if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
          }   
          
          if (child.isLight) {
            child.castShadow = true;
          }       
      });      
 
      const cam = scene.getObjectByName("Camera001");
      if (cam) {
        controls = new OrbitControls(cam, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.update();
      }

    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading GLB:', error);
    }
);



  clock = new THREE.Clock();
/*
  //Ambient
  // const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2)); // soft white light
  // light.intensity = 3;
  // scene.add(light);

const loader = new FBXLoader();
  loader.load(
    props.src,
    (object) => {
      //   console.log(object);

        // object.scale.set(0.01, 0.01, 0.01);
      
        // object.scale.set(100, 100, 100);
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

      // for (const child of object.children) {
      //   if (child.isMesh) {
      //     child.castShadow = true;
      //     child.receiveShadow = true;
      //   }

      //   if (child.isLight) {
      //     child.intensity = child.intensity * 800;
      //   }
      // }
      const cam = scene.getObjectByName("Camera001");
      if (cam) {
        const light = new THREE.PointLight(0xffffff, 2);
        light.position.set(0, 5, 0);
        light.decay = 0.6;
        light.castShadow = true;
        light.shadow.mapSize.set(2048, 2048);
        light.shadow.bias = 0.001;
        cam.add(light);

        controls = new OrbitControls(cam, renderer.domElement);
        controls.target.set(0, 15, 0);
        controls.update();
      }


      // // FBX lights
      // const lights = []
      // object.traverse((child) => {
      // if (child.isLight) {
      //     //   child.castShadow = true
      //     //   if (child.shadow) {
      //     //     child.shadow.bias = -0.001
      //     //     child.shadow.mapSize.set(2048, 2048)
      //     //   }
      //     lights.push(child)
      //     scene.add(child)
      // }
      // })


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

      const spotLight = scene.getObjectByName("Spot001");
      if (spotLight) {
        spotLight.shadow.mapSize.set(512, 512);
        // spotLight.shadow.bias = 0.001 
      }
      
      const spotLight2 = scene.getObjectByName("Spot002");
      if (spotLight2) {
        spotLight2.shadow.mapSize.set(2048, 2048);     
        // spotLight2.shadow.bias = -0.001 
      }
    },
    (xhr) =>
      console.log(`Loading: ${((xhr.loaded / xhr.total) * 100).toFixed(1)}%`),
    (err) => console.error("FBX load error:", err)
  );

  // Controls
  // controls = new OrbitControls(camera, renderer.domElement)
  // controls.target.set(0, 1, 0)
  // controls.update()
  // controls.enableDamping = true
  // controls.dampingFactor = 0.05
*/
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
    if (mixer) mixer.update(delta);

    const cam = scene.getObjectByName("Camera001");
    if (cam) {
      renderer.render(scene, cam);

      const w = container.value.clientWidth;
      const h = container.value.clientHeight;
      // renderer.setSize(w, h)
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    }

    // requestAnimationFrame(animate)
    // const delta = clock.getDelta()
    // if (mixer) mixer.update(delta)
    // renderer.render(scene, camera)

    // const w = container.value.clientWidth;
    // const h = container.value.clientHeight;
    // // renderer.setSize(w, h)
    // camera.aspect = w / h
    // camera.updateProjectionMatrix()
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
