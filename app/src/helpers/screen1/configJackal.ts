import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -0.05757410634472526, y: 33.568836154138005, z: -28.905946741039145 },
    iconTarget: { x: 2.518758789724701, y: 13.501260164915982, z: -0.09428497418582371 },
    initialPos: {x: -11.291397116892556, y: 55.72653408789138, z: -39.003292095339816 },
    initialTarget: { x: -0.6599708678245436, y: 11.520223830410897, z: -2.1934507498005344 },
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
        {
            materialColor: Colors.Spine5,
            meshNames: [
                'spine5',
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
            text: 'Krūšu skriemeļi',
            meshes:['spine2'],
        },
        {
            name: 'p-spine3',
            text: 'Jostas skriemeļi',
            meshes:['spine3'],
        },
        {
            name: 'p-spine4',
            text: 'Krustu skriemeļi',
            meshes:['spine4'],
        },
        {
            name: 'p-spine5',
            text: 'Astes skriemeļi',
            meshes:['spine5'],
        },                          
    ],
} as const;