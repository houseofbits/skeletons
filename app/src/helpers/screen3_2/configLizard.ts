import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 26.19683696958516, y: 20.185683050897588, z: 31.687224659366375 },
    iconTarget: { x: 13.716003803955006, y: 3.66249981593652, z: 5.933014847593138 },
    initialPos: { x: 16.23148092920129, y: 43.98925574123308, z: 49.48099802988402 },
    initialTarget: { x: 7.1941010199911135, y: 4.3100636746769165, z: -2.539650105746088 },
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