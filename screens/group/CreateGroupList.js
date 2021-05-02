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


function CreateGroupList({ navigation, route }) {
    // const [location, setLocation] = useState(route.params.CurrentLocation);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        currentLocation(setLocation);
    }, []);

    console.log(location);
    // {"accuracy": 17.48200035095215, "address": "대한민국 경기도 수원시 영통구 원천 동 25-2", "altitude": 69.5999984741211, "heading": 0, "latitude": 37.2763109, "longitude": 127.0439397, "speed": 0}

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
            <View style={{ flex: 4 }}>
                <View style={{
                    flex: 0.8,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
                >
                    <View style={{ marginRight: 15, }}>
                        <Text style={{ color: 'red', ...FONTS2.h2 }}>내 위치</Text>
                    </View>
                    <View>
                        <Text style={{ ...FONTS2.body2, }}>{location.address}</Text>
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: 'white', }}>
                    <ScrollView>
                        {/* FlatList 수정해야함. */}
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
                        <StoreItem location={location} />
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
            <BottomButton onPress={() => currentLocation(setLocation)} title="내위치" isGetLocation="true" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CreateGroupList;
