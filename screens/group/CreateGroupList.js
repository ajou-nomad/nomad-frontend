/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import StoreItem from '../../components/item/StoreItem';
import BottomButton from '../../components/layout/BottomButton';
import Header from '../../components/layout/Header';
import { FONTS2, } from '../../constants';
import { currentLocation } from '../../utils/helper';

import { responsiveWidth } from 'react-native-responsive-dimensions';


function CreateGroupList({ navigation, route }) {
    const [location, setLocation] = useState(route.params.CurrentLocation);
    
    const noLocation = () => {
        return (
            <View style={{ flex: 4, backgroundColor: 'white' }}>
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    <Text style={{ ...FONTS2.body2, color: '#495057' }}>
                        주문 가능한 매장 목록이 없습니다.
                </Text>
                    <Text style={{ ...FONTS2.body2, color: '#495057' }}>
                        위치 정보 사용을 허용해주세요.
                </Text>
                </View>
            </View>
        );
    };

    const haveLocation = () => {
        return (
            <View style={{ flex: 4, backgroundColor: 'white', }}>
                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        width: responsiveWidth(70),
                    }}
                    >
                        <View style={{ marginRight: 15, }}>
                            <Text style={{ color: 'red', ...FONTS2.h2 }}>내위치</Text>
                        </View>
                        <View>
                            <Text style={{ ...FONTS2.body2, }}>{location}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: 'white', }}>
                    <ScrollView>
                        {/* FlatList 수정해야함. */}
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                        <StoreItem route={route} />
                    </ScrollView>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header title="배달 그룹 생성" small="true" />

            {/* Body */}
            {location !== null ? haveLocation() : noLocation()}

            {/* Footer */}
            <BottomButton onPress={() => {
                currentLocation()
                    .then((result) => {
                        setLocation(result.address);
                        console.log('현재위치 저장 완료');
                    })
                    .catch(e => console.log(e));

            }} title="내위치" isGetLocation="true" />
            {/* <BottomButton onPress={() => navigation.navigate('PaymentNavigation')} title="내위치" isGetLocation="true" /> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CreateGroupList;
