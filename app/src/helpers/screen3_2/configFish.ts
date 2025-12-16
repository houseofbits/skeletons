import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: -5.675055793563856, y: 13.213968472505105, z: -39.82023332371419  },
            target: { x: -0.7110328359560995, y: 12.309877034723371, z: -1.8178577655644967},
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: -5.675055793563856, y: 13.213968472505105, z: -39.82023332371419  },
            target: { x: -0.7110328359560995, y: 12.309877034723371, z: -1.8178577655644967},
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: -5.675055793563856, y: 13.213968472505105, z: -39.82023332371419  },
            target: { x: -0.7110328359560995, y: 12.309877034723371, z: -1.8178577655644967},
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: -4.8131919068347795, y: 5.512430272562263, z: -43.417203894175046  },
            target: { x: -4.684843432799157, y: 19.045216687589274, z: 24.21359383814628 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    activeBones: [
        {
            materialColor: Colors.Limbs1,
            meshNames: [
                'limbs1',
            ],
        },
        {
            materialColor: Colors.Limbs2,
            meshNames: [
                'limbs2',
            ],
        },
        {
            materialColor: Colors.Limbs2,
            meshNames: [
                'limbs3',
            ],
        },
    ],
    activePoints: [
        {
            name: 'p-limbs1',
            text: 'Krūšu spura ar plecu joslu',
            meshes:['limbs1'],
        },
        {
            name: 'p-limbs2',
            text: 'Vēdera spura ar iegurņa joslu',
            meshes:['limbs2', 'limbs3'],
        },
    ],
} as const;