import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 22.437206840431553, y: 20.344362484407437, z: -19.611441671276076 },
    iconTarget: { x: 6.948901922531538, y: 20.96640357703499, z: 4.338801764011514 },
    initialPos: { x: 12.006622233505206, y: 12.76337709525958, z: -51.65995412565985 },
    initialTarget: { x: -2.8446282811274934, y: 20.319211514900648, z: -1.7051384921905102 },
    pivot: { x: 0, y: 0, z: 0 },
    activeBones: [
        {
            materialColor: Colors.Skull1,
            meshNames: [
                'skull1',
            ],
        },
        {
            materialColor: Colors.Skull2,
            meshNames: [
                'skull2',
            ],
        },                   
    ],
    activePoints: [
        {
            name: 'p-skull1',
            text: 'Smadzeņu nodalījums',
            meshes:['skull1'],
        },
        {
            name: 'p-skull2',
            text: 'Sejas nodalījums',
            meshes:['skull2'],
        },                
    ],
} as const;