import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';
import ViewerBirds from '@/src/components/Animations/ViewerBirds.vue';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 42.93675911601698, y: 20.990570572675985, z: -15.499838768879151 },
            target: { x: 2.577962120678914, y: 22.10639688314709, z: 2.0387348518151276 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 39.361435347890264, y: 26.05159241045628, z: -13.584099964816064 },
            target: { x: -3.4705224199583635, y: 24.350942914441287, z: -3.5735898389784957 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 6.376767725816275, y: 41.38567817899029, z: -13.333424581285962 },
            target: { x: -1.9362702843900579, y: 23.127676317244177, z: -1.24324029108471 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 58.363140819382636, y: 27.28842859530082, z: -25.75394263503165 },
            target: { x: -8.12043376773865, y: 26.615913872522086, z: -2.6606930689925816 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },    
    hilightedBones: [
        {
            name: 'p-ribs1',
            text: 'Ribas',
            meshes:['ribs1'],
        },
        {
            name: 'p-ribs2',
            text: 'Krūšu kauls',
            meshes:['ribs2'],
        },        
    ],
    animationComponent: ViewerBirds,
    animationTitle: 'Ķīļa kauls',
} as const;