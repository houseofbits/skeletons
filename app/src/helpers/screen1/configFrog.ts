/**
 * Mugurkauls
 */
export default {
    iconPos: { x: 61.40008230504858, y: 193.51202726379665, z: 36.20987324637265 },
    iconTarget: { x: -1.1078951267901478, y: 15.209523985097178, z: 2.618371260793424 },
    // initialPos: { x: 33.81415324790159, y: 167.88674375261647, z: 23.341818233041554 },
    // initialTarget: { x: 8.73849998335421, y: 13.436541868809586, z: -0.8059272026782758 },
    initialPos: { x: 76.02385767500336, y: 130.21132865327777, z: -19.004897674218647 },
    initialTarget: { x: 12.510421458908057, y: 11.52768305121222, z: -1.4945370424286266 },    
    activeBones: [
        {
            materialColor: '#ff0000',
            meshNames: [
                'spine1',
            ],
        },
        {
            materialColor: '#00ff00',
            meshNames: [
                'spine2',
            ],
        },   
        {
            materialColor: '#ffff00',
            meshNames: [
                'spine3',
            ],
        },    
        {
            materialColor: '#00ffff',
            meshNames: [
                'spine4',
            ],
        },                        
    ],
} as const;