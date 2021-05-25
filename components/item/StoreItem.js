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
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('StoreDetail', { time: null, storeName: storeData.storeName , deliveryPlace: deliveryPlace, deliDate: deliDate,storeInfo: storeData, datePicker: datePicker })}
        >
            <View style={styles.logoImageContainer}>
                <Image
                    source={{ uri: storeData.logoUrl}}
                    resizeMode='contain'
                    style={{
                        width: 55,
                        height: 55,
                    }}
                />
            </View>

            <View style={{ flex: 1, alignSelf: 'center', marginLeft: 5, }}>
                <Text style={{ ...FONTS2.h3, fontWeight: 'bold', }}>{storeData.storeName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, }}>
                    <Image
                        source={icons.star}
                        resizeMode='contain'
                        style={{
                            width: 17,
                            height: 17,
                            marginRight: 5,
                        }}
                    />
                    <Text style={{ ...FONTS2.body3, }}>{storeData.rate} </Text>
                    <Text style={{ ...FONTS2.body3, }}>(50+)</Text>
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
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        borderBottomWidth: 0.6,
        borderBottomColor: '#e9ecef',
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
        backgroundColor: COLORS.lightGray,
    },
    logoImageContainer: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ced4da',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        marginRight: 3,
    },
});

export default StoreItem;
