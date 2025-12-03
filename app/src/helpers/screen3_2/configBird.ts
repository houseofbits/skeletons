import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 26.531652301697655, y: 23.526979514540777, z: -35.44070489393316 },
    iconTarget: { x: 10.420819757058174, y: 9.26153061010913, z: 2.187628894997541 },
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