import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 37.012906628004686, y: 94.67759202084493, z: 17.789187657571553 },
    iconTarget: { x: 8.053509068877029, y: 12.071606065411894, z: 2.226539373077692 },
    initialPos: { x: 33.81415324790159, y: 167.88674375261647, z: 23.341818233041554 },
    initialTarget: { x: 8.73849998335421, y: 13.436541868809586, z: -0.8059272026782758 },
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
            text: 'Krūšu kauls',
            meshes:['ribs1', 'ribs2'],
        },
    ],
} as const;