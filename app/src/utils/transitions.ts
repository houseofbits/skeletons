import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

export function tweenColor(object: { material: { color: THREE.Color; }; }, hexColor: string | number, duration = 1, ease = "power2.inOut", onComplete: () => void = () => { }) {
    if (!object || !object.material) return;

    const target = new THREE.Color(hexColor);

    gsap.to(object.material.color, {
        r: target.r,
        g: target.g,
        b: target.b,
        duration,
        ease,
        onComplete: onComplete
    });
}

export function transitionCamera(cameraControl: OrbitControls, toPos: THREE.Vector3, toTarget: THREE.Vector3, duration = 1.5, ease = "power2.inOut", onComplete: () => void = () => { }, onUpdate:  () => void = () => { }) {
    gsap.timeline({
        onComplete: onComplete
    })
        .to(cameraControl.target, {
            duration,
            x: toTarget.x,
            y: toTarget.y,
            z: toTarget.z,
            ease,
            onUpdate: () => {
                cameraControl.update();
                onUpdate();
            }
        })
        .to(cameraControl.object.position, {
            duration,
            x: toPos.x,
            y: toPos.y,
            z: toPos.z,
            ease,
            onUpdate: () => {
                cameraControl.update();
                onUpdate();
            }
        }, "<"); // "<" = run at same tie  
}   