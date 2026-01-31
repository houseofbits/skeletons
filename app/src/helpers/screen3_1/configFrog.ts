import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 41.31022676904821, y: 44.25398881823709, z: 12.939235814232543 },
            target: { x: 6.577549607481279, y: 27.090761733043585, z: 0.5805596283374074 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: {x: 54.71236712991222, y: 48.32269169759183, z: 11.970934321864249 },
            target: { x: 0.6880264674178467, y: 22.211961323558388, z: 5.414089737397373 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: -9.10580377028762, y: 21.722276819499164, z: -16.439850367624153},
            target: { x: 2.518406120482876, y: 24.3308804171335, z: -1.969532016329098},
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: -44.08747477067847, y: 18.892108627842056, z: 82.88906805410633 },
            target: { x: 12.952120609940579, y: 24.17577283967622, z: 1.1856644233458875 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    hilightedBones: [
        {
            name: 'p-ribs1',
            text: 'Krūšu kauls',
            meshes: ['ribs1', 'ribs2'],
        },
    ],
} as const;