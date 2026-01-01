import * as THREE from "three";

let renderer: THREE.WebGLRenderer | null = null;
const viewManager = new (await import("../services/ViewManagerService")).ViewManagerService();

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

    function render() {
        requestAnimationFrame(() => render());
        if (!renderer) return;

        const views = viewManager.getRenderViews();

        // for (const view of views) {
        //     if (width <= 0 || height <= 0) continue;

        //     const glY = canvasHeight - y - height

        //     renderer.setViewport(x, glY, width, height)
        //     renderer.setScissor(x, glY, width, height)
        //     renderer.clearDepth()

        //     renderer.render(view.scene, view.camera);
        // }
    }

    return {
        createRenderer,
        render,
        addView: viewManager.addView,
    };
};``