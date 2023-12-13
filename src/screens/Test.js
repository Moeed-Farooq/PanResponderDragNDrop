import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text, Button } from 'react-native';

export default function Test() {
    const navigation = useNavigation();
    const boxes = useRef([
        { id: 1, pan: new Animated.ValueXY() },
        { id: 2, pan: new Animated.ValueXY() },
        { id: 3, pan: new Animated.ValueXY() },
        // Add more boxes as needed
    ]).current;

    const createPanResponder = (box) =>
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dx: box.pan.x,
                        dy: box.pan.y,
                    },
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                box.pan.extractOffset();
            },
        });

    const getBoxCoordinates = () => {
        const coordinates = boxes.map((box) => {
            box.pan.flattenOffset(); // Ensure offset is flattened before extracting new offset
            return {
                id: box.id,
                dx: box.pan.x._value,
                dy: box.pan.y._value,
            };
        });
        console.log(coordinates);
        // You can use 'coordinates' as needed, such as passing it to the navigation state
        navigation.navigate('test2', {axis:  coordinates });
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleText}>Drag these boxes!</Text>
                {boxes.map((box) => (
                    <Animated.View
                        key={box.id}
                        style={{
                            transform: [{ translateX: box.pan.x }, { translateY: box.pan.y }],
                        }}
                        {...createPanResponder(box).panHandlers}>
                        <View style={styles.box} />
                    </Animated.View>
                ))}
            </View>

            <Button title="Click" style={{ height: 30, width: 50 }} onPress={getBoxCoordinates} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: 'blue',
        borderRadius: 5,
        margin: 10,
    },
});
