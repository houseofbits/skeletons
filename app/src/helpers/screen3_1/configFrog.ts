import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 61.40008230504858, y: 193.51202726379665, z: 36.20987324637265 },
    iconTarget: { x: -1.1078951267901478, y: 15.209523985097178, z: 2.618371260793424 },
    initialPos: { x: 33.81415324790159, y: 167.88674375261647, z: 23.341818233041554 },
    initialTarget: { x: 8.73849998335421, y: 13.436541868809586, z: -0.8059272026782758 },
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
} as const;