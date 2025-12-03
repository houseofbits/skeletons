import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -3.358248950559941, y: 18.40904689350652, z: -36.05015706755673 },
    iconTarget: { x: 1.098861313906775, y: 17.597278650656094, z: -1.9284843264938871 },
    initialPos: { x: 3.340617715507073, y: 3.007191804563522, z: -19.256740355522705 },
    initialTarget: { x: 3.42576682782171, y: 11.98511885212566, z: 25.610913004176336 },
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