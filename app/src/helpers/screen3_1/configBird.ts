import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 42.93675911601698, y: 20.990570572675985, z: -15.499838768879151 },
            target: { x: 2.577962120678914, y: 22.10639688314709, z: 2.0387348518151276 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 42.93675911601698, y: 20.990570572675985, z: -15.499838768879151 },
            target: { x: 2.577962120678914, y: 22.10639688314709, z: 2.0387348518151276 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 42.93675911601698, y: 20.990570572675985, z: -15.499838768879151 },
            target: { x: 2.577962120678914, y: 22.10639688314709, z: 2.0387348518151276 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 58.363140819382636, y: 27.28842859530082, z: -25.75394263503165 },
            target: { x: -8.12043376773865, y: 26.615913872522086, z: -2.6606930689925816 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },    
    activeBones: [
        {
            materialColor: Colors.Ribs1,
            meshNames: [
                'ribs1',
            ],
        },
        {
            materialColor: Colors.Ribs2,
            meshNames: [
                'ribs2',
            ],
        },                       
    ],
    activePoints: [
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
} as const;