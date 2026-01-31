import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: -23.483845792004942, y: 29.600156398830755, z: 16.352652196516445 },
            target: { x: -16.719518024548744, y: 11.804356947160258, z: -2.772673889384429 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: -22.05861979477463, y: 45.329091093011755, z: 7.366246355620701 },
            target: { x: -18.052144941620167, y: 10.213846025018695, z: -0.22910331597575748 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: -19.13467905284829, y: 25.219923949982494, z: 16.148606606745766 },
            target: { x: -15.505660352593756, y: 12.531370868465789, z: -2.8551540743134165 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: -26.604756542976073, y: 45.37958880157301, z: 33.366865793446664 },
            target: { x: 6.016617298858141, y: -9.889778646698813, z: -6.710010306822934 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    hilightedBones: [
        {
            name: 'p-skull1',
            text: 'Smadzeņu nodalījums',
            meshes:['skull1'],
        },
        {
            name: 'p-skull2',
            text: 'Sejas nodalījums',
            meshes:['skull2'],
        },              
    ],
} as const;