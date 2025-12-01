import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: -3.358248950559941, y: 18.40904689350652, z: -36.05015706755673 },
    iconTarget: { x: 1.098861313906775, y: 17.597278650656094, z: -1.9284843264938871 },
    initialPos: { x: -17.86190523856878, y: 19.863771044830724, z: -20.74944249716161 },
    initialTarget: { x: -7.047159945945255, y: 17.748991179686442, z: 2.682224631235605 },
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
} as const;