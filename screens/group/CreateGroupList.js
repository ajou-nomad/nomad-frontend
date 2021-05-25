/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import StoreItem from '../../components/item/StoreItem';
import Header from '../../components/layout/Header';
import { COLORS, FONTS2, icons, SIZES } from '../../constants';
import axiosApiInstance from '../../utils/axios';

import { responsiveWidth } from 'react-native-responsive-dimensions';
import MiniMap from '../../components/map/MiniMap';
import SelectButton from '../../components/layout/SelectButton';

function CreateGroupList({ navigation, route }) {
    
    //route.params.initLocation.buildingName존재 시 배달장소를 선택할 필요x
    const [isSelected, setIsSelected] = useState(route.params.initLocation.buildingName ? true : false);
    const [deliveryPlace, setDeliveryPlace] = useState(route.params.initLocation.buildingName ? route.params.initLocation : '');
    const deliDate = route.params.deliDate;
    const datePicker = route.params.datePicker;
    const storeData = route.params.storeData;
    
    const onPlaceChange = (region) => {
        setDeliveryPlace(region);
    };

    useEffect(() => {
        // axiosApiInstance.get("/")
    }, []);


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
                            <Image source={icons.pin2} resizeMode='contain' style={{ width: 23, height: 23, marginRight: SIZES.base, opacity: 0.3 }} />
                            <Text style={{ ...FONTS2.body3 }}>{deliveryPlace?.address}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: 'white' }}>
                    <ScrollView>
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
        // shadowColor: "#3897f1",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,

        // elevation: 3,

        // borderColor: '#3897f1',
        borderWidth: 0.4,
        // backgroundColor: '#D6E3F2',
        // opacity: 0.3,
        padding: 5,
        paddingHorizontal: 30,
        borderRadius: 20,

        alignItems: 'center',
    },
});

export default CreateGroupList;
