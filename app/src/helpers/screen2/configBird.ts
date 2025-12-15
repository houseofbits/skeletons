import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: -5.113540403168997, y: 56.11056349416829, z: -29.20092549443305 },
            target: { x: -7.160747333672897, y: 46.98649494893773, z: 7.663966443083119 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: -8.106135062568192, y: 55.56246666743621, z: -39.22732079089366 },
            target: { x: -5.479868761656156, y: 46.10125434264708, z: 8.421169112653832 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: -3.435899386509335, y: 55.973159975933, z: -21.199893628945127 },
            target: { x: -9.58379836511188, y: 47.899697014116484, z: 6.504351434305727 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 27.621875756864533, y: 48.7062871489385, z: -54.521850581321345 },
            target: { x: -6.5454666037165286, y: 42.95152983091002, z: 9.257364530849461 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    activeBones: [
        {
            materialColor: Colors.Skull1,
            meshNames: [
                'skull1',
            ],
        },
        {
            materialColor: Colors.Skull2,
            meshNames: [
                'skull2',
            ],
        },                    
    ],
    activePoints: [
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