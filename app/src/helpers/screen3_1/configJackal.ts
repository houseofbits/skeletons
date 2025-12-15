import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 15.556273210333764, y: 14.220988801767835, z: -16.75423871879573 },
            target: { x: 1.3923549214065867, y: 16.52564647250651, z: 0.3932560887577168 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 15.556273210333764, y: 14.220988801767835, z: -16.75423871879573 },
            target: { x: 1.3923549214065867, y: 16.52564647250651, z: 0.3932560887577168 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 15.556273210333764, y: 14.220988801767835, z: -16.75423871879573 },
            target: { x: 1.3923549214065867, y: 16.52564647250651, z: 0.3932560887577168 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 23.655633253404964, y: 13.19225505354369, z: -32.52693296596438 },
            target: { x: -4.103615282735973, y: 15.507846525989118, z: -2.644189964128354 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    activeBones: [
        {
            materialColor: Colors.Ribs1,
            meshNames: [
                'ribs1',
            ],
        },
        {
            materialColor: Colors.Ribs2,
            meshNames: [
                'ribs2',
            ],
        },
    ],
    activePoints: [
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