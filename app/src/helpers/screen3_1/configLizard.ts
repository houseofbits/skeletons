import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -12.178000161564526, y: 31.81954516594736, z: 16.131289978544345 },
    iconTarget: { x: -4.3374857777862585, y: 7.388833067748076, z: -0.8284132932770835 },
    initialPos: { x: -14.458004161731509, y: 29.028417555336457, z: 30.762167060355136 },
    initialTarget: { x: 6.863660245224703, y: 1.6811012285474443, z: -6.957705547354725 },
    pivot: { x: 0, y: 0, z: 0 },
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