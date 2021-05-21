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
import { COLORS, FONTS2, SIZES } from '../../constants';

import { responsiveWidth } from 'react-native-responsive-dimensions';
import MiniMap from '../../components/map/MiniMap';
import SelectButton from '../../components/layout/SelectButton';

function CreateGroupList({navigation, route}) {
    //route.params.initLocation.buildingName존재 시 배달장소를 선택할 필요x
    const [isSelected, setIsSelected] = useState(route.params.initLocation.buildingName ? true : false);
    const [deliveryPlace, setDeliveryPlace] = useState(route.params.initLocation.buildingName ? route.params.initLocation : '');
    const deliDate = route.params.deliDate;
    const datePicker = route.params.datePicker;
    const storeData = route.params.storeData;
    
    const onPlaceChange = (region) => {
        setDeliveryPlace(region);
    };


    const chooseDeliveryPlace = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ ...FONTS2.body2, color: '#495057', marginVertical: SIZES.height * 0.02 }}>배달 장소를 선택해주세요.</Text>
                <View
                    style={{
                        width: SIZES.width * 0.9,
                        height: SIZES.height * 0.6,
                        borderColor: 'black',
                        borderWidth: 0.4,
                    }}
                >
                    <MiniMap location={route.params.initLocation} onPlaceChange={onPlaceChange} />
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
                        <View style={styles.location}>
                            <View style={{ marginRight: 15, }}>
                                <Text style={{ color: 'red', ...FONTS2.h2 }}>내 위치</Text>
                            </View>
                            <View>
                                <Text style={{ ...FONTS2.body2 }}>{deliveryPlace?.address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: 'white' }}>
                    <ScrollView>
                        {/* FlatList 수정해야함. */}
                        {storeData.map((storeItems, index) => {
                            return <StoreItem key={index} storeData={storeItems} deliveryPlace={deliveryPlace} deliDate={deliDate} datePicker={datePicker} />;
                        })}
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
    location: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
});

export default CreateGroupList;
