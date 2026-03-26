import * as THREE from "three";

export default class RendererInstance {
    id: number;
    isActive: boolean = false;
    rafId: number | null = null;
    running = false;
    renderCallback: CallableFunction = () => { };
    renderer: THREE.WebGLRenderer | null = null;
    clock: THREE.Clock = new THREE.Clock();
    manualRenderFunction: CallableFunction | null = null;

    constructor(id: number) {
        this.id = id;
    }

    acquire(parent: HTMLElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        if (!this.renderer || this.isActive) {
            return;
        }

        parent.querySelectorAll('canvas').forEach(canvas => {
            canvas.remove();
        });

        this.isActive = true;
        parent.appendChild(this.renderer.domElement);


        this.renderer.setScissorTest(false);
        this.renderer.setViewport(0, 0, 1920, 1080);

        this.startRenderLoop(scene, camera);

        // console.log(`Renderer instance ${this.id} acquired.`);
    }

    release() {
        if (!this.isActive) {
            return;
        }

        this.isActive = false;
        this.stopRenderLoop();
        this.manualRenderFunction = null;

        // console.log(`Renderer instance ${this.id} released.`);
    }

    registerRenderCallback(callback: CallableFunction): void {
        this.renderCallback = callback;
    }

    registerManualRenderFunction(func: CallableFunction): void {
        this.manualRenderFunction = func;
    }

    async createRendererAsync() {
        this.createRenderer();
    }

    createRenderer(): void {
        if (this.renderer) {
            return;
        }

        this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.setSize(1920, 1080);
    }

    destroyRenderer() {
        if (this.renderer) {
            this.stopRenderLoop();

            this.renderer.dispose();
            this.renderer.forceContextLoss();
            const canvas = this.renderer.domElement;
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            this.renderer = null;
        }
    }

    getRenderer(): THREE.WebGLRenderer | null {
        return this.renderer;
    }

    private startRenderLoop(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        if (this.running) return;
        this.running = true;
        this.renderLoop(scene, camera);
    }

    private stopRenderLoop() {
        this.running = false;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    private renderLoop(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        if (!this.running || !this.renderer) {
            return;
        }

        this.rafId = requestAnimationFrame(() => this.renderLoop(scene, camera));

        const dt = this.clock.getDelta();

        this.renderCallback(dt);

        const w = this.renderer.domElement.clientWidth;
        const h = this.renderer.domElement.clientHeight;

        if (w === 0 || h === 0) {
            return;
        }

        if (this.manualRenderFunction) {
            this.manualRenderFunction(this.renderer, w, h, dt);

            return;
        }

        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        this.renderer.render(scene, camera);
    }
}
