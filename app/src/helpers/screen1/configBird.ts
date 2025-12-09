import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 39.47612459459036, y: 17.519472292269857, z: 19.268208508638374 },
    iconTarget: { x: 4.81228053885079, y: 30.345764483871704, z: 4.426642839850045 },
    initialPos: {x: 85.34982745259775, y: 51.56379908531672, z: -63.43047725110134 },
    initialTarget: { x: 0.17759753100390357, y: 29.865559895464745, z: -10.577250410214662 },
    pivot: { x: 0, y: 0, z: 0 },
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
            meshes:['spine1'],
        },
        {
            name: 'p-spine2',
            text: 'Krūšu skriemeļi',
            meshes:['spine2'],
        },
        {
            name: 'p-spine3',
            text: 'Saliktais krustu kauls',
            meshes:['spine3'],
        },
        {
            name: 'p-spine4',
            text: 'Astes skriemeļi',
            meshes:['spine4'],
        },                  
    ],
} as const;