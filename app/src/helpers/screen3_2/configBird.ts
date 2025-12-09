import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 49.8422110032161, y: 11.445319322164002, z: -9.686040979363051 },
    iconTarget: { x: 10.159875602881684, y: 11.051847741748865, z: 1.3100008656010445 },
    initialPos: { x: 107.23992005875974, y: 43.496726416525064, z: -57.14246104105284 },
    initialTarget: { x: -2.6920155180973424, y: 30.54173594863633, z: -11.633814542342346 },
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
            meshes:['limbs6'],
        },
        {
            name: 'p-limbs2',
            text: 'Lāpstiņa',
            meshes:['limbs1'],
        },
        {
            name: 'p-limbs3',
            text: 'Augšdelma kauls',
            meshes:['limbs2'],
        },
        {
            name: 'p-limbs4',
            text: 'Elkoņa kauls',
            meshes:['limbs4'],
        },
        {
            name: 'p-limbs5',
            text: 'Spieķa kauls',
            meshes:['limbs3'],
        },
        {
            name: 'p-limbs6',
            text: 'Plaukstas kauli',
            meshes:['limbs5'],
        },
        {
            name: 'p-limbs7',
            text: 'Iegurņa kauli',
            meshes:['limbs7'],
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