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

const StoreItem = ({ deliveryPlace, deliDate, items, isLikeList, item }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={images.store_logo}
                resizeMode='contain'
                style={{
                    width: 60,
                    height: 60,
                }}
            />

            <View style={{ flex: 1, alignSelf: 'center', marginLeft: 5, }}>
                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>{item.storeName}</Text>
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

            <TouchableOpacity style={styles.selectButton}
                // onPress={() => navigation.navigate('StoreDetail', { time: null, storeName:/* .map(storeName:item.storeName) */'빽다방 아주대점', location: location })}
                onPress={() => navigation.navigate('StoreDetail', { time: null, deliveryPlace: deliveryPlace, deliDate: deliDate, /* items: items */ item: item})}
            >
                {!isLikeList ? (
                    <Text style={{ ...FONTS2.body2, color: COLORS.black }}>선택</Text>
                ) : (
                    <Text style={{ ...FONTS2.body2, color: COLORS.black, fontSize: 19 }}>매장 보기</Text>
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
