import type { CameraConfig, Vector } from "@src/types/CameraConfig";


export default interface Config {
    cameraConfig: Record<string, CameraConfig>;
    pivot: Vector;
    activeBones: Object[];
    activePoints: Object[];
};