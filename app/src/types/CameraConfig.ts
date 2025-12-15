
export interface Vector {
    x: number;
    y: number;
    z: number;
};

export interface CameraConfig {
    position: Vector;
    target: Vector;
    transitionTime: number;
}
