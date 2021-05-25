/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import { COLORS, icons } from '../../constants';
import { currentLocation } from '../../utils/helper';
import { useNavigation } from '@react-navigation/native';

const PlusButton = (props) => {

    const navigation = useNavigation();

    const animation  = new Animated.Value(0);
    let open = 0;

    const toggleMenu = () => {
        const toValue = open ? 0 : 1;
        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true,
        }).start();

        open = !open;
    };

    const gpsStyle = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120],
                }),
            },
        ],
    };

    const pinStyle = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60],
                }),
            },
        ],
    };

    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],

                }),
            },
        ],
    };

    return (
        <View style={[styles.container, props.style]}>
            <TouchableWithoutFeedback
                onPress={ () => {
                    currentLocation()
                        .then((result)=> {
                            console.log("현재위치 불러오기 성공");
                            props.setLocation(result);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }}
            >
                <Animated.View style={[styles.button, styles.secondary, gpsStyle]}>
                    <Image
                        source={icons.gps}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: '#1c7ed6',
                        }}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={ ()=> {
                    navigation.navigate('CreateGroupList', { initLocation: props.initLocation, deliLocation: props.deliLocation, deliDate: props.deliDate, datePicker: props.datePicker, storeData: props.storeData })
                }}
            >
                <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
                    <Image
                        source={icons.pin}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: '#1c7ed6',
                        }}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu, rotation]}>
                    <Image
                        source={icons.plus3}
                        resizeMode="contain"
                        style={{
                            width: 17,
                            height: 17,
                            tintColor: '#1c7ed6',
                        }}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        width: 45,
        height: 45,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        elevation: 5,
    },
    menu: {
        backgroundColor: 'white',
    },
    secondary: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        opacity: 0.8,
        elevation: 4,
        backgroundColor: COLORS.white,
    },

});


export default PlusButton;
