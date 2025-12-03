import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -2.7191138186869637, y: 10.820248286159798, z: -6.822425958946284 },
    iconTarget: { x: -2.0476008760334286, y: 10.69794645415835, z: -1.6816183404464793 },
    initialPos: { x: 1.4828071669328047, y: 4.139339590733446, z: -19.47975473375942 },
    initialTarget: { x: 1.56795616693281, y: 13.117266590733438, z: 25.387898266240562 },
    activeBones: [
        {
            materialColor: Colors.Limbs1,
            meshNames: [
                'limbs1',
            ],
        },
        {
            materialColor: Colors.Limbs2,
            meshNames: [
                'limbs2',
            ],
        },
        {
            materialColor: Colors.Limbs2,
            meshNames: [
                'limbs3',
            ],
        },
    ],
    activePoints: [
        {
            name: 'p-limbs1',
            text: 'Krūšu spura ar plecu joslu',
            meshes:['limbs1'],
        },
        {
            name: 'p-limbs2',
            text: 'Vēdera spura ar iegurņa joslu',
            meshes:['limbs2', 'limbs3'],
        },
    ],
} as const;