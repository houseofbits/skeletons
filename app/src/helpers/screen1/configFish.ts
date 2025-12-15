import Colors from '@src/utils/boneColors';
import CameraConfigTypes from '@src/types/CameraConfigTypes';
import CameraTransitionTime from '@src/helpers/CameraTransitionTime';

export default {
    cameraConfig: {
        [CameraConfigTypes.CAMERA_ICON_RECT]: {
            position: { x: 18.75508848366129, y: 10.798153528102961, z: -34.3554328209584 },
            target: { x: 4.931407191824228, y: 13.57354587346422, z: -3.147678429415257 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_VERT]: {
            position: { x: 13.637005665314508, y: 19.918117533923652, z: -19.318385610715193 },
            target: { x: 3.8299846498441332, y: 14.354343975343303, z: -3.5573918185218214 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_ICON_HORIZ]: {
            position: { x: 10.56845573402677, y: 14.408526570614757, z: -11.202280627151058 },
            target: { x: 6.714191506852486, y: 15.182350504143658, z: -2.5010577891510666 },
            transitionTime: CameraTransitionTime.ICON_RESIZE,
        },
        [CameraConfigTypes.CAMERA_FULL]: {
            position: { x: 8.749449850540575, y: 19.822652758853955, z: -43.79631198062683 },
            target: { x: -8.182742628179767, y: 13.271467885838554, z: 19.059089569127487 },
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
    ],
    activePoints: [
        {
            name: 'p-spine1',
            text: 'Vidukļa skriemeļi',
            meshes:['spine1'],
        },
        {
            name: 'p-spine2',
            text: 'Astes skriemeļi',
            meshes:['spine2'],
        },
    ],
} as const;