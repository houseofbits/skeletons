import * as THREE from "three";

let renderer: THREE.WebGLRenderer | null = null;

export function useRenderer() {
    function createRenderer(canvas: HTMLCanvasElement) {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(1920, 1080);
        canvas.appendChild(renderer.domElement);

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
    }


    return {
        createRenderer
    };
};