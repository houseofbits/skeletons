import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 19.333239204169303, y: 24.22583003620996, z: 17.550501838298768 },
    iconTarget: { x: 1.839498531434045, y: 4.653770881313899, z: -3.9075224007222746 },
    initialPos: { x: 8.480942490590865, y: 50.99222527604927, z: 62.48318307780289 },
    initialTarget: { x: 4.4864248207125135, y: 3.5049635509143404, z: -6.836965202328727 },
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
            text: 'Kakla skriemeļi',
            meshes:['spine1'],
        },
        {
            name: 'p-spine2',
            text: 'Krūšu un jostas skriemeļi',
            meshes:['spine2'],
        },
        {
            name: 'p-spine3',
            text: 'Krustu skriemeļi',
            meshes:['spine3'],
        },
        {
            name: 'p-spine4',
            text: 'Astes skriemeļi',
            meshes:['spine4'],
        },                       
    ],
} as const;