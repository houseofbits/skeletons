import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 38.99526900654369, y: 11.65983355556205, z: -98.10670668338544 },
    iconTarget: { x: 6.592821774557651, y: 27.311188789702282, z: 6.7077460898335755 },
    initialPos: { x: 27.712398477646953, y: 32.671486308534526, z: -71.30216155067171 },
    initialTarget: { x: -0.601484499674707, y: 31.409545991868196, z: 5.741818878935344 },
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
            meshes:['ribs1'],
        },
        {
            name: 'p-ribs2',
            text: 'Krūšu kauls',
            meshes:['ribs2'],
        },        
    ],
} as const;