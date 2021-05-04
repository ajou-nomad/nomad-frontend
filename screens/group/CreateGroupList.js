/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import StoreItem from '../../components/item/StoreItem';
import Header from '../../components/layout/Header';
import { FONTS2, SIZES } from '../../constants';
import { currentLocation } from '../../utils/helper';

import { responsiveWidth } from 'react-native-responsive-dimensions';
import MiniMap from '../../components/map/MiniMap';
import SelectButton from '../../components/layout/SelectButton';

function CreateGroupList({navigation, route}) {

    const [isSelected, setIsSelected] = useState(false);
    const [deliveryPlace, setDeliveryPlace] = useState(); // 핀으로 이동된 좌표 및 명칭



    const chooseDeliveryPlace = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ ...FONTS2.body2, color: '#495057', marginVertical: SIZES.height * 0.02 }}> 배달 장소를 선택해주세요.</Text>
                <View
                    style={{
                        width: SIZES.width * 0.9,
                        height: SIZES.height * 0.6,
                        borderColor: 'black',
                        borderWidth: 0.4,
                    }}
                >
                    <MiniMap location={route.params.initLocation} setDeliveryPlace={setDeliveryPlace} />
                </View>
                <SelectButton navigation={navigation} deliveryPlace={deliveryPlace} setDeliveryPlace={setDeliveryPlace} setIsSelected={setIsSelected} />
            </View>
        );
    };

    const haveLocation = () => {
        return (
            <View style={{ flex: 4, backgroundColor: 'white' }}>
                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        width: responsiveWidth(70),
                    }}
                    >
                        <View style={{ marginRight: 15, }}>
                            <Text style={{ color: 'red', ...FONTS2.h2 }}>위치:</Text>
                        </View>
                        <View>
                            <Text style={{ ...FONTS2.body2 }}>{deliveryPlace?.address}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: 'white' }}>
                    <ScrollView>
                        {/* FlatList 수정해야함. */}
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
                        <StoreItem deliveryPlace={deliveryPlace} />
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
            { isSelected ? haveLocation() : chooseDeliveryPlace()  }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CreateGroupList;
