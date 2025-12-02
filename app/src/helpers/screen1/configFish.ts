import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -3.358248950559941, y: 18.40904689350652, z: -36.05015706755673 },
    iconTarget: { x: 1.098861313906775, y: 17.597278650656094, z: -1.9284843264938871 },
    initialPos: { x: 26.458806527051905, y: 19.61718578587932, z: -26.157650098571466 },
    initialTarget: { x: 11.207347531556273, y: 15.785514987726069, z: 11.79826528774651 },
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
    ],
    activePoints: [
        {
            name: 'p-spine1',
            text: 'Vidukļa skriemeļi',
        },
        {
            name: 'p-spine2',
            text: 'Astes skriemeļi',
        },
    ],
} as const;