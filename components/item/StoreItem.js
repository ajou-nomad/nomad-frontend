/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FONTS2, images, icons } from '../../constants';

const StoreItem = ({ route }) => {

    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 10, }}>
            <Image
                source={images.store_logo}
                resizeMode='contain'
                style={{
                    width: 60,
                    height: 60,
                }}
            />

            <View style={{ flex: 1, alignSelf: 'center', marginLeft: 5, }}>
                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>빽다방 아주대점</Text>
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
                    <Text style={{ ...FONTS2.body2, }}>4.2 </Text>
                    <Text style={{ ...FONTS2.body2, }}>(50+)</Text>
                </View>
            </View>

            <TouchableOpacity style={{
                marginRight: 15,
                flex: 0.3,
                padding: 5,
                alignItems: 'center',
                borderWidth: 0.5,
                borderRadius: 8,
                borderBottomRightRadius: 20,
                borderColor: '#707070',
                alignSelf: 'center',
                width: 20,
            }}
                // onPress={() => navigation.navigate('StoreDetail', { time: null, storeName:/* .map(storeName:item.storeName) */'빽다방 아주대점', location: location })}
                onPress={() => navigation.navigate('StoreDetail', { time: null, storeName:/* .map(storeName:item.storeName) */'빽다방 아주대점', location: route.params.CurrentLocation })}
            >
                <Text style={{ ...FONTS2.h3 }}>선택</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StoreItem;
