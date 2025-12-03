import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 24.277329786712272, y: 12.92426379651726, z: -26.48178890905119 },
    iconTarget: { x: 1.803816808546739, y: 16.581002914679555, z: 0.7256856922278976 },
    initialPos: { x: 33.73319263343196, y: 8.908103930721282, z: -47.09878902604848 },
    initialTarget: { x: -1.9328683665680484, y: 15.952308930721282, z: -1.2675690260484644 },
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
    activePoints: [
        {
            name: 'p-ribs1',
            text: 'Ribas',
            meshes:['ribs1'],
        },
        {
            name: 'p-ribs2',
            text: 'Krūšu kauls',
            meshes:['ribs2'],
        },        
    ],
} as const;