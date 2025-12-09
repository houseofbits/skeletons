import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 18.75508848366129, y: 10.798153528102961, z: -34.3554328209584 },
    iconTarget: { x: 4.931407191824228, y: 13.57354587346422, z: -3.147678429415257 },
    initialPos: { x: 8.749449850540575, y: 19.822652758853955, z: -43.79631198062683 },
    initialTarget: { x: -8.182742628179767, y: 13.271467885838554, z: 19.059089569127487 },
    pivot: { x: 0, y: 0, z: 0 },
    angleLimits: {
        minPolar: 0.4,
        maxPolar: 1.7,
        minAzim: 1.9,
        maxAzim: -2.1,
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