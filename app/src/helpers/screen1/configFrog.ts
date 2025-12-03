import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 61.753792533716194, y: 120.79376864426301, z: 12.385414826265238 },
    iconTarget: { x: 12.823410426083052, y: 9.192655135855281, z: 9.8895432607303 },
    initialPos: { x: 74.07762534167544, y: 130.28360838180797, z: -25.574353922024883 },
    initialTarget: { x: 10.56418834167548, y: 11.599962381807952, z: -8.063992922024886 },    
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
            meshes:['spine3'],
        },
        {
            name: 'p-spine2',
            text: 'Vidukļa skriemeļi',
            meshes:['spine1'],
        },
        {
            name: 'p-spine3',
            text: 'Krustu skriemelis',
            meshes:['spine2'],
        },
        {
            name: 'p-spine4',
            text: 'Urostils - saaugušie astes skriemeļi',
            meshes:['spine4'],
        },                  
    ],
} as const;