/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, View, } from 'react-native';

import { icons, FONTS2, COLORS } from '../constants';

const MyPageButton = ({ title, img, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={img}
                        style={{
                            width: 25,
                            height: 25,
                            marginRight: 15,
                        }}
                        resizeMode='contain' />
                    <Text style={{ ...FONTS2.body3, }}>{title}</Text>
                </View>
                
                <Image source={icons.next} style={{ width: 15, height: 25, tintColor: '#ced4da', }} resizeMode='contain' />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderTopWidth: 0.3,
        borderTopColor: '#ced4da',
        // flexDirection: 'row',
    },
});

export default MyPageButton;
