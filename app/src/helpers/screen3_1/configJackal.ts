import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';
import ViewerDog from '@/src/components/Animations/ViewerDog.vue';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 18.63151142617179, y: 7.730873935987186, z: -10.093149331273214 },
            target: { x: 3.790408955473068, y: 14.609308491736972, z: 2.8580341467630377 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 26.14029535389646, y: 7.1052447661118645, z: -18.219329849376695 },
            target: { x: 4.380152478830284, y: 17.688306394248396, z: 2.8749237711662685 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 15.556273210333764, y: 14.220988801767835, z: -16.75423871879573 },
            target: { x: 1.3923549214065867, y: 16.52564647250651, z: 0.3932560887577168 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 23.655633253404964, y: 13.19225505354369, z: -32.52693296596438 },
            target: { x: -4.103615282735973, y: 15.507846525989118, z: -2.644189964128354 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    hilightedBones: [
        {
            name: 'p-ribs1',
            text: 'Ribas',
            meshes: ['ribs1'],
        },
        {
            name: 'p-ribs2',
            text: 'Krūšu kauls',
            meshes: ['ribs2'],
        },
    ],
    animationComponent: ViewerDog,
    animationTitle: 'Suņa elpošana',
} as const;