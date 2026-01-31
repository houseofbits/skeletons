import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 40.25164172256652, y: 9.64762241442891, z: -10.557422271059089 },
            target: { x: 9.548492238744624, y: 9.340022170816233, z: -0.8837419587655696 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 49.321289896341554, y: 14.261439414975783, z: -9.860266955897629 },
            target: { x: 9.579966394883794, y: 12.207686168894137, z: -0.5720873504004019 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 21.502192756792248, y: 50.291324029054785, z: -31.897429943520898 },
            target: { x: 11.88607894742827, y: 39.85596340009585, z: 16.763210870439657 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 107.23992005875974, y: 43.496726416525064, z: -57.14246104105284 },
            target: { x: -2.6920155180973424, y: 30.54173594863633, z: -11.633814542342346 },
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
        {
            materialColor: Colors.Limbs10,
            meshNames: [
                'limbs10',
            ],
        },
        {
            materialColor: Colors.Limbs11,
            meshNames: [
                'limbs11',
            ],
        },
    ],
    activePoints: [
        {
            name: 'p-limbs1',
            text: 'Atslēgas kauls',
            meshes: ['limbs6'],
        },
        {
            name: 'p-limbs2',
            text: 'Lāpstiņa',
            meshes: ['limbs1'],
        },
        {
            name: 'p-limbs3',
            text: 'Augšdelma kauls',
            meshes: ['limbs2'],
        },
        {
            name: 'p-limbs4',
            text: 'Elkoņa kauls',
            meshes: ['limbs4'],
        },
        {
            name: 'p-limbs5',
            text: 'Spieķa kauls',
            meshes: ['limbs3'],
        },
        {
            name: 'p-limbs6',
            text: 'Plaukstas kauli',
            meshes: ['limbs5'],
        },
        {
            name: 'p-limbs7',
            text: 'Iegurņa kauli',
            meshes: ['limbs7'],
        },
        {
            name: 'p-limbs8',
            text: 'Augšstilba kauls',
            meshes: ['limbs8'],
        },
        {
            name: 'p-limbs9',
            text: 'Lielais lielakauls',
            meshes: ['limbs9'],
        },
        {
            name: 'p-limbs10',
            text: 'Mazais lielakauls',
            meshes: ['limbs10'],
        },
        {
            name: 'p-limbs11',
            text: 'Pēdas kauli',
            meshes: ['limbs11'],
        },
    ],
} as const;