import type { CameraConfig, Vector } from "@src/types/CameraConfig";
import { type Component } from "vue";

export default interface Config {
    cameraConfig: Record<string, CameraConfig>;
    pivot: Vector;
    hilightedBones: Object[];
    animationComponent: Component | null;
};