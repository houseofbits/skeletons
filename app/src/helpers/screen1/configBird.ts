import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 41.25455031645269, y: 43.197324344240684, z: 15.425130123199303 },
    iconTarget: { x: 4.6715147554765935, y: 30.968244277392273, z: 5.500461994294596 },
    initialPos: { x: 89.14701878444652, y: 75.84135272596423, z: 24.990320242266403 },
    initialTarget: { x: 4.16628861864094, y: 28.408985560393145, z: -7.367553093417303 },
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
            meshes:['spine1'],
        },
        {
            name: 'p-spine2',
            text: 'Krūšu skriemeļi',
            meshes:['spine2'],
        },
        {
            name: 'p-spine3',
            text: 'Saliktais krustu kauls',
            meshes:['spine3'],
        },
        {
            name: 'p-spine4',
            text: 'Astes skriemeļi',
            meshes:['spine4'],
        },                  
    ],
} as const;