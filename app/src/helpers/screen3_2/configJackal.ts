import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 19.197005189667397, y: 3.4908985530767467, z: -24.241569200166108 },
    iconTarget: { x: -1.4893846530518904, y: 8.393414706256962, z: 0.8023317378502275 },
    initialPos: { x: 35.85035435282369, y: 3.0291196744563536, z: -49.240997731246004 },
    initialTarget: { x: -0.8997610137714555, y: 14.014077054191283, z: -0.8658043799774954 },
    activeBones: [
        {
            materialColor: Colors.Limbs1,
            meshNames: [
                'limbs1',
            ],
        },
        {
            materialColor: Colors.Limbs2,
            meshNames: [
                'limbs2',
            ],
        },   
        {
            materialColor: Colors.Limbs3,
            meshNames: [
                'limbs3',
            ],
        },    
        {
            materialColor: Colors.Limbs4,
            meshNames: [
                'limbs4',
            ],
        },  
        {
            materialColor: Colors.Limbs5,
            meshNames: [
                'limbs5',
            ],
        },
        {
            materialColor: Colors.Limbs6,
            meshNames: [
                'limbs6',
            ],
        },   
        {
            materialColor: Colors.Limbs7,
            meshNames: [
                'limbs7',
            ],
        },
        {
            materialColor: Colors.Limbs8,
            meshNames: [
                'limbs8',
            ],
        },   
        {
            materialColor: Colors.Limbs9,
            meshNames: [
                'limbs9',
            ],
        },    
        {
            materialColor: Colors.Limbs10,
            meshNames: [
                'limbs10',
            ],
        },                             
    ],
    activePoints: [
        {
            name: 'p-limbs1',
            text: 'Lāpstiņa',
            meshes:['limbs2'],
        },
        {
            name: 'p-limbs2',
            text: 'Augšdelma kauls',
            meshes:['limbs4'],
        },
        {
            name: 'p-limbs3',
            text: 'Elkoņa kauls',
            meshes:['limbs7'],
        },
        {
            name: 'p-limbs4',
            text: 'Spieķa kauls',
            meshes:['limbs8'],
        },
        {
            name: 'p-limbs5',
            text: 'Plaukstas kauli',
            meshes:['limbs10'],
        },
        {
            name: 'p-limbs6',
            text: 'Iegurņa kauli',
            meshes:['limbs1'],
        },
        {
            name: 'p-limbs7',
            text: 'Augšstilba kauls',
            meshes:['limbs3'],
        }, 
        {
            name: 'p-limbs8',
            text: 'Lielais lielakauls',
            meshes:['limbs5'],
        },  
        {
            name: 'p-limbs9',
            text: 'Mazais lielakauls',
            meshes:['limbs6'],
        },
        {
            name: 'p-limbs10',
            text: 'Pēdas kauli',
            meshes:['limbs9'],
        },
    ]
} as const;