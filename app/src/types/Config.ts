import type { CameraConfig, Vector } from "@src/types/CameraConfig";
import { type Component } from "vue";

export interface HilightedBones {
    name: string;
    text: string;
    meshes: string[];
}

export default interface Config {
    cameraConfig: Record<string, CameraConfig>;
    pivot: Vector;
    hilightedBones: HilightedBones[];
    animationComponent: Component | null;
    animationTitle: string | null;
};