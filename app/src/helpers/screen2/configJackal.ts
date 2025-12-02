import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 26.995925180942635, y: 20.42634599053176, z: -26.600471169909497 },
    iconTarget: { x: 6.979530142908989, y: 21.23024417732, z: 4.351756100858074 },
    initialPos: { x: 27.70422404752387, y: 17.816148516124883, z: -40.33082700027426 },
    initialTarget: { x: 6.99257695914961, y: 20.78602692235013, z: 2.3416743908298283 },
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
        },
        {
            name: 'p-skull2',
            text: 'Sejas nodalījums',
        },                
    ],
} as const;