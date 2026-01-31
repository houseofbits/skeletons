import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 39.47612459459036, y: 17.519472292269857, z: 19.268208508638374 },
            target: { x: 4.81228053885079, y: 30.345764483871704, z: 4.426642839850045 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 27.659005826915703, y: 25.909567671713344, z: 19.120376641881855 },
            target: { x: 5.927762757350159, y: 34.77522798406746, z: 4.730311957911032 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 12.402478313860431, y: 36.06242359731407, z: 4.959444188868098 },
            target: { x: 6.86651996034324, y: 35.512876792098545, z: 2.5891851572590987 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 85.34982745259775, y: 51.56379908531672, z: -63.43047725110134 },
            target: { x: 0.17759753100390357, y: 29.865559895464745, z: -10.577250410214662 },
            transitionTime: CameraTransitionTime.ICON_TO_FULLSCREEN,
        },
    },
    hilightedBones: [
        {
            name: 'p-spine1',
            text: 'Kakla skriemelis',
            meshes: ['spine1'],
        },
        {
            name: 'p-spine2',
            text: 'Krūšu skriemeļi',
            meshes: ['spine2'],
        },
        {
            name: 'p-spine3',
            text: 'Saliktais krustu kauls',
            meshes: ['spine3'],
        },
        {
            name: 'p-spine4',
            text: 'Astes skriemeļi',
            meshes: ['spine4'],
        },
    ],
} as const;