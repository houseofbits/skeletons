import type { CameraConfig, Vector } from "@src/types/CameraConfig";
import { type Component } from "vue";

export interface HilightedBones {
    name: string;
    text: string;
    meshes: string[];
}

export interface ActivePoint {
    name: string;
    translationKey: string;
    modelNodeName: string;
}

export default interface Config {
    id: string;
    cameraConfig: Record<string, CameraConfig>;
    pivot: Vector;
    hilightedBones: HilightedBones[];
    animationComponent: Component | null;
    animationTitle: string | null;
    animationProps: Record<string, any> | null;
    animationPlaceholderUrl: string | null;
    activePoints: ActivePoint[];
};