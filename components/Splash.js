/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native';
import {icons, SIZES, FONTS2, COLORS} from '../constants';


const Splash = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={icons.ko_logo}
                    resizeMode="contain"
                    style={{
                        width: 250,
                        height: 90,
                        tintColor: COLORS.white,
                    }}
                />
                <Text style={{ ...FONTS2.body4, color: COLORS.lightGray }}>더치 딜리버리 서비스에 오신 것을 환영합니다. 🎉</Text>
            </View>
            <ImageBackground
                source={icons.main_bg}
                resizeMode="contain"
                style={{
                    height: 400,
                    marginBottom: 300,
                }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3897f1',
    },
    logoContainer: {
        flex: 1,
        marginBottom: SIZES.padding * 7,
        marginTop: 100,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Splash;
