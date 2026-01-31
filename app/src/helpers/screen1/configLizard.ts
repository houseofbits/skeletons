import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 19.333239204169303, y: 24.22583003620996, z: 17.550501838298768 },
            target: { x: 1.839498531434045, y: 4.653770881313899, z: -3.9075224007222746 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 19.753780174892107, y: 23.39098305431207, z: 7.23185897596802 },
            target: { x: 1.24462990645014, y: 4.435145427521636, z: -2.394317714579671 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 10.798918326783351, y: 18.731622879638678, z: 10.029167126870064 },
            target: { x: 3.0896261561024785, y: 4.232682723459757, z: -4.156524507842792 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 8.480942490590865, y: 50.99222527604927, z: 62.48318307780289 },
            target: { x: 4.4864248207125135, y: 3.5049635509143404, z: -6.836965202328727 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    hilightedBones: [
        {
            name: 'p-spine1',
            text: 'Kakla skriemeļi',
            meshes:['spine1'],
        },
        {
            name: 'p-spine2',
            text: 'Krūšu un jostas skriemeļi',
            meshes:['spine2'],
        },
        {
            name: 'p-spine3',
            text: 'Krustu skriemeļi',
            meshes:['spine3'],
        },
        {
            name: 'p-spine4',
            text: 'Astes skriemeļi',
            meshes:['spine4'],
        },                       
    ],
} as const;