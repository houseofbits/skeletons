<template>
  <div>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
    <div @click="logrot" ref="dragContainer1" class="birds-text divider-border-birds-1">
      <span>Pūce</span>
    </div>
    <div ref="dragContainer2" class="birds-text divider-border-birds-2">
      <span>Pingvīns</span>
    </div>
    <div ref="dragContainer3" class="birds-text divider-border-birds-3">
      <span>Strauss</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import ScenePreloadService from "@src/services/ScenePreloadService";
import { useRenderer3D } from "@src/composables/Renderer3D";
import usePivotRotation from "@src/composables/PivotRotation";
import { boneMaterial, boneHilightMaterial } from "@src/helpers/Materials";
import { use3DCamera } from "@src/composables/CameraController";
import { transitionCamera, tweenColor } from "@src/utils/transitions";
import gsap from "gsap";

const { initRenderer3D } = useRenderer3D();

let logrot = () => { };

const props = defineProps({
  isActive: { type: Boolean, default: false },
});

const originalBoneMaterialColor = 14997948;
const hilightedBoneMaterialColor = "#d98602";
const container = ref(null);
const dragContainer1 = ref(null);
const dragContainer2 = ref(null);
const dragContainer3 = ref(null);
let render3d, mixer;
let camOwl = null;
let camPenguin = null;
let camOstritch = null;

const targetAngles = [
  0,
  1.3320000000000003,
  0.8400000000000003,
  0.2160000000000003,
  -0.3209999999999996,
  -0.7259999999999996,
  -0.8999999999999998,
  1.4310000000000003,
];

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rotateToRandomAngle(obj) {
  const targetY = randomFromArray(targetAngles);

  gsap.to(obj.rotation, {
    y: targetY,
    duration: 5,
    ease: "power2.inOut"
  });
}

