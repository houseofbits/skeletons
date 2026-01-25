import * as THREE from "three";

export default function usePivotRotation(domElement: HTMLBaseElement) {
  const pivot = new THREE.Object3D();
  pivot.position.set(0, 0, 0);
  let dragging = false;
  let lastX = 0;
  let isEnabled: boolean = false;
  let enabledCallback: CallableFunction = () => true;


  domElement.addEventListener("pointerdown", (e) => {
    if (!isEnabled || !enabledCallback()) {
      dragging = false;

      return;
    }
    dragging = true;
    lastX = e.clientX;
  });

  domElement.addEventListener("pointermove", (e) => {
    if (!isEnabled || !enabledCallback()) {
      dragging = false;

      return;
    }

    if (!dragging) return;

    const dx = e.clientX - lastX;
    lastX = e.clientX;

    pivot.rotation.y += dx * 0.003;
    if (Math.abs(pivot.rotation.y) > Math.PI * 2) {
      pivot.rotation.y = 0;
    }
  });

  window.addEventListener("pointerup", () => {
    dragging = false;
  });

  function setEnabled(value: boolean) {
    isEnabled = value;
  }

  function setEnabledCallback(callback: CallableFunction) {
    enabledCallback = callback;
  }

  return {
    pivot,
    setEnabled,
    setEnabledCallback,
  };
};