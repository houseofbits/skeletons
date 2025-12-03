import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 6.457431458518762, y: 28.50531896915182, z: 23.077471270839908 },
    iconTarget: { x: -4.541444770995826, y: 7.356613581197305, z: -1.0326977171908949 },
    initialPos: { x: 36.493332267942115, y: 52.311544172886464, z: 59.19320554109187 },
    initialTarget: { x: 8.929995431823796, y: 6.471239653731979, z: -3.1378123775328923 },
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