const cameraSettings = [
  {
    normal: {
      pos: new THREE.Vector3(
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
    closeup: {
      pos: new THREE.Vector3(
        -8.628365241846728,
        2.4335547618327507,
        3.889237824902633
      ),
      target: new THREE.Vector3(
        -16.91719838103788,
        -1.1530105737653942,
        -19.30289393940278
      ),
    },
  },
  {
    normal: {
      pos: new THREE.Vector3(
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
    closeup: {
      pos: new THREE.Vector3(
        2.160405189425645,
        3.0026916183920056,
        6.00020023675096
      ),
      target: new THREE.Vector3(
        -7.923019037316069,
        0.5421007586849574,
        -22.73969174123332
      ),
    },
  },
  {
    normal: {
      pos: new THREE.Vector3(
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
    closeup: {
      pos: new THREE.Vector3(
        12.260167507294886,
        4.722102587643711,
        7.914718561141456
      ),
      target: new THREE.Vector3(
        1.2511659346428716,
        3.7153104122779594,
        -25.967209073087453
      ),
    },
  },
];

function zoomOutTransition(camera, index, model) {
  transitionCamera(
    camera.controls,
    cameraSettings[index].normal.pos,
    cameraSettings[index].normal.target,
    2
  );

  const mesh = model.getObjectByName('ribs1');
  tweenColor(mesh, originalBoneMaterialColor, 1);

  const delay = 2000 + 10000 + Math.random() * 10000;

  setTimeout(() => zoomInTransition(camera, index, model), delay);

  rotateToRandomAngle(model);
}

function zoomInTransition(camera, index, model) {
  transitionCamera(
    camera.controls,
    cameraSettings[index].closeup.pos,
    cameraSettings[index].closeup.target,
    4
  );

  const mesh = model.getObjectByName('ribs1');
  tweenColor(mesh, hilightedBoneMaterialColor, 3);

  const delay = 4000 + 10000 + Math.random() * 15000;

  setTimeout(() => zoomOutTransition(camera, index, model), delay);

  rotateToRandomAngle(model);
}

function logCamera() {
  if (camOwl == null || camPenguin == null || camOstritch == null) {
    return;
  }

  console.log("Camera1 position: ", camOwl.camera.position);
  console.log("Camera1 target: ", camOwl.controls.target);
  console.log("Camera2 position: ", camPenguin.camera.position);
  console.log("Camera2 target: ", camPenguin.controls.target);
  console.log("Camera3 position: ", camOstritch.camera.position);
  console.log("Camera3 target: ", camOstritch.controls.target);
}

onMounted(() => {
  render3d = initRenderer3D(container.value, true);

  const catFallScene = ScenePreloadService.getAsset("birdsScene").clone();
  render3d.scene.add(catFallScene);

  const owl = ScenePreloadService.getAsset("owl");
  const penguin = ScenePreloadService.getAsset("penguin");
  const ostritch = ScenePreloadService.getAsset("ostritch");

  const owlPivotRotation = usePivotRotation(dragContainer1.value);
  owlPivotRotation.setEnabled(true);
  owlPivotRotation.pivot.position.set(-10, 0, 0);
  owlPivotRotation.pivot.add(owl);
  render3d.scene.add(owlPivotRotation.pivot);

  const penguinPivotRotation = usePivotRotation(dragContainer2.value);
  penguinPivotRotation.setEnabled(true);
  penguinPivotRotation.pivot.position.set(0, 0, 0);
  penguinPivotRotation.pivot.add(penguin);
  render3d.scene.add(penguinPivotRotation.pivot);

  const ostritchPivotRotation = usePivotRotation(dragContainer3.value);
  ostritchPivotRotation.setEnabled(true);
  ostritchPivotRotation.pivot.position.set(10, 0, 0);
  ostritchPivotRotation.pivot.add(ostritch);
  render3d.scene.add(ostritchPivotRotation.pivot);

  logrot = () => { console.log("Owl rotation: ", owlPivotRotation.pivot.rotation.y); console.log("Penguin rotation: ", penguinPivotRotation.pivot.rotation.y); console.log("Ostritch rotation: ", ostritchPivotRotation.pivot.rotation.y); };

  render3d.scene.traverse((child) => {
    if (child.isLight) {
      child.shadow.normalBias = 0.05;
      child.shadow.bias = -0.00002;
      child.shadow.mapSize.width = 2048;
      child.shadow.mapSize.height = 2048;

      child.castShadow = true;
    }
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      if (child.name === "body") {
        child.material = boneMaterial.clone();
      }

      if (child.name === "ribs1" || child.name === "ribs2") {
        child.material = boneMaterial.clone();
      }

      if (child.name === "ribs1") {
        child.material = boneMaterial.clone();
      }
    }
  });

  const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.1));
  light.intensity = 2;
  render3d.scene.add(light);

  camOwl = use3DCamera("CamOwl", render3d.renderer, false);
  camPenguin = use3DCamera("CamPenguin", render3d.renderer, false);
  camOstritch = use3DCamera("CamOstritch", render3d.renderer, false);

  render3d.scene.add(camOwl.camera);
  render3d.scene.add(camPenguin.camera);
  render3d.scene.add(camOstritch.camera);

  camOwl.camera.position.copy(cameraSettings[0].normal.pos);
  camOwl.controls.target.copy(cameraSettings[0].normal.target);
  camOwl.camera.fov = 25;
  camOwl.controls.update();

  camPenguin.camera.position.copy(cameraSettings[1].normal.pos);
  camPenguin.controls.target.copy(cameraSettings[1].normal.target);
  camPenguin.camera.fov = 25;
  camPenguin.controls.update();

  camOstritch.camera.position.copy(cameraSettings[2].normal.pos);
  camOstritch.controls.target.copy(cameraSettings[2].normal.target);
  camOstritch.camera.fov = 25;
  camOstritch.controls.update();

  // render3d.render();
  render3d.renderRaw((width, height, delta) => {
    render3d.renderer.setScissorTest(true);

    width = 1920;
    height = 1080;

    const sectioWidth = width / 3;

    render3d.renderer.setViewport(0, 0, sectioWidth, height);
    render3d.renderer.setScissor(0, 0, sectioWidth, height);
    camOwl.update(sectioWidth, height);
    render3d.renderer.render(render3d.scene, camOwl.camera);

    render3d.renderer.setViewport(sectioWidth, 0, sectioWidth, height);
    render3d.renderer.setScissor(sectioWidth, 0, sectioWidth, height);
    camPenguin.update(sectioWidth, height);
    render3d.renderer.render(render3d.scene, camPenguin.camera);

    render3d.renderer.setViewport(sectioWidth * 2, 0, sectioWidth, height);
    render3d.renderer.setScissor(sectioWidth * 2, 0, sectioWidth, height);
    camOstritch.update(sectioWidth, height);
    render3d.renderer.render(render3d.scene, camOstritch.camera);
  });

  zoomInTransition(camOwl, 0, owlPivotRotation.pivot);
  zoomInTransition(camPenguin, 1, penguinPivotRotation.pivot);
  zoomInTransition(camOstritch, 2, ostritchPivotRotation.pivot);

  onBeforeUnmount(render3d.dispose);
});
</script>

<style lang="scss">
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

.divider-border-birds-1 {
  position: absolute;
  height: 1080px;
  width: 639px;
  top: 0;
  left: 0;
}

.divider-border-birds-2 {
  position: absolute;
  height: 1080px;
  width: 639px;
  top: 0;
  left: 640px;
  border-left: solid 1px rgba(180, 180, 180, 0.2);
  border-right: solid 1px rgba(180, 180, 180, 0.2);
}

.divider-border-birds-3 {
  position: absolute;
  height: 1080px;
  width: 639px;
  top: 0;
  left: 1280px;
}

.birds-text {
  display: flex;
  justify-content: left;
  align-items: end;

  & span {
    margin: 32px;
    font-size: 40px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
