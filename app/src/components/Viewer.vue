<template>
    <div ref="container" class="fbx-viewer" @click="logCamera"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = defineProps({
    src: { type: String, required: true }, // path to your .fbx file
    background: { type: [String, Number], default: 0x000000 },
    isActive: { type: Boolean, default: false },
})

const container = ref(null)
let renderer, scene, camera, controls, mixer, clock

function logCamera() {
    console.log(camera);
}

onMounted(() => {
    // Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(props.background)

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // renderer.setSize(container.value.clientWidth, container.value.clientHeight)
    renderer.setSize(1500, 1000);
    container.value.appendChild(renderer.domElement)

    // Fallback camera
    camera = new THREE.PerspectiveCamera(
        60,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
    )
    camera.position.set(
        10.028120439794845,
        9.152506263224138,
        14.494749425317412
    )
    camera.rotation.set(
        0.08323235202060293,
        0.632666159109924,
        -0.04928904964263669
    )
    scene.add(camera)

    console.log(camera);

    // Ground plane (to visualize shadows)
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 })
    )
    plane.rotation.x = -Math.PI / 2
    plane.receiveShadow = true
    scene.add(plane)

    // Loader
    const loader = new FBXLoader()
    clock = new THREE.Clock()

    const light = new THREE.AmbientLight(new THREE.Color(0.1, 0.1, 0.2)); // soft white light
    light.intensity = 3;
    scene.add(light);

    loader.load(
        props.src,
        (object) => {
            console.log(object);


            object.scale.set(0.01, 0.01, 0.01);
            scene.add(object);

            for (const child of object.children) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.shininess = 150;
                    child.material.specular = new THREE.Color(0.6, 0.6, 0.6);
                    child.material.color = new THREE.Color(0.6, 0.6, 0.6);
                }
                if (child.isCamera) {
                    // camera = child;
                    // camera.aspect = container.value.clientWidth / container.value.clientHeight;
                    // camera.updateProjectionMatrix();
                }
                if (child.isLight) {
                    child.intensity = 300;
                    child.color = new THREE.Color(1, 0.95, 0.7);
                }
            }

            // object.traverse((child) => {
            //     // if (child.isMesh) {
            //     //     child.castShadow = true
            //     //     child.receiveShadow = true
            //     //     scene.add(child);                    
            //     // }

            //     if (child.isCamera) {
            // camera = child;
            // camera.aspect = container.value.clientWidth / container.value.clientHeight
            // camera.updateProjectionMatrix()
            //         console.log('Using FBX camera:', camera.name)

            //         // scene.add(camera);
            //     }
            //     if (child.isLight) {
            //         //   child.castShadow = true
            //         //   if (child.shadow) {
            //         //     child.shadow.bias = -0.001
            //         //     child.shadow.mapSize.set(2048, 2048)
            //         //   }
            //         // scene.add(child)
            //     }                
            // })

            // FBX camera
            // const cameras = []
            // object.traverse((child) => {
            //     if (child.isCamera) cameras.push(child)
            // })
            // if (cameras.length > 0) {
            //     camera = cameras[0]
            //     camera.aspect = container.value.clientWidth / container.value.clientHeight
            //     camera.updateProjectionMatrix()
            //     console.log('Using FBX camera:', camera.name)

            //     scene.add(camera);
            // }

            // console.log(object);

            // // FBX lights
            // const lights = []
            // object.traverse((child) => {
            // if (child.isLight) {
            //     //   child.castShadow = true
            //     //   if (child.shadow) {
            //     //     child.shadow.bias = -0.001
            //     //     child.shadow.mapSize.set(2048, 2048)
            //     //   }
            //     lights.push(child)
            //     scene.add(child)
            // }
            // })
            //   console.log(`Added ${lights.length} light(s) from FBX`)

            // Add model to scene
            // scene.add(object)

            // Animation (if available)
            //   if (object.animations?.length > 0) {
            //     mixer = new THREE.AnimationMixer(object)
            //     mixer.clipAction(object.animations[0]).play()
            //   }
        },
        (xhr) => console.log(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`),
        (err) => console.error('FBX load error:', err)
    )

    // Controls
    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 1, 0)
    controls.update()
    // controls.enableDamping = true
    // controls.dampingFactor = 0.05

    // Handle resize
    const onResize = () => {
        const w = container.value.clientWidth
        const h = container.value.clientHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate)
        const delta = clock.getDelta()
        if (mixer) mixer.update(delta)
        renderer.render(scene, camera)

        const w = container.value.clientWidth;
        const h = container.value.clientHeight;
        // renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
    }
    animate()

    onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        controls.dispose()
        scene.traverse(obj => {
            if (obj.geometry) obj.geometry.dispose()
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
                else obj.material.dispose()
            }
        })
    })
})
</script>

<style>
.fbx-viewer {
    width: 100%;
    height: 100%;
    display: block;
    background: #000;
}

.fbx-viewer canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
}
</style>
