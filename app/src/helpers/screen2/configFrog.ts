import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 23.902750856326826, y: 97.7574738287088, z: 18.90645507573629 },
            target: { x: -13.045906086189328, y: 28.473438916699887, z: -0.39892855425511065 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 34.87880331078867, y: 100.90189197052186, z: 23.34800331328042 },
            target: { x: -13.55015676763964, y: 28.387756398793695, z: 0.8474282736240091 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 14.864735524854133, y: 63.541121172347246, z: 10.428999588561338 },
            target: { x: -12.168508903661003, y: 30.835875132633372, z: 1.5130034509860335 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 47.591230827149424, y: 123.4926832463712, z: 20.004082817839297 },
            target: { x: -2.5105286687037585, y: 18.286479340469576, z: -10.005016533241951 },
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