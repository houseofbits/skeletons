import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 17.20012114654354, y: 2.2383054268641924, z: -21.44446195767277 },
    iconTarget: { x: -1.4693456865106096, y: 6.662826255109336, z: 1.1576586388869692 },
    initialPos: { x: 27.654825661937082, y: 3.4556412097560845, z: -40.94916815967756 },
    initialTarget: { x: -2.2783729923755836, y: 12.402957651533772, z: -1.5472708301110825 },
    pivot: { x: 0, y: 0, z: 0 },
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