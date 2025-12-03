import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 20.00754482075127, y: 60.115302115804624, z: -43.43400319027951 },
    iconTarget: { x: -1.1173740274334933, y: 41.06728982856404, z: 9.261485431368367 },
    initialPos: { x: 27.621875756864533, y: 48.7062871489385, z: -54.521850581321345 },
    initialTarget: { x: -6.5454666037165286, y: 42.95152983091002, z: 9.257364530849461 },
    activeBones: [
        {
            materialColor: Colors.Skull1,
            meshNames: [
                'skull1',
            ],
        },
        {
            materialColor: Colors.Skull2,
            meshNames: [
                'skull2',
            ],
        },                    
    ],
    activePoints: [
        {
            name: 'p-skull1',
            text: 'Smadzeņu nodalījums',
            meshes:['skull1'],
        },
        {
            name: 'p-skull2',
            text: 'Sejas nodalījums',
            meshes:['skull2'],
        },                
    ],
} as const;