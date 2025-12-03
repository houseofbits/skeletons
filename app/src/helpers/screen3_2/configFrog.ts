import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 77.3953172697133, y: 199.41454959453108, z: 4.307208726478905 },
    iconTarget: { x: -2.2701154514379303, y: 16.805659400167603, z: 13.261823609033044 },
    initialPos: { x: 40.28584513652811, y: 158.76879717632696, z: -8.10682269397266 },
    initialTarget: { x: 14.559617115331712, y: 18.005376667450708, z: -1.3352947390528938 },
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
    ],
    activePoints: [
        {
            name: 'p-limbs1',
            text: 'Atslēgas kauls',
            meshes:['limbs7'],
        },
        {
            name: 'p-limbs2',
            text: 'Lāpstiņa',
            meshes:['limbs1'],
        },
        {
            name: 'p-limbs3',
            text: 'Augšdelma kauls',
            meshes:['limbs3'],
        },
        {
            name: 'p-limbs4',
            text: 'Saaugušie spieķa kauls un elkoņa kauls',
            meshes:['limbs4'],
        },
        {
            name: 'p-limbs5',
            text: 'Plaukstas kauli',
            meshes:['limbs8'],
        },
        {
            name: 'p-limbs6',
            text: 'Iegurņa kauli',
            meshes:['limbs2'],
        },
        {
            name: 'p-limbs7',
            text: 'Augšstilba kauls',
            meshes:['limbs5'],
        },
        {
            name: 'p-limbs8',
            text: 'Saaugušie lielais lielakauls un mazais lielakauls',
            meshes:['limbs6'],
        }, 
        {
            name: 'p-limbs9',
            text: 'Pēdas kauli',
            meshes:['limbs9'],
        },                                
    ],
} as const;