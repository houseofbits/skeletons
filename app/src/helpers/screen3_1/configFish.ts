import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 22.097418134060906, y: 23.395447516100454, z: -21.684552490246684 },
    iconTarget: { x: 12.953809408034155, y: 18.482585720821223, z: 2.6959629158350866 },
    initialPos: { x: 23.17089677535749, y: 23.799921394849235, z: -13.909344613296703 },
    initialTarget: { x: 11.455246233138485, y: 17.180745368423395, z: 9.874220132392377 },
    activeBones: [
        {
            materialColor: Colors.Ribs1,
            meshNames: [
                'ribs1',
            ],
        },                    
    ],
    activePoints: [
        {
            name: 'p-ribs1',
            text: 'Ribas',
        },
    ],
} as const;