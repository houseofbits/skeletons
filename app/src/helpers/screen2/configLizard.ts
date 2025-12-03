import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -36.7834544848252, y: 29.544251520474788, z: 26.82180110198292 },
    iconTarget: { x: -25.46961838335834, y: 11.051272580328293, z: -5.166714558659507 },
    initialPos: { x: -21.220516076317047, y: 33.92270836337812, z: 39.42215128655825 },
    initialTarget: { x: -23.43404141734978, y: -2.1877825092888816, z: -18.493232078936416 },
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