import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: -8.564473504694854, y: 30.389196810644602, z: -11.080561028224164 },
            target: { x: -6.506547403979204, y: 17.283864186143497, z: 3.9887214304778085 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: -30.673031892758637, y: 40.85185514356065, z: -16.07983736573522 },
            target: { x: -6.98602746727867, y: 14.43307608176048, z: 3.9539255058578076 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: -4.281219868220525, y: 33.77337301710993, z: -16.59267180563055 },
            target: { x: -1.1771791516370185, y: 16.880006600135697, z: 2.7653283248277862 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: -6.463938584118981, y: 45.827994985611035, z: -49.11583208843136 },
            target: { x: -7.296985242934663, y: 15.479766859571436, z: -2.8365292701074845 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    activeBones: [
        {
            materialColor: Colors.Spine1,
            meshNames: [
                'spine1',
            ],
        },
        {
            materialColor: Colors.Spine2,
            meshNames: [
                'spine2',
            ],
        },
        {
            materialColor: Colors.Spine3,
            meshNames: [
                'spine3',
            ],
        },
        {
            materialColor: Colors.Spine4,
            meshNames: [
                'spine4',
            ],
        },
        {
            materialColor: Colors.Spine5,
            meshNames: [
                'spine5',
            ],
        },
    ],
    activePoints: [
        {
            name: 'p-spine1',
            text: 'Kakla skriemeļi',
            meshes: ['spine1'],
        },
        {
            name: 'p-spine2',
            text: 'Krūšu skriemeļi',
            meshes: ['spine2'],
        },
        {
            name: 'p-spine3',
            text: 'Jostas skriemeļi',
            meshes: ['spine3'],
        },
        {
            name: 'p-spine4',
            text: 'Krustu skriemeļi',
            meshes: ['spine4'],
        },
        {
            name: 'p-spine5',
            text: 'Astes skriemeļi',
            meshes: ['spine5'],
        },
    ],
} as const;