import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ref } from "vue";

export type ModelTuple = readonly [string, string];
export type Models = readonly ModelTuple[];

class ScenePreloadService {
    private manager: THREE.LoadingManager;
    private fbxLoader: FBXLoader;
    private gltfLoader: GLTFLoader;
    private cache: Map<string, THREE.Group | GLTF>;
    public ready = ref<boolean>(false);
    private promise: Promise<void[]> | null = null;
    public progress = ref(0);
    public logs = ref<string[]>([]);

    constructor() {
        this.manager = new THREE.LoadingManager();
        this.fbxLoader = new FBXLoader(this.manager);
        this.gltfLoader = new GLTFLoader(this.manager);
        this.cache = new Map();
        this.ready = ref(false);

        this.manager.onLoad = () => {
            this.ready.value = true;
            this.log("All assets fully loaded.");
        };

        this.manager.onProgress = (url: any, loaded: number, total: number) => {
            this.progress.value = Math.round((loaded / total) * 100);
            this.log(`Loaded: ${url} (${loaded}/${total})`);
        };
    }

    preloadAssets(assets: Models) {
        if (this.promise) return this.promise;

        this.log("Starting asset preloading...");

        this.promise = Promise.all(
            assets
                .filter(([key,]) => {
                    const asset = this.getAsset(key);

                    return !asset;
                })
                .map(async ([key, url]) => {
                    const ext = this.getExtension(url);

                    let model = null;

                    if (ext === 'fbx') {
                        this.log(`Loading: ${url}`);

                        model = await this.fbxLoader.loadAsync(url);
                    }

                    if (ext === 'gltf' || ext === 'glb') {
                        this.log(`Loading: ${url}`);

                        const scene = await this.gltfLoader.loadAsync(url);
                        model = scene.scene;
                        model.animations = scene.animations;
                    }

                    if (model) {
                        this.cache.set(key, model);

                        this.log(`Cached: ${key}`);
                    } else {
                        this.log(`Unrecognized ext: ${url}`);
                    }
                })
        );

        return this.promise;
    }

    getAsset(name: string) {
        const asset = this.cache.get(name);
        if (!asset) {
            this.log(`Warning: Asset "${name}" not found in cache.`);

            return null;
        }

        return asset;
    }

    private log(message: string) {
        this.logs.value.push(message);
    }

    private getExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }
}

export default new ScenePreloadService();