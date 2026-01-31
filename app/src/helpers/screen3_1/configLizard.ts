import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: -12.178000161564526, y: 31.81954516594736, z: 16.131289978544345 },
            target: { x: -4.3374857777862585, y: 7.388833067748076, z: -0.8284132932770835 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 18.232695793990743, y: 19.18243837731503, z: 8.613901277277034 },
            target: { x: -3.603455523821325, y: 5.179676935502573, z: 1.1754962112107232 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 0.4578146949672899, y: 11.867584274741905, z: 8.105593939998975 },
            target: { x: -6.335491174301161, y: 5.721110645845794, z: -5.506510873628822 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: -14.458004161731509, y: 29.028417555336457, z: 30.762167060355136 },
            target: { x: 6.863660245224703, y: 1.6811012285474443, z: -6.957705547354725 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    hilightedBones: [
        {
            name: 'p-ribs1',
            text: 'Ribas',
            meshes: ['ribs1'],
        },
        {
            name: 'p-ribs2',
            text: 'Krūšu kauls',
            meshes: ['ribs2'],
        },
    ],
} as const;