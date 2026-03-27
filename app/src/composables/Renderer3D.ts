import * as THREE from "three";
import RendererManager from "@src/services/RendererManager";
import RendererInstance from "@src/services/RendererInstance";
import type { CameraController } from "./CameraController";

export interface Renderer3D {
    scene: THREE.Scene | null;
    clock: THREE.Clock;

    render(callback: CallableFunction, redraw: boolean): void;
    renderRaw(callback: CallableFunction): void;
    dispose(): void;
    startRendering(parent: HTMLCanvasElement, cameraController: CameraController): void;
    stopRendering(): void;
    getRenderer(): THREE.WebGLRenderer | null;
    registerRenderCallback(callback: CallableFunction): void;
    registerManualRenderFunction(func: CallableFunction): void;
    releaseAllRenderersExceptCurrent(): void;
}

export function useRenderer3D() {
    let renderCallback: CallableFunction = () => { };
    let manualRenderFunc: CallableFunction | null = null;
    let scene: THREE.Scene | null = null;
    let clock: THREE.Clock = new THREE.Clock();
    let renderInstance: RendererInstance | null = null;

    function registerRenderCallback(callback: CallableFunction) {
        renderCallback = callback;
    }

    function registerManualRenderFunction(func: CallableFunction) {
        manualRenderFunc = func;
    }    

    function releaseAllRenderersExceptCurrent() {
        if (renderInstance) {
            RendererManager.releaseAllExcept(renderInstance);
        }
    }

    function startRendering(parent: HTMLElement, cameraController: CameraController): RendererInstance | null {
        if (scene === null) {
            return null;
        }
        
        renderInstance = RendererManager.acquireInstance(parent, scene, cameraController.camera);
        if (renderInstance !== null) {
            renderInstance.registerRenderCallback(renderCallback);
            if (manualRenderFunc) {
                renderInstance.registerManualRenderFunction(manualRenderFunc);
            }
        }

        return renderInstance;
    }

    function stopRendering() {
        if (renderInstance !== null) {
            renderInstance.release();
            renderInstance = null;
        }
    }

    function getRenderer(): THREE.WebGLRenderer | null {
        return renderInstance?.renderer || null;
    }

    function initRenderer3D(): Renderer3D {
        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0, 0, 0);

        function dispose() {
            stopRendering();

            if (scene) {
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
        }

        return {
            scene, clock, renderRaw, render, dispose, startRendering,
            stopRendering, getRenderer, registerRenderCallback, registerManualRenderFunction, releaseAllRenderersExceptCurrent,
        };
    }

    return {
        initRenderer3D,
    };
};