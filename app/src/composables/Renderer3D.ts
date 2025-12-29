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
        renderer.setSize(1500, 1000);
        canvas.appendChild(renderer.domElement);

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        const clock = new THREE.Clock();

        const camera = new THREE.PerspectiveCamera(
            33,
            canvas.clientWidth / canvas.clientHeight,
            0.01,
            500
        );
        camera.name = 'MainCamera';
        camera.position.set(0, 2, 5);
        const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;
        // controls.dampingFactor = 0.3;

        controls.enabled = isCameraControlsEnabled;
        
        scene.add(camera);

        function render(callback: CallableFunction = () => { }, redraw: boolean = true) {
            requestAnimationFrame(() => render(callback));

            callback(clock.getDelta());

            if (!redraw) return;

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

        return { scene, renderer, clock, camera, controls, render, dispose, canvas };
    }

    return {
        initRenderer3D,
    };
};