import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface Renderer3D {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    clock: THREE.Clock;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;

    render(callback: CallableFunction): void;
    dispose(): void;
}

export function useRenderer3D() {
    function initRenderer3D(canvas: HTMLCanvasElement): Renderer3D {
        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(1500, 1000);
        canvas.appendChild(renderer.domElement);

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        const clock = new THREE.Clock();

        const camera = new THREE.PerspectiveCamera(
            33,
            canvas.clientWidth / canvas.clientHeight,
            0.01,
            1000
        );
        camera.name = 'MainCamera';
        camera.position.set(0, 2, 5);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;
        scene.add(camera);

        function render(callback: CallableFunction = () => {}) {
            requestAnimationFrame(() => render(callback));

            callback(clock.getDelta());
            
            renderer.render(scene, camera);

            if (canvas) {
                const w = canvas.clientWidth;
                const h = canvas.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            }
        }

        function dispose() {
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
        }

        return { scene, renderer, clock, camera, controls, render, dispose };
    }

    return {
        initRenderer3D,
    };
};