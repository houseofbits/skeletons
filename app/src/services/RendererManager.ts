import RendererInstance from "./RendererInstance";
import * as THREE from "three";

class RendererManager {
    private static readonly NUM_RENDERERS = 16;

    private renderers: Array<RendererInstance> = [];

    constructor() {
        for (let i = 0; i < RendererManager.NUM_RENDERERS; i++) {
            const renderer = this.createRenderer(i);
            renderer.createRenderer();
        }
    }

    acquireInstance(parent: HTMLElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera): RendererInstance | null {
        const instance = this.renderers.find(r => r.isActive === false);
        if (instance) {
            instance.acquire(parent, scene, camera);

            return instance;
        } else {
            console.log("No available renderer instances!");
        }

        return null;
    }

    private createRenderer(id: number): RendererInstance {
        const instance = new RendererInstance(id);
        this.renderers.push(instance);
        return instance;
    }
};

export default new RendererManager();