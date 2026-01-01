import * as THREE from "three";

class View {
    id: string;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    domElement: HTMLElement;

    private x: number = 0;
    private y: number = 0;
    private width: number = 0;
    private height: number = 0;
    private zIndex: number = 0;

    constructor(id: string, scene: THREE.Scene, camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
        this.id = id;
        this.scene = scene;
        this.camera = camera;
        this.domElement = domElement;
    }

    updateDimensions() {
        const rect = this.domElement.getBoundingClientRect();
        this.x = rect.left;
        this.y = rect.top;
        this.width = rect.width;
        this.height = rect.height;
        this.zIndex = parseInt(window.getComputedStyle(this.domElement).zIndex) || 0;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    static compareZIndex(a: View, b: View): number {
        return a.zIndex - b.zIndex;
    }
};

export class ViewManagerService {
    private views: View[] = [];

    addView(id: string, domElement: HTMLElement): View {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            33,
            domElement.clientWidth / domElement.clientHeight,
            0.01,
            1500
        );
        const view = new View(id, scene, camera, domElement);

        this.views.push(view);

        return view;
    }

    getRenderViews(): View[] {
        this.views.forEach(view => view.updateDimensions());
        this.views.sort(View.compareZIndex);

        return this.views;
    }
}