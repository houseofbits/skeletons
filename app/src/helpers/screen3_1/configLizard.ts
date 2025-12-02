import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -39.96716831314694, y: 65.22063062820334, z: 23.616190459490383 },
    iconTarget: { x: -12.824429757176377, y: 4.747631997247046, z: 1.4879635474089112 },
    initialPos: { x: -28.91559832220389, y: 45.20790250149916, z: 30.211046133408267 },
    initialTarget: { x: -8.574245582012374, y: -4.200161925719343, z: -8.90117552792137 },
    activeBones: [
        {
            materialColor: Colors.Ribs1,
            meshNames: [
                'ribs1',
            ],
        },
        {
            materialColor: Colors.Ribs2,
            meshNames: [
                'ribs2',
            ],
        },                      
    ],
    activePoints: [
        {
            name: 'p-ribs1',
            text: 'Ribas',
        },
        {
            name: 'p-ribs2',
            text: 'Krūšu kauls',
        },        
    ],
} as const;