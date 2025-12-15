import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 50.13757743321303, y: 112.59172593681927, z: 15.029812054632892 },
            target: { x: 15.893066027614113, y: 8.197787396155356, z: 9.654987763599996 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 32.482465030385285, y: 90.28708648845756, z: 3.019484827105042 },
            target: { x: 6.721805157683754, y: 11.756056751585906, z: -1.0237622438458591 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 28.243033779942365, y: 56.6591580102059, z: 3.0206251503508152 },
            target: { x: 3.805529389940814, y: 13.734964268868143, z: 1.488836341980968 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 79.47128843032702, y: 125.88145427282632, z: 9.665345504456912 },
            target: { x: 27.309173610762237, y: 27.56309877884942, z: -9.537745590128772 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },    
    activeBones: [
        {
            materialColor: Colors.Spine1,
            meshNames: [
                'spine1',
            ],
        },
        {
            materialColor: Colors.Spine2,
            meshNames: [
                'spine2',
            ],
        },
        {
            materialColor: Colors.Spine3,
            meshNames: [
                'spine3',
            ],
        },
        {
            materialColor: Colors.Spine4,
            meshNames: [
                'spine4',
            ],
        },
    ],
    activePoints: [
        {
            name: 'p-spine1',
            text: 'Kakla skriemelis',
            meshes: ['spine3'],
        },
        {
            name: 'p-spine2',
            text: 'Vidukļa skriemeļi',
            meshes: ['spine1'],
        },
        {
            name: 'p-spine3',
            text: 'Krustu skriemelis',
            meshes: ['spine2'],
        },
        {
            name: 'p-spine4',
            text: 'Urostils - saaugušie astes skriemeļi',
            meshes: ['spine4'],
        },
    ],
} as const;