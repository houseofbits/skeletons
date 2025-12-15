import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 24.436253803778754, y: 18.354535835399286, z: -15.63880857462739 },
            target: { x: 10.669533218680725, y: 20.771361488471403, z: 6.776457860602164 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 29.057165824471646, y: 20.599352227069556, z: -19.201896642745787 },
            target: { x: 11.8073557038137, y: 21.29213886782525, z: 7.472239345161967 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 22.437206840431553, y: 20.344362484407437, z: -19.611441671276076 },
            target: { x: 6.948901922531538, y: 20.96640357703499, z: 4.338801764011514 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 12.006622233505206, y: 12.76337709525958, z: -51.65995412565985 },
            target: { x: -2.8446282811274934, y: 20.319211514900648, z: -1.7051384921905102 },
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