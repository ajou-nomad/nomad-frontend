/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import Header from '../../components/layout/Header';
import { COLORS, FONTS2, icons, SIZES } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyPointPage = () => {
    return (
        <View style={styles.container}>
            <Header title='포인트' small='true' />

            <View style={styles.pointContainer}>
                <Text style={styles.textStyle}>내가 보유한 포인트</Text>
                <Text style={styles.textStyle}>150,000원</Text>

                <TouchableOpacity
                    style={styles.chargeButton}
                >
                    <Image source={icons.point} style={styles.logoStyle}/>
                    <Text style={{ ...FONTS2.body1, color: COLORS.white, fontSize: 20 }}>포인트 충전하기</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    pointContainer: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        ...FONTS2.body1,
        marginBottom: 10,
    },
    chargeButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding * 8,
        borderRadius: SIZES.radius * 0.5,
        backgroundColor: '#1c7ed6',
        opacity: 0.9,
        elevation: 5,
        marginTop: 20,
        marginBottom: 50,
    },
    logoStyle: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
});

export default MyPointPage;
