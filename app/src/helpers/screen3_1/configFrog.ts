import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 33.03969551797181, y: 13.939577019383233, z: 87.49589226790322 },
    iconTarget: { x: 4.851502733160728, y: 36.15923515412139, z: -4.245469469579594 },
    initialPos: { x: -44.08747477067847, y: 18.892108627842056, z: 82.88906805410633 },
    initialTarget: { x: 12.952120609940579, y: 24.17577283967622, z: 1.1856644233458875 },
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
            text: 'Krūšu kauls',
            meshes:['ribs1', 'ribs2'],
        },
    ],
} as const;