import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 24.14894193391892, y: 12.025567958686086, z: -10.209549400862834 },
    iconTarget: { x: 18.36897967821289, y: 13.186015936493282, z: 2.8390473267670404 },
    initialPos: { x: 20.21775168512047, y: 18.997993187651858, z: -23.576936191894923 },
    initialTarget: { x: 6.732841933363466, y: 15.610137794051514, z: 9.982612984374704 },
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