import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 16.18085749839021, y: 19.616494927776838, z: 0.6639371572076254 },
    iconTarget: { x: 14.359318410980391, y: 18.53921256459575, z: 3.591356729631738 },
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
            meshes:['ribs1'],
        },
    ],
} as const;