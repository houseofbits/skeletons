import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 61.40008230504858, y: 193.51202726379665, z: 36.20987324637265 },
    iconTarget: { x: -1.1078951267901478, y: 15.209523985097178, z: 2.618371260793424 },
    initialPos: { x: 76.02385767500336, y: 130.21132865327777, z: -19.004897674218647 },
    initialTarget: { x: 12.510421458908057, y: 11.52768305121222, z: -1.4945370424286266 },    
    activeBones: [
        {
            materialColor: Colors.Spine1,
            meshNames: [
                'spine1',
            ],
        },
        {
            materialColor: Colors.Spine2,
            meshNames: [
                'spine2',
            ],
        },   
        {
            materialColor: Colors.Spine3,
            meshNames: [
                'spine3',
            ],
        },    
        {
            materialColor: Colors.Spine4,
            meshNames: [
                'spine4',
            ],
        },                       
    ],
    activePoints: [
        {
            name: 'p-spine1',
            text: 'Kakla skriemelis',
        },
        {
            name: 'p-spine2',
            text: 'Vidukļa skriemeļii',
        },
        {
            name: 'p-spine3',
            text: 'Krustu skriemelis',
        },
        {
            name: 'p-spine4',
            text: 'Urostils - saaugušie astes skriemeļi',
        },                  
    ],
} as const;