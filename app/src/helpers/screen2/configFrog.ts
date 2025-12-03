import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 30.94096635844709, y: 139.1117960944859, z: 21.97958780106752 },
    iconTarget: { x: -9.9322553170222, y: 25.868801158665704, z: 2.989483740768853 },
    initialPos: { x: 39.380643030573076, y: 129.46801480716067, z: 34.737887094291004 },
    initialTarget: { x: -2.2590553097670343, y: 15.984410402786535, z: -3.089436781647925 },
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