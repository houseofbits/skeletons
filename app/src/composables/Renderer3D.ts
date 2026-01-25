import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface Renderer3D {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    clock: THREE.Clock;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    canvas: HTMLCanvasElement;

    render(callback: CallableFunction, redraw: boolean): void;
    renderRaw(callback: CallableFunction): void;
    dispose(): void;
}

export function useRenderer3D() {
    function initRenderer3D(canvas: HTMLCanvasElement, isCameraControlsEnabled: boolean = false): Renderer3D {
        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        canvas.appendChild(renderer.domElement);

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.setSize(1920, 1080);

        const clock = new THREE.Clock();

        const camera = new THREE.PerspectiveCamera(
            33,
            canvas.clientWidth / canvas.clientHeight,
            0.01,
            1500
        );
        camera.name = 'MainCamera';
        camera.position.set(0, 2, 5);
        const controls = new OrbitControls(camera, renderer.domElement);

        controls.enabled = isCameraControlsEnabled;

        scene.add(camera);

        function renderRaw(callback: CallableFunction = () => { }) {
            requestAnimationFrame(() => renderRaw(callback));
            if (canvas) {
                callback(canvas.clientWidth, canvas.clientHeight, clock.getDelta());
            }
        }

        function render(callback: CallableFunction = () => { }, redraw: boolean = true) {
            requestAnimationFrame(() => render(callback));

            callback(clock.getDelta());

            if (!redraw) return;

            if (canvas) {
                const w = canvas.clientWidth;
                const h = canvas.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.render(scene, camera);

            }
        }

        function dispose() {
            renderer.dispose();
            controls.dispose();
            scene.traverse((obj) => {
                if (
                    obj instanceof THREE.Mesh ||
                    obj instanceof THREE.Line ||
                    obj instanceof THREE.Points
                ) {
                    obj.geometry.dispose();
                }
                if (
                    obj instanceof THREE.Mesh ||
                    obj instanceof THREE.Line ||
                    obj instanceof THREE.Points
                ) {
                    const material = obj.material;

                    if (Array.isArray(material)) {
                        material.forEach(m => m.dispose());
                    } else {
                        material.dispose();
                    }
                }
            });
        }

        return { scene, renderer, clock, camera, controls, renderRaw, render, dispose, canvas };
    }

    return {
        initRenderer3D,
    };
};