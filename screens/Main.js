import React from 'react';
import { Image, StyleSheet ,View, Text, TouchableOpacity } from 'react-native';
import {icons, COLORS, SIZES, FONTS} from "../constants";
import LinearGradient from 'react-native-linear-gradient';

const Main = ({navigation}) => {
    return (
        <View style={styles.container}>
        <LinearGradient colors={['#6454F0','#6EE2F5']} style={styles.gradient}>
            <View style={styles.logoContainer}>
                <Image 
                    source={icons.logo_white}
                    resizeMode="contain"
                    style={{
                        width: 400,
                        height: 120,
                    }}
                />
            </View>     
        
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Home', {
                        routeName: '당일 모집'
                    });       
                }}
            >
                <Text style={{...FONTS.body3, color: COLORS.black}}>당일 모집</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Home', {
                        routeName: '주간 모집'
                    });               
                }}
            >
                <Text style={{...FONTS.body3, color: COLORS.black}}>주간 모집</Text>
            </TouchableOpacity>
        </LinearGradient>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    logoContainer : {
        marginVertical: SIZES.padding * 7,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        // backgroundColor: "#3897f1",
        backgroundColor: 'white',
        borderRadius: 5,
        height: 45,
        marginTop: 60,
        marginHorizontal: 80,
    },
});

export default Main;
