import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 15.556273210333764, y: 14.220988801767835, z: -16.75423871879573 },
    iconTarget: { x: 1.3923549214065867, y: 16.52564647250651, z: 0.3932560887577168 },
    initialPos: { x: 23.655633253404964, y: 13.19225505354369, z: -32.52693296596438 },
    initialTarget: { x: -4.103615282735973, y: 15.507846525989118, z: -2.644189964128354 },
    pivot: { x: 0, y: 0, z: 0 },
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