import * as THREE from "three";

export default function usePivotRotation(domElement: HTMLBaseElement) {
  const pivot = new THREE.Object3D();
  pivot.position.set(0, 0, 0);
  let dragging = false;
  let lastX = 0;
  let isEnabled: boolean = false;
  let enabledCallback: CallableFunction = () => true;
  let onRotationCallback: CallableFunction = () => true;
  let minLimit: number|null = null;
  let maxLimit: number|null = null;

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

    if (minLimit !== null && pivot.rotation.y < minLimit) {
      pivot.rotation.y = minLimit;
    }
    if (maxLimit !== null && pivot.rotation.y > maxLimit) {
      pivot.rotation.y = maxLimit;
    }

    onRotationCallback();
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

  function setOnRotationCallback(callback: CallableFunction) {
    onRotationCallback = callback;
  }

  function setLimits(min: number|null, max: number|null) {
    minLimit = min;
    maxLimit = max;
  }

  return {
    pivot,
    setEnabled,
    setEnabledCallback,
    setOnRotationCallback,
    setLimits,
  };
};