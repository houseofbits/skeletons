import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 63.7000898845034, y: 94.03302910353315, z: 9.086492938418361 },
            target: { x: 24.75815702920428, y: 4.979241998798176, z: 12.548233781667474},
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 63.7000898845034, y: 94.03302910353315, z: 9.086492938418361 },
            target: { x: 24.75815702920428, y: 4.979241998798176, z: 12.548233781667474},
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 63.7000898845034, y: 94.03302910353315, z: 9.086492938418361 },
            target: { x: 24.75815702920428, y: 4.979241998798176, z: 12.548233781667474},
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 108.68872857553674, y: 140.2153060652803, z: -37.6581716692118 },
            target: { x: 4.427700033433341, y: 23.56491363842136, z: -10.862715381020948 },
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
            materialColor: Colors.Limbs3,
            meshNames: [
                'limbs3',
            ],
        },    
        {
            materialColor: Colors.Limbs4,
            meshNames: [
                'limbs4',
            ],
        },  
        {
            materialColor: Colors.Limbs5,
            meshNames: [
                'limbs5',
            ],
        },
        {
            materialColor: Colors.Limbs6,
            meshNames: [
                'limbs6',
            ],
        },   
        {
            materialColor: Colors.Limbs7,
            meshNames: [
                'limbs7',
            ],
        },
        {
            materialColor: Colors.Limbs8,
            meshNames: [
                'limbs8',
            ],
        },   
        {
            materialColor: Colors.Limbs9,
            meshNames: [
                'limbs9',
            ],
        },                                
    ],
    activePoints: [
        {
            name: 'p-limbs1',
            text: 'Atslēgas kauls',
            meshes:['limbs7'],
        },
        {
            name: 'p-limbs2',
            text: 'Lāpstiņa',
            meshes:['limbs1'],
        },
        {
            name: 'p-limbs3',
            text: 'Augšdelma kauls',
            meshes:['limbs3'],
        },
        {
            name: 'p-limbs4',
            text: 'Saaugušie spieķa kauls un elkoņa kauls',
            meshes:['limbs4'],
        },
        {
            name: 'p-limbs5',
            text: 'Plaukstas kauli',
            meshes:['limbs8'],
        },
        {
            name: 'p-limbs6',
            text: 'Iegurņa kauli',
            meshes:['limbs2'],
        },
        {
            name: 'p-limbs7',
            text: 'Augšstilba kauls',
            meshes:['limbs5'],
        },
        {
            name: 'p-limbs8',
            text: 'Saaugušie lielais lielakauls un mazais lielakauls',
            meshes:['limbs6'],
        }, 
        {
            name: 'p-limbs9',
            text: 'Pēdas kauli',
            meshes:['limbs9'],
        },                                
    ],
} as const;