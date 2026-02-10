import * as THREE from "three";

const boneMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0.7758223476257268, 0.6938718871722084, 0.5028864818811943),
    shininess: 64,
    // specular: new THREE.Color(0.06743726399864605, 0.06743726399864605, 0.06743726399864605),
    specular: new THREE.Color(0.1, 0.1, 0.1),
    reflectivity: 1,
    name: 'boneMaterial',
});

const boneHilightMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color("#d98602"),
    shininess: 32,
    // specular: new THREE.Color(0.06743726399864605, 0.06743726399864605, 0.06743726399864605),
    specular: new THREE.Color(0.2, 0.2, 0.2),
    reflectivity: 1,
    name: 'hilightedMaterial',
});

export { boneMaterial, boneHilightMaterial };