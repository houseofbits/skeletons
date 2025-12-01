import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 20.00754482075127, y: 60.115302115804624, z: -43.43400319027951 },
    iconTarget: { x: -1.1173740274334933, y: 41.06728982856404, z: 9.261485431368367 },
    initialPos: { x: 24.742889720204374, y: 52.822967209804126, z: -56.55925321995912 },
    initialTarget: { x: 5.918116559210579, y: 42.87089703896785, z: 12.830206157630203 },
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
} as const;