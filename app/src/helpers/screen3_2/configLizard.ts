import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';
// import ViewerLimbs from '@/src/components/Animations/ViewerLimbs.vue';

export default {
    id: 'lizard_3_2',
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 26.19683696958516, y: 20.185683050897588, z: 31.687224659366375 },
            target: { x: 13.716003803955006, y: 3.66249981593652, z: 5.933014847593138 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 29.294943091140176, y: 42.06937367778698, z: 6.791896322293919 },
            target: { x: 14.386704428248942, y: 1.1053456901044854, z: 6.580804466385745 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 23.5873980320389, y: 8.0175933555542, z: 23.727888450622764 },
            target: { x: 15.945691884412911, y: 1.7975066431588833, z: 6.976830197407654 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 16.23148092920129, y: 43.98925574123308, z: 49.48099802988402 },
            target: { x: 7.1941010199911135, y: 4.3100636746769165, z: -2.539650105746088 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    hilightedBones: [
        {
            name: 'p-limbs1',
            text: 'lizard.limbs1',
            meshes: ['limbs2'],
        },
        {
            name: 'p-limbs2',
            text: 'lizard.limbs2',
            meshes: ['limbs1'],
        },
        {
            name: 'p-limbs3',
            text: 'lizard.limbs3',
            meshes: ['limbs4'],
        },
        {
            name: 'p-limbs4',
            text: 'lizard.limbs4',
            meshes: ['limbs5'],
        },
        {
            name: 'p-limbs5',
            text: 'lizard.limbs5',
            meshes: ['limbs6'],
        },
        {
            name: 'p-limbs6',
            text: 'lizard.limbs6',
            meshes: ['limbs7'],
        },
        {
            name: 'p-limbs7',
            text: 'lizard.limbs7',
            meshes: ['limbs3'],
        },
        {
            name: 'p-limbs8',
            text: 'lizard.limbs8',
            meshes: ['limbs8'],
        },
        {
            name: 'p-limbs9',
            text: 'lizard.limbs9',
            meshes: ['limbs9'],
        },
        {
            name: 'p-limbs10',
            text: 'lizard.limbs10',
            meshes: ['limbs10'],
        },
        {
            name: 'p-limbs11',
            text: 'lizard.limbs11',
            meshes: ['limbs11'],
        },                                               
    ],
    // animationComponent: ViewerLimbs,
    // animationTitle: 'lizard.extremities_animation_title',
    // animationProps: {
    //     initiallyActive: 0,
    // },
    // animationPlaceholderUrl: '/img/3_2_bat.png',
    activePoints: [
        {
            name: '1',
            translationKey: 'lizard.activePoints.limbs1',
            modelNodeName: 'p-limbs1',
        },
        {
            name: '2',
            translationKey: 'lizard.activePoints.limbs2',
            modelNodeName: 'p-limbs2',
        },
        {
            name: '3',
            translationKey: 'lizard.activePoints.limbs3',
            modelNodeName: 'p-limbs3',
        },                
    ],
} as const;