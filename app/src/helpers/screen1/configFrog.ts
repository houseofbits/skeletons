import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 50.13757743321303, y: 112.59172593681927, z: 15.029812054632892 },
    iconTarget: { x: 15.893066027614113, y: 8.197787396155356, z: 9.654987763599996 },
    initialPos: { x: 79.47128843032702, y: 125.88145427282632, z: 9.665345504456912 },
    initialTarget: { x: 27.309173610762237, y: 27.56309877884942, z: -9.537745590128772 },
    pivot: { x: 20, y: 0, z: 0 },
    activeBones: [
        {
            materialColor: Colors.Spine1,
            meshNames: [
                'spine1',
            ],
        },
        {
            materialColor: Colors.Spine2,
            meshNames: [
                'spine2',
            ],
        },
        {
            materialColor: Colors.Spine3,
            meshNames: [
                'spine3',
            ],
        },
        {
            materialColor: Colors.Spine4,
            meshNames: [
                'spine4',
            ],
        },
    ],
    activePoints: [
        {
            name: 'p-spine1',
            text: 'Kakla skriemelis',
            meshes: ['spine3'],
        },
        {
            name: 'p-spine2',
            text: 'Vidukļa skriemeļi',
            meshes: ['spine1'],
        },
        {
            name: 'p-spine3',
            text: 'Krustu skriemelis',
            meshes: ['spine2'],
        },
        {
            name: 'p-spine4',
            text: 'Urostils - saaugušie astes skriemeļi',
            meshes: ['spine4'],
        },
    ],
} as const;