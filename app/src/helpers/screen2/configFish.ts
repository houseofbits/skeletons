import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: -31.904581180810997, y: 19.65357886138935, z: -21.7869184596216 },
            target: { x: -2.2428055294755613, y: 12.055848054473087, z: 5.448315378491593 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: -37.881625731289695, y: 20.184761757894496, z: -16.944108534410468 },
            target: { x: -2.3503540012566817, y: 12.289051588432503, z: 5.164645085898917 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: -21.733056940274267, y: 14.898952733280597, z: -16.348904293062073 },
            target: { x: -3.804913256681205, y: 11.836475406596525, z: 6.50852716534926 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: -15.426995711400785, y: 16.82473389249073, z: -47.91786795789447 },
            target: { x: -4.874675668581218, y: 14.701507731146926, z: 2.701795841830036 },
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