/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect, } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
} from 'react-native';
import StoreItem from '../../components/item/StoreItem';
import Header from '../../components/layout/Header';
import { FONTS2, SIZES, images } from '../../constants';

import { responsiveWidth } from 'react-native-responsive-dimensions';
import MiniMap from '../../components/map/MiniMap';
import SelectButton from '../../components/layout/SelectButton';

import { clearAll, setData, getData, addData} from '../../utils/helper';

    
const HaveLocation = ({ deliveryPlace, deliDate, items }) => {
    console.log('iiii: ', items);
    
    // const [storeData, setStoreData] = useState(null);

    const storeData = [
        {
            storeId: 1,
            storeName: '빽다방 아주대점',
            phoneNumber: '070-7543-3601',

            address: '경기 수원시 영통구 원천동 25-2',
            latitude: 37.2763246,
            longitude: 127.0441309,

            openTime: '09:00',
            closeTime: '22:00',
            deliveryTip: 2000,
            logoUrl: '',
            menu: [
                {
                    menuId: 1,
                    menuName: '앗!메리카노(ICED)',
                    cost: 2000,
                    description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
                    imgUrl: '',
                },
                {
                    menuId: 2,
                    menuName: '앗!메리카노(HOT)',
                    cost: 1500,
                    description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
                    imgUrl: '',
                },
                {
                    menuId: 3,
                    menuName: '바닐라라떼(ICED)',
                    cost: 3000,
                    description: '부드러운 우유와 달콤하고 은은한 바닐라가 조화를 이루는 음료',
                    imgUrl: '',
                },
                {
                    menuId: 4,
                    menuName: '바닐라라떼(HOT)',
                    cost: 2500,
                    description: '부드러운 우유와 달콤하고 은은한 바닐라가 조화를 이루는 음료',
                    imgUrl: '',
                },
                {
                    menuId: 5,
                    menuName: '달달연유라떼(ICED)',
                    cost: 2500,
                    description: '달달하고 향긋한 베트남식 연유라떼',
                    imgUrl: '',
                },
                {
                    menuId: 6,
                    menuName: '달달연유라떼(HOT)',
                    cost: 2500,
                    description: '달달하고 향긋한 베트남식 연유라떼',
                    imgUrl: '',
                },
                {
                    menuId: 7,
                    menuName: '카라멜마키아또(ICED)',
                    cost: 3500,
                    description: '카라멜소스와 신선한 우유, 에스프레소로 맛을 낸 달콤한 빽다방 인기메뉴',
                    imgUrl: '',
                },
                {
                    menuId: 8,
                    menuName: '카라멜마키아또(HOT)',
                    cost: 3000,
                    description: '카라멜소스와 신선한 우유, 에스프레소로 맛을 낸 달콤한 빽다방 인기메뉴',
                    imgUrl: '',
                },
                {
                    menuId: 9,
                    menuName: '완전아이스초코',
                    cost: 3500,
                    description: '초코에 퐁당 빠지고 싶을때~!? 진짜~! 완~전 진한 초코라떼',
                    imgUrl: '',
                },
                {
                    menuId: 10,
                    menuName: '완전핫초코',
                    cost: 3000,
                    description: '초코에 퐁당 빠지고 싶을때~!? 진짜~! 완~전 진한 초코라떼',
                    imgUrl: '',
                },
            ],
        },
        {
            storeId: 2,
            storeName: '스타벅스 아주대점',
            phoneNumber: '1522-3232',

            address: '경기도 수원시 팔달구 우만동 58-32',
            latitude: 37.2783595,
            longitude: 127.046209,

            openTime: '07:00',
            closeTime: '22:00',
            deliveryTip: 2000,
            logoUrl: '',
            menu: [
                {
                    menuId: 11,
                    menuName: '아이스 카페 아메리카노',
                    cost: 4100,
                    description: '진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피',
                    imgUrl: '',
                },
                {
                    menuId: 12,
                    menuName: '아이스 카푸치노',
                    cost: 4600,
                    description: '풍부하고 진한 에스프레소에 신선한 우유와 우유 거품이 얼음과 함께 들어간 시원하고 부드러운 커피 음료',
                    imgUrl: '',
                },
                {
                    menuId: 13,
                    menuName: '스타벅스 돌체 라떼',
                    cost: 5600,
                    description: '스타벅스의 다른 커피 음료보다 더욱 깊은 커피의 맛과 향에 깔끔한 무지방 우유와 부드러운 돌체 시럽이 들어간 음료로 달콤하고 진한 커피 라떼',
                    imgUrl: '',
                },
                {
                    menuId: 14,
                    menuName: '자바 칩 프라푸치노',
                    cost: 6100,
                    description: '커피, 모카 소스, 진한 초콜릿 칩이 입안 가득 느껴지는 스타벅스에서만 맛볼 수 있는 프라푸치노',
                    imgUrl: '',
                },
            ],
        },
    ];


    // useEffect(() => {
    //     getData('storeData').then(data => {
    //         console.log(JSON.stringify(data, null, 4));
    //         setStoreData(data);
    //     });
    // }, []);

    const renderItem = ({ item }) => {
        return (
            <StoreItem deliveryPlace={deliveryPlace} deliDate={deliDate} item={item} /*items={items}*/ />
        );
    };

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
            <SafeAreaView style={{ flex: 5, backgroundColor: 'white' }}>
                <SafeAreaView>
                    <FlatList data={storeData} keyExtractor={item => item.storeId} renderItem={renderItem} />
                    {/* <StoreItem deliveryPlace={deliveryPlace} deliDate={deliDate} items={items} /> */}
                </SafeAreaView>
            </SafeAreaView>
        </View>
    );
};

function CreateGroupList({navigation, route}) {

    //route.params.initLocation.buildingName존재 시 배달장소를 선택할 필요x
    const [isSelected, setIsSelected] = useState(route.params.initLocation.buildingName ? true : false);
    const [deliveryPlace, setDeliveryPlace] = useState(route.params.initLocation.buildingName ? route.params.initLocation : '');
    const deliDate = route.params.deliDate;
    const items = route.params.items;
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

    

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header title="배달 그룹 생성" small="true" />

            {/* Body */}
            { isSelected ? <HaveLocation deliveryPlace={deliveryPlace} deliDate={deliDate} items={items} /> : chooseDeliveryPlace()  }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CreateGroupList;
