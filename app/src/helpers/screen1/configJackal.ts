import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -4.281219868220525, y: 33.77337301710993, z: -16.59267180563055 },
    iconTarget: { x: -1.1771791516370185, y: 16.880006600135697, z: 2.7653283248277862 },
    initialPos: { x: -6.463938584118981, y: 45.827994985611035, z: -49.11583208843136 },
    initialTarget: { x: -7.296985242934663, y: 15.479766859571436, z: -2.8365292701074845 },
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
        {
            materialColor: Colors.Spine5,
            meshNames: [
                'spine5',
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
            text: 'Krūšu skriemeļi',
            meshes:['spine2'],
        },
        {
            name: 'p-spine3',
            text: 'Jostas skriemeļi',
            meshes:['spine3'],
        },
        {
            name: 'p-spine4',
            text: 'Krustu skriemeļi',
            meshes:['spine4'],
        },
        {
            name: 'p-spine5',
            text: 'Astes skriemeļi',
            meshes:['spine5'],
        },                          
    ],
} as const;