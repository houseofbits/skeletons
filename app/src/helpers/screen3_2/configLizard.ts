import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 0.7913677024547567, y: 94.75691076203375, z: 16.6321550866403 },
    iconTarget: { x: -9.377017114319788, y: 9.347128879788352, z: -2.0784564016087868 },
    initialPos: { x: -2.697873479780502, y: 90.41362831803478, z: 4.183652742146148 },
    initialTarget: { x: -6.421846741779474, y: 5.3490364966075195, z: -1.8095436197883612 },
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
        },
        {
            name: 'p-limbs2',
            text: 'Lāpstiņa',
        },
        {
            name: 'p-limbs3',
            text: 'Augšdelma kauls',
        },
        {
            name: 'p-limbs4',
            text: 'Elkoņa kauls',
        },
        {
            name: 'p-limbs5',
            text: 'Spieķa kauls',
        },
        {
            name: 'p-limbs6',
            text: 'Plaukstas kauli',
        },
        {
            name: 'p-limbs7',
            text: 'Iegurņa kauli',
        },
        {
            name: 'p-limbs8',
            text: 'Augšstilba kauls',
        }, 
        {
            name: 'p-limbs9',
            text: 'Lielais lielakauls',
        },  
        {
            name: 'p-limbs10',
            text: 'Mazais lielakauls',
        },
        {
            name: 'p-limbs11',
            text: 'Pēdas kauli',
        },                                                
    ],
} as const;