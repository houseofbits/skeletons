import Colors from '@src/utils/boneColors';

export default {
    iconPos: { x: 47.505147139287416, y: 13.381015865300022, z: -45.66351428608464 },
    iconTarget: { x: 0.09869148101616305, y: 13.284809700008312, z: -0.23974190652330163 },
    initialPos: { x: 38.149180839208526, y: 9.035528142478121, z: -43.68183235541134 },
    initialTarget: { x: 2.4831196242601865, y: 16.079733144191277, z: 2.1493879949036843 },
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