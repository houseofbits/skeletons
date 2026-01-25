import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function use3DCamera(name: string, renderer: THREE.WebGLRenderer, isCameraControlsEnabled: boolean) {
    const camera = new THREE.PerspectiveCamera(
        33,
        1 / 1,
        0.01,
        1500
    );
    camera.name = name;
    camera.position.set(0, 2, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = isCameraControlsEnabled;

    function update(width: number, height: number) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();      
    }

    return {camera, controls, update};
}