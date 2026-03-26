import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface CameraController {
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    update(width: number, height: number): void;
}

export function useCameraController(name: string, parent: HTMLElement, isCameraControlsEnabled: boolean): CameraController {
    const camera = new THREE.PerspectiveCamera(
        33,
        1 / 1,
        0.01,
        1500
    );
    camera.name = name;
    camera.position.set(0, 2, 5);

    const controls = new OrbitControls(camera, parent);
    controls.enabled = isCameraControlsEnabled;

    function update(width: number, height: number) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    return {camera, controls, update};
}