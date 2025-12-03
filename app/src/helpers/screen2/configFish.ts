import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -24.659353764649545, y: 18.592514429694482, z: -7.210013554603469 },
    iconTarget: { x: -10.298207678321907, y: 15.736412694296211, z: 12.47772772109406 },
    initialPos: { x: -22.49731126003844, y: 11.645632084699542, z: -11.563540116271817 },
    initialTarget: { x: -13.156710468966498, y: 13.192402675285823, z: 6.6827344176825285 },
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