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
                    const model = await this.loadAsset(url);
                    if (model) {
                        this.storeAsset(key, model);
                    } else {
                        this.log(`Unrecognized ext: ${url}`);
                    }
                })
        );

        this.promise.then(() => {
            console.log('all promises done');
            this.ready.value = true;
            this.log("All assets fully loaded.");
        });

        return this.promise;
    }

    async loadAssetFromData(ext: string, key: string, data: ArrayBuffer) {
        let model = null;
        if (ext === 'fbx') {
            model = await this.loadFBXFromArrayBuffer(data);
        }
        if (ext === 'glb') {
            const scene = await this.loadGLBFromArrayBuffer(data);
            if (scene) {
                model = scene.scene;
                model.animations = scene.animations;
            }
        }

        if (model) {
            this.storeAsset(key, model);
        } else {
            this.log(`Unrecognized ext: ${ext}`);
        }
    }

    private async loadAsset(url: string): Promise<null | THREE.Group | GLTF> {
        const ext = this.getExtension(url);

        let model = null;

        if (ext === 'fbx') {
            this.log(`Loading: ${url}`);

            model = await this.fbxLoader.loadAsync(url);
        }

        if (ext === 'glb') {
            this.log(`Loading: ${url}`);

            const scene = await this.gltfLoader.loadAsync(url);
            model = scene.scene;
            model.animations = scene.animations;
        }

        return model;
    }

    private storeAsset(key: string, model: THREE.Group | GLTF) {
        this.cache.set(key, model);

        console.log('Store asset ', key, model);

        this.log(`Cached: ${key}`);
    }

    getAsset(name: string) {
        const asset = this.cache.get(name);
        console.log('get asset', name, asset, this.promise);
        if (!asset) {
            this.log(`Warning: Asset "${name}" not found in cache.`);

            return null;
        }

        return asset;
    }

    private log(message: string) {
        this.logs.value.push(message);
    }

    private getExtension(filename: string): string {
        return filename.split('.').pop()?.toLowerCase() ?? '';
    }

    private loadFBXFromArrayBuffer(data: ArrayBuffer): Promise<THREE.Group> {
        return new Promise((resolve, reject) => {
            try {
                const object = this.fbxLoader.parse(data, '');
                resolve(object);
            } catch (err) {
                reject(err);
            }
        });
    }

    private loadGLBFromArrayBuffer(data: ArrayBuffer): Promise<GLTF | null> {
        return new Promise((resolve, reject) => {
            this.gltfLoader.parse(
                data,
                '',
                (gltf) => resolve(gltf),
                (err) => reject(err)
            );
        });
    }
}

export default new ScenePreloadService();