/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FONTS2, icons, SIZES } from '../constants';
import { useNavigation } from '@react-navigation/native';



export default function GroupInfo(props) {
    const navigation = useNavigation();
    console.log('GroupInfo: ', JSON.stringify(props, null, 4));

    return (
        <TouchableOpacity
            style={{ borderBottomWidth: 0.6, borderBottomColor: '#e9ecef', paddingHorizontal: 5, }}
            onPress={() => navigation.navigate('StoreDetail', { storeInfo: props.storeInfo, groupData: props.groupData, deliDate: props.deliDate, time: props.groupData.time, deliveryPlace: props.location })}
        >
            <View style={props.styleGroupInfo}>
                <View style={styles.logoImageContainer}>
                    <Image style={[props.styleLogoImage, { width: 55, height: 55 }]} source={{ uri: props.storeInfo.logoUrl }} resizeMode='contain' />
                </View>
                <View style={styles.shopInfo}>
                    <Text style={{ ...FONTS2.h3 }}>{props.storeInfo.storeName}</Text>
                    <View style={props.styleRating}>
                        <Image style={props.styleStarImage} source={icons.star} />
                        <Text style={{ ...FONTS2.body3 }}>{props.storeInfo.rate}/5.0</Text>
                    </View>
                    <View style={props.styleDeliveryTime}>
                        <Image style={styles.timeImage} source={icons.clock} />
                        <Text style={{ ...FONTS2.body3 }}> {props.time}</Text>
                    </View>
                </View>
                <View style={styles.groupNumber}>
                    <Image style={styles.userImage} source={icons.user}/>
                    <Text style={{ ...FONTS2.body3 }}>{props.current} / {props.max}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
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
    shopInfo: {
        marginLeft: SIZES.base,
    },
    groupNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 35,
        position: 'absolute',
        right: 5,
    },
    userImage: {
        width: 20,
        height: 20,
        tintColor: '#495057',
    },
    timeImage: {
        width: 12,
        height: 12,
        tintColor: '#495057',
    },
});
