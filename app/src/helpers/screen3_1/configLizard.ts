import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -12.927777079640855, y: 36.45146070284905, z: 9.667035266794844 },
    iconTarget: { x: -9.378562941747543, y: 6.309971718292801, z: -1.604799930491153 },
    initialPos: { x: -28.91559832220389, y: 45.20790250149916, z: 30.211046133408267 },
    initialTarget: { x: -8.574245582012374, y: -4.200161925719343, z: -8.90117552792137 },
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