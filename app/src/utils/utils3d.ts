import * as THREE from "three";

export function toScreenPosition(obj: { updateMatrixWorld: () => void; matrixWorld: THREE.Matrix4; }, camera: THREE.Camera, renderer: { domElement: { clientWidth: number; clientHeight: number; }; }) {
    const vector = new THREE.Vector3();

    // Get object's position in world space
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);

    // Project to NDC
    vector.project(camera);

    // Convert NDC to screen coordinates
    const widthHalf  = renderer.domElement.clientWidth  / 2;
    const heightHalf = renderer.domElement.clientHeight / 2;

    return {
        x: ( vector.x * widthHalf ) + widthHalf,
        y: (-vector.y * heightHalf) + heightHalf
    };
}