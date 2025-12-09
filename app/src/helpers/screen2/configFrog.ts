import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 23.902750856326826, y: 97.7574738287088, z: 18.90645507573629 },
    iconTarget: { x: -13.045906086189328, y: 28.473438916699887, z: -0.39892855425511065 },
    initialPos: { x: 47.591230827149424, y: 123.4926832463712, z: 20.004082817839297 },
    initialTarget: { x: -2.5105286687037585, y: 18.286479340469576, z: -10.005016533241951 },
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