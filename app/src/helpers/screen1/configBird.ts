import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 45.668998785489514, y: 61.202151662048124, z: -86.82135575540381 },
    iconTarget: { x: 5.728805056496356, y: 25.836828982270383, z: 6.4626473543064495 },
    initialPos: { x: 90.14219946242365, y: 80.9200218835306, z: 25.79149004028225 },
    initialTarget: { x: 1.7754562087409262, y: 28.762288290773167, z: 0.15449137094127202 },
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
} as const;