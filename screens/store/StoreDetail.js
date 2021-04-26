/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';

import { FONTS2, icons, COLORS } from '../../constants';


function StoreDetail() {
  return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    justifyContent: 'flex-end',
                }}
            >
                <View
                    style={{
                        alignSelf: 'center',
                        padding: 15,
                        borderWidth: 1,
                        borderColor: '#adb5bd',
                        borderBottomRightRadius: 20,
                        marginBottom: 10,
                    }}>
                    <Text style={{ ...FONTS2.h1, }}>배스킨라빈스 아주대점</Text>
                    <View style={{ flexDirection: 'row', marginTop: 3, alignSelf: 'center' }}>
                        <Image
                        source={icons.star}
                        resizeMode='contain'
                        style={{
                            width: 23,
                            height: 23,
                            marginRight: 5,
                        }}
                        />
                        <Text style={{...FONTS2.body2, }}>4.2 </Text>
                        <Text style={{...FONTS2.body2, }}>(50+)</Text> 
                    </View>
                </View>

                <View style={{ width: '60%', backgroundColor: 'white', alignSelf: 'center', marginBottom: 10, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{...FONTS2.body2 }}>최소주문금액</Text>
                        <Text style={{...FONTS2.body2 }}>13,500원</Text>
                    </View>
                
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{...FONTS2.body2 }}>배달팁</Text>
                        <Text style={{...FONTS2.body2 }}>2,000원</Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    flex: 2,
                    backgroundColor: COLORS.secondary,
                    justifyContent: 'flex-end',
                }}
            >
                <ScrollView>
                    <Text>dsfsd</Text>
                </ScrollView>
            </View>
            {/* flex end */}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default StoreDetail;
