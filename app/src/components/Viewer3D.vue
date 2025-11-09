<template>
    <canvas ref="canvas" width="800" height="600" />
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as BABYLON from 'babylonjs';

const canvas = ref(null)


onMounted(() => {
    const el = canvas.value
    if (!el) return;

    var engine = new BABYLON.Engine(el, true, { preserveDrawingBuffer: true, stencil: true });

    const createScene = function () {
        const scene = new BABYLON.Scene(engine);

        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

        BABYLON.ImportMeshAsync("models/dude.babylon", scene).then((result) => {
            var dude = result.meshes[0];
            dude.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);

            scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
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