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

export function transitionCamera(cameraControl: OrbitControls, toPos: THREE.Vector3, toTarget: THREE.Vector3, duration = 1.5, ease = "power2.inOut", onComplete: () => void = () => { }, onUpdate: () => void = () => { }) {
    const startPos = cameraControl.object.position.clone();
    const startTarget = cameraControl.target.clone();
    const s = { t: 0 };

    gsap.to(s, {
        duration,
        t: 1,
        ease,
        onUpdate: () => {
            onUpdate();
            cameraControl.object.position.lerpVectors(startPos, toPos, s.t);
            cameraControl.target.lerpVectors(startTarget, toTarget, s.t);
            cameraControl.update();            
        },
        onComplete: onComplete
    });
}   

export function transitionMaterial(material: THREE.MeshPhongMaterial, targetMaterial: THREE.MeshPhongMaterial, duration = 1, ease = "power2.inOut", properties: Object) {
    const timeline = gsap.timeline(properties);

    timeline.to( material, {
        shininess: targetMaterial.shininess,
        duration,
        ease,
    }).
    to(material.color, {
        r: targetMaterial.color.r,
        g: targetMaterial.color.g,
        b: targetMaterial.color.b,
        duration,
        ease,
    }, "<").
    to(material.specular, {
        r: targetMaterial.specular.r,
        g: targetMaterial.specular.g,
        b: targetMaterial.specular.b,
        duration,
        ease,
    }, "<");
}