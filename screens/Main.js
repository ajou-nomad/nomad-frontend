/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { icons, COLORS, SIZES, FONTS, images, FONTS2 } from "../constants";
import LinearGradient from 'react-native-linear-gradient';


const Main = ({ navigation }) => {

    return (
        <View style={styles.container}>
            {/* <LinearGradient colors={['#7792FF','#516FFF']} style={styles.gradient}> */}
            <View style={styles.logoContainer}>
                <Image
                    source={icons.ko_logo}
                    // source={icons.logo_white}
                    resizeMode="contain"
                    style={{
                        width: 250,
                        height: 90,
                        tintColor: COLORS.white,
                    }}
                />
                <Text style={{ ...FONTS2.body4, color: COLORS.lightGray, }}>더치 딜리버리 서비스에 오신 것을 환영합니다. 🎉</Text>
            </View>
            <ImageBackground
                source={icons.main_bg}
                resizeMode="contain"
                style={{
                    height: 400,
                    marginBottom: 300,
                }}
            >
                <View style={{ marginTop: 180 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Tabs', {
                                routeName: '당일 모집',
                            });
                        }}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.black }}>당일 모집</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Tabs', {
                                routeName: '주간 모집',
                            });
                        }}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.black }}>주간 모집</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>

            {/* </LinearGradient> */}
        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#3897f1',
    },
    gradient: {
        flex: 4,
    },
    logoContainer: {
        flex: 1,
        marginBottom: SIZES.padding * 7,
        marginTop: 100,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        height: 45,
        marginTop: 50,
        marginHorizontal: 35,
        paddingVertical: 25,
        elevation: 5,
        opacity: 0.95
    },
});

export default Main;
