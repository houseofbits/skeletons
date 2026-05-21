import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';
// import ViewerLimbs from '@/src/components/Animations/ViewerLimbs.vue';

export default {
    id: 'jackal_3_2',
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 20.66204541890679, y: 5.148240420110619, z: -15.839605399718959 },
            target: { x: 0.23810959750523408, y: 4.331541900055225, z: 10.09265077293789 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 25.33418984533853, y: 2.0940403570796358, z: -21.87008397196763 },
            target: { x: 3.221375586370553, y: 7.334608185545818, z: 4.900712381232665 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 17.20012114654354, y: 2.2383054268641924, z: -21.44446195767277 },
            target: { x: -1.4693456865106096, y: 6.662826255109336, z: 1.1576586388869692 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 27.654825661937082, y: 3.4556412097560845, z: -40.94916815967756 },
            target: { x: -2.2783729923755836, y: 12.402957651533772, z: -1.5472708301110825 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    hilightedBones: [
        {
            name: 'p-limbs1',
            text: 'jackal.limbs1',
            meshes: ['limbs2'],
        },
        {
            name: 'p-limbs2',
            text: 'jackal.limbs2',
            meshes: ['limbs4'],
        },
        {
            name: 'p-limbs3',
            text: 'jackal.limbs3',
            meshes: ['limbs7'],
        },
        {
            name: 'p-limbs4',
            text: 'jackal.limbs4',
            meshes: ['limbs8'],
        },
        {
            name: 'p-limbs5',
            text: 'jackal.limbs5',
            meshes: ['limbs10'],
        },
        {
            name: 'p-limbs6',
            text: 'jackal.limbs6',
            meshes: ['limbs1'],
        },
        {
            name: 'p-limbs7',
            text: 'jackal.limbs7',
            meshes: ['limbs3'],
        },
        {
            name: 'p-limbs8',
            text: 'jackal.limbs8',
            meshes: ['limbs5'],
        },
        {
            name: 'p-limbs9',
            text: 'jackal.limbs9',
            meshes: ['limbs6'],
        },
        {
            name: 'p-limbs10',
            text: 'jackal.limbs10',
            meshes: ['limbs9'],
        },
    ],
    // animationComponent: ViewerLimbs,
    // animationTitle: 'jackal.extremities_animation_title',
    // animationProps: {
    //     initiallyActive: 5,
    // },
    // animationPlaceholderUrl: '/img/3_2_lion.png',
    activePoints: [
        {
            name: '1',
            translationKey: 'jackal.activePoints.limbs1',
            modelNodeName: 'p-limbs1',
        },
        {
            name: '2',
            translationKey: 'jackal.activePoints.limbs2',
            modelNodeName: 'p-limbs2',
        },
        {
            name: '3',
            translationKey: 'jackal.activePoints.limbs3',
            modelNodeName: 'p-limbs3',
        },   
        {
            name: '3',
            translationKey: 'jackal.activePoints.limbs4',
            modelNodeName: 'p-limbs4',
        },                        
    ],
} as const;