import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -31.904581180810997, y: 19.65357886138935, z: -21.7869184596216 },
    iconTarget: { x: -2.2428055294755613, y: 12.055848054473087, z: 5.448315378491593 },
    initialPos: { x: -15.426995711400785, y: 16.82473389249073, z: -47.91786795789447 },
    initialTarget: { x: -4.874675668581218, y: 14.701507731146926, z: 2.701795841830036 },
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