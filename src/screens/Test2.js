import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, PanResponder, StyleSheet, Text, View } from 'react-native';

export default function Test2({ route }) {
    const data = route?.params?.axis;

    const [animatedViews, setAnimatedViews] = useState([]);

    useEffect(() => {
        if (data) {
            const views = data.map((boxData) => {
                return new Animated.ValueXY({ x: boxData.dx, y: boxData.dy });
            });

            setAnimatedViews(views);
        }
    }, [data]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                // Handle pan responder move if needed
            },
            onPanResponderRelease: () => {
                // Handle pan responder release if needed
            },
        })
    ).current;

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleText}>OUTPUT!</Text>
                {animatedViews.map((animatedView, index) => (
                    <Animated.View
                        key={index}
                        style={{
                            transform: [
                                { translateX: animatedView.x },
                                { translateY: animatedView.y },
                            ],
                        }}
                        {...panResponder.panHandlers}>
                        <View style={styles.box} />
                    </Animated.View>
                ))}
            </View>

            <Button title="Click" style={{ height: 30, width: 50 }} />
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
    },
});
