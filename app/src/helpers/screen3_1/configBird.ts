import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 36.29778480612791, y: 16.02612755832315, z: -24.541394588398493 },
    iconTarget: { x: 2.9910234230385395, y: 22.24306986759576, z: 3.5600004376083403 },
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