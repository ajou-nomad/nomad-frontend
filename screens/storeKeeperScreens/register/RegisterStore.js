/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Splash from '../../../components/Splash';
import {icons, SIZES, FONTS2, FONTS, COLORS} from '../../../constants';

const RegisterStore = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(true);


    const tempScreen = () => {
        setIsLoading(false);
    }

    useEffect(() => {
        setTimeout(() => {
            tempScreen();
        }, 2500);
    }, []);

    if (isLoading) {
        return (
            <Splash />
        );
    } else {
        return (
            <LinearGradient colors={['#6454F0', '#6EE2F5']} style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.logo} source={icons.logo_white} resizeMode="contain" />
                </View>
                <View style={styles.footer}>
                    <Text style={{ ...FONTS2.h3, color: 'black' }}>DutchDelivery에 입점해주세요!</Text>
                    <Text style={styles.text}>등록된 매장이 없습니다.</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('RegisterStoreDetail')}
                    >
                        <View style={styles.buttonView}>
                            <Text style={styles.buttonText}>매장 등록</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    text: {
        color: 'grey',
        marginTop: 5,
    },
    logo: {
        width: SIZES.width * 0.6,
        height: SIZES.height * 0.6,
    },
    button: {
        marginTop: SIZES.height * 0.05,
        width: SIZES.width * 0.5,
        alignSelf: 'flex-end',
    },
    buttonView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius * 0.5,
        backgroundColor: '#1c7ed6',
        opacity: 0.9,
        elevation: 5,
    },
    buttonText:{
        ...FONTS.body4,
        color: COLORS.white,
    },
});

export default RegisterStore;
