import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 19.034613755822456, y: 17.331878208285193, z: -30.117430143680185 },
            target: { x: 5.328989856583915, y: 13.204864895770385, z: -4.222466061702032 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 19.034613755822456, y: 17.331878208285193, z: -30.117430143680185 },
            target: { x: 5.328989856583915, y: 13.204864895770385, z: -4.222466061702032 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 19.034613755822456, y: 17.331878208285193, z: -30.117430143680185 },
            target: { x: 5.328989856583915, y: 13.204864895770385, z: -4.222466061702032 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 16.04508683247353, y: 25.91170460634902, z: -43.538430886574716 },
            target: { x: -5.636104672427969, y: 13.662139589329513, z: 0.4758575272243539 },
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
    ],
    activePoints: [
        {
            name: 'p-ribs1',
            text: 'Ribas',
            meshes: ['ribs1'],
        },
    ],
} as const;