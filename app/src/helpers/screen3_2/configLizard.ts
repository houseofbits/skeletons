import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 6.802508705052514, y: 31.53149757289263, z: 14.491368673548074 },
    iconTarget: { x: 3.693175509261759, y: 5.414521237137489, z: 8.769956286445549 },
    initialPos: { x: 4.9284207789768795, y: 90.42136898821109, z: -0.6649451276977247 },
    initialTarget: { x: 1.2044467789768174, y: 5.356776988211086, z: -6.658142127697827 },
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
        {
            materialColor: Colors.Limbs11,
            meshNames: [
                'limbs11',
            ],
        },                              
    ],
    activePoints: [
        {
            name: 'p-limbs1',
            text: 'Atslēgas kauls',
            meshes:['limbs2'],
        },
        {
            name: 'p-limbs2',
            text: 'Lāpstiņa',
            meshes:['limbs1'],
        },
        {
            name: 'p-limbs3',
            text: 'Augšdelma kauls',
            meshes:['limbs4'],
        },
        {
            name: 'p-limbs4',
            text: 'Elkoņa kauls',
            meshes:['limbs5'],
        },
        {
            name: 'p-limbs5',
            text: 'Spieķa kauls',
            meshes:['limbs6'],
        },
        {
            name: 'p-limbs6',
            text: 'Plaukstas kauli',
            meshes:['limbs7'],
        },
        {
            name: 'p-limbs7',
            text: 'Iegurņa kauli',
            meshes:['limbs3'],
        },
        {
            name: 'p-limbs8',
            text: 'Augšstilba kauls',
            meshes:['limbs8'],
        }, 
        {
            name: 'p-limbs9',
            text: 'Lielais lielakauls',
            meshes:['limbs9'],
        },  
        {
            name: 'p-limbs10',
            text: 'Mazais lielakauls',
            meshes:['limbs10'],
        },
        {
            name: 'p-limbs11',
            text: 'Pēdas kauli',
            meshes:['limbs11'],
        },                                                
    ],
} as const;