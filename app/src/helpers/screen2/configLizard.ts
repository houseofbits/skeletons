import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -23.483845792004942, y: 29.600156398830755, z: 16.352652196516445 },
    iconTarget: { x: -16.719518024548744, y: 11.804356947160258, z: -2.772673889384429 },
    initialPos: { x: -26.604756542976073, y: 45.37958880157301, z: 33.366865793446664 },
    initialTarget: { x: 6.016617298858141, y: -9.889778646698813, z: -6.710010306822934 },
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