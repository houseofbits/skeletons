import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 62.51873965436856, y: 89.07257640556819, z: 5.627401836258919 },
    iconTarget: { x: 25.610443661880257, y: 4.471478656069962, z: 9.775996435215973 },
    initialPos: { x: 36.53421446936293, y: 158.93268640233043, z: -18.90178277105056 },
    initialTarget: { x: 10.01647264277003, y: 18.326414693634796, z: -11.921916493120301 },
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