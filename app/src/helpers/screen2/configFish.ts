import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -24.659353764649545, y: 18.592514429694482, z: -7.210013554603469 },
    iconTarget: { x: -10.298207678321907, y: 15.736412694296211, z: 12.47772772109406 },
    initialPos: { x: -17.86190523856878, y: 19.863771044830724, z: -20.74944249716161 },
    initialTarget: { x: -7.047159945945255, y: 17.748991179686442, z: 2.682224631235605 },
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
} as const;