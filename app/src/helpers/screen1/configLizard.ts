import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -63.72712133570435, y: 62.5333516737565, z: 41.94654898518108 },
    iconTarget: { x: -8.009724110288799, y: 7.2026494114777675, z: 0.684557947296877 },
    initialPos: { x: 39.98907896870442, y: 55.6531011307402, z: 83.92276214085487 },
    initialTarget: { x: 13.375797188603645, y: 3.1168572387926754, z: -2.1105047911238173 },
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