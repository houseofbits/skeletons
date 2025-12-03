import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 36.82839981797783, y: 12.792784060658537, z: -54.937438146091665 },
    iconTarget: { x: 0.9083638704236291, y: 14.235404319105905, z: 0.6072851229177963 },
    initialPos: {x: -9.306754541101249, y: 52.76188772615326, z: -46.79892205504326 },
    initialTarget: { x: 2.7365722788908076, y: 11.438210887913687, z: -3.204073915630083 },
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