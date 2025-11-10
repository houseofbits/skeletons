<template>
    <canvas ref="canvas" width="1924" height="1080" />
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

// import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";


const canvas = ref(null)


onMounted(() => {
    if (!canvas.value) return;

    const el = canvas.value as HTMLCanvasElement;

    var engine = new BABYLON.Engine(el, true, { preserveDrawingBuffer: true, stencil: true });

    el.width = 1924;
    el.height = 1080;

    // registerBuiltInLoaders();
    // const createScene = function () {
    //     const scene = new BABYLON.Scene(engine);

    //     const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, new BABYLON.Vector3(0, 0, 0));
    //     camera.attachControl(canvas, true);
    //     const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    //     BABYLON.ImportMeshAsync("models/dude.babylon", scene).then((result) => {
    //         var dude = result.meshes[0];
    //         dude.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);

    //         scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
    //     });

    //     return scene;
    // };

    const createScene = function () {
        const scene = new BABYLON.Scene(engine);

        scene.createDefaultCameraOrLight(true, true, true);
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        camera.alpha = Math.PI / 2;

        BABYLON.AppendSceneAsync("models/cat-test.glb", scene).then(() => {
            const importedCamera = scene.cameras[1];
            if (importedCamera) {
                scene.activeCamera = importedCamera;
                // scene.activeCamera.attachControl(canvas, true);
            }

            if (scene.lights[0]) {
                scene.lights[0].intensity = 10;
            }

            // console.log(scene.meshes);
        }).catch((error) => {
            console.error("Error loading model:", error);
        });

        return scene;
    };

    var scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener('resize', function () {
        engine.resize();
    });



})
</script>

<style lang="scss" scoped>
canvas {
    outline: none;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    border: none;
}
</style>