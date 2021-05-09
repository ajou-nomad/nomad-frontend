/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {icons, SIZES} from '../constants';


const Splash = () => {
    return (
        <LinearGradient colors={['#6454F0','#6EE2F5']} style={styles.gradient}>
            <View style={styles.logoFixed}>
                <Image style={styles.logo} source={icons.logo_white} resizeMode="contain" />
            </View>
        </LinearGradient>
    );
};


const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignContent: 'center',
    },
    logoFixed: {
        alignItems: 'center',
    },
    logo: {
        height: SIZES.height * 0.7,
        width: SIZES.width * 0.7,
    },
});


export default Splash;
