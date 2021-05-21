/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FONTS2, images, icons, COLORS } from '../../constants';

const StoreItem = ({ deliveryPlace, deliDate, datePicker, storeData, isLikeList }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: storeData.logoUrl}}
                resizeMode='contain'
                style={{
                    width: 55,
                    height: 55,
                }}
            />

            <View style={{ flex: 1, alignSelf: 'center', marginLeft: 5, }}>
                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>{storeData.storeName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, }}>
                    <Image
                        source={icons.star}
                        resizeMode='contain'
                        style={{
                            width: 23,
                            height: 23,
                            marginRight: 5,
                        }}
                    />
                    <Text style={{ ...FONTS2.body2, }}>{storeData.rate} </Text>
                    <Text style={{ ...FONTS2.body2, }}>(50+)</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.selectButton}
                onPress={() => navigation.navigate('StoreDetail', { time: null, storeName: storeData.storeName , deliveryPlace: deliveryPlace, deliDate: deliDate,storeInfo: storeData, datePicker: datePicker })}
            >
                {!isLikeList ? (
                    <Text style={{ ...FONTS2.body3, color: COLORS.black }}>선택</Text>
                ) : (
                    <Text style={{ ...FONTS2.body3, color: COLORS.black, fontSize: 19 }}>매장 보기</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        // backgroundColor: COLORS.lightGray,
    },
    selectButton: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        // borderWidth: 0.5,
        borderRadius: 8,
        borderColor: '#707070',
        marginRight: 15,
        alignSelf: 'center',
        // backgroundColor: '#1c7ed6',
        backgroundColor: COLORS.lightGray,
    },
});

export default StoreItem;
