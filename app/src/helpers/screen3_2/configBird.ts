import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 45.668998785489514, y: 61.202151662048124, z: -86.82135575540381 },
    iconTarget: { x: 5.728805056496356, y: 25.836828982270383, z: 6.4626473543064495 },
    initialPos: { x: 52.58159440742305, y: 82.84845575853493, z: -91.63076775187444 },
    initialTarget: { x: 3.9558382093658992, y: 30.607001256481396, z: 4.443502526483391 },
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