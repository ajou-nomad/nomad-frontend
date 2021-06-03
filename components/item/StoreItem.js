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

import { FONTS2, images, icons, COLORS, SIZES } from '../../constants';

const StoreItem = ({ deliveryPlace, deliDate, datePicker, storeData, isLikeList }) => {

    const navigation = useNavigation();

    

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('StoreDetail', { time: null, storeName: storeData.storeName, deliveryPlace: deliveryPlace, deliDate: deliDate, storeInfo: storeData, datePicker: datePicker, storeData: storeData })}
        >
            <View style={styles.logoImageContainer}>
                <Image
                    source={{ uri: storeData.logoUrl }}
                    resizeMode='contain'
                    style={{
                        width: 55,
                        height: 55,
                        alignSelf: 'center',
                    }}
                />
            </View>

            <View style={{ alignSelf: 'center', marginHorizontal: 5, width: SIZES.width * 0.65 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginRight: SIZES.base }}>{storeData.storeName}</Text>
                    <View style={{ borderWidth: 0.3, borderRadius: 8, flexDirection: 'row', paddingHorizontal: SIZES.base, backgroundColor: COLORS.darkgray }}>
                            <Image source={icons.cutlery} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#fff', alignSelf: 'center' }} />
                            <Text style={{ ...FONTS2.body4, color: '#fff' }}>{storeData.category}</Text>
                        </View>
                </View>

                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, flex: 1 }}>
                    <Image
                        source={icons.star}
                        resizeMode='contain'
                        style={{
                            width: SIZES.base * 1.6,
                            height: SIZES.base * 1.6,
                            marginRight: SIZES.base * 0.5,
                        }}
                    />
                    <Text style={{ ...FONTS2.body3, }}>{storeData.rate} </Text>
                    <Text style={{ ...FONTS2.body3, marginRight: SIZES.base * 0.5 }}>({storeData.reviewList.length}+), </Text>

                    <Text style={{ ...FONTS2.body3, color: '#000000' }}>배달팁 {storeData.deliveryTip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={icons.clock} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#000000' }} />
                    <Text style={{ ...FONTS2.body3, color: '#000000' }}>운영시간 {storeData.openTime} ~ {storeData.closeTime}</Text>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                    <Image source={icons.bell} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#000000', }} />
                    <Text numberOfLines={1} style={{ ...FONTS2.body3, color: '#000000' }}>{storeData.storeIntro}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 10,
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
        width: SIZES.width * 0.18,
        height: SIZES.height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        marginRight: 3,
    },
});

export default StoreItem;