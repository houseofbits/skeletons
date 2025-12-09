import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 13.712763436786584, y: 54.702272028378104, z: -47.69105726418833 },
    iconTarget: { x: -5.384880327362385, y: 40.33631270276873, z: 7.216161795094494 },
    initialPos: { x: 27.621875756864533, y: 48.7062871489385, z: -54.521850581321345 },
    initialTarget: { x: -6.5454666037165286, y: 42.95152983091002, z: 9.257364530849461 },
    pivot: { x: 0, y: 0, z: 0 },
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