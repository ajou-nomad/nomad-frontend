/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { COLORS, FONTS2, SIZES } from '../../constants';
import axiosApiInstance from '../../utils/axios';
import { digitTwo } from '../../utils/helper';

import Header from '../layout/Header';
import StoreButton from '../StoreButton';

const OrderDetailItem = ({ route, navigation }) => {

    const { item } = route.params;
    const deliveryDateTime = new Date(item.deliveryDateTime);

    let orderList = [];
    item.orderItemList.map( items => {
        items.map( item => orderList.push(item));
    });




    const renderItem = ({ item }) => {

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: SIZES.base * 2 }}>
                <Text style={{ ...FONTS2.h2 }}>{item.menuName} {item.quantity}개</Text>
                <Text style={{ ...FONTS2.h2 }}>{(item.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            </View>
        );
    };

    // orderStatus에 따른 버튼
    let button;
    if (item.orderStatus === 'recruitmentDone') {
        button = <StoreButton
                    title="접수하기"
                    color="#CED4DA"
                    fontColor="white"
                    onPress={ () => {
                        axiosApiInstance.post('/deliveryGroupOrder',{
                            groupId: item.groupId,
                            orderStatus: 'recruitmentAccept',
                        }).then(() => navigation.goBack());
                    }}
                />;
    } else if ((item.orderStatus === 'recruitmentAccept') || (item.orderStatus === 'waitingForDelivery')) {
        button = <StoreButton title="접수완료" color="#364FC7" fontColor="white"/>;
    } else if (item.orderStatus === 'delivering') {
        button = <StoreButton title="배달중" color="#364FC7" fontColor="white"/>;
    } else if (item.orderStatus === 'deliveryDone') {
        button = <StoreButton title="배달완료" color="#364FC7" fontColor="white"/>;
    }

    let cookingCompleteButton;
    if (item.orderStatus === 'recruitmentAccept') {
        cookingCompleteButton = (
            <View>
                <View style={styles.cookStatusContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...FONTS2.body3 }}>남은 준비 시간</Text>
                        <Text style={{ ...FONTS2.h1 }}>27분</Text>
                    </View>
                    <StoreButton
                        title="조리 완료"
                        color="#CED4DA"
                        fontColor="white"
                        onPress={ () => {
                            axiosApiInstance.post('/deliveryGroupOrder',{
                                groupId: item.groupId,
                                orderStatus: 'waitingForDelivery',
                            }).then(() => navigation.goBack());
                        }}
                    />
                </View>
            </View>
        );
    } else if (item.orderStatus === 'waitingForDelivery') {
        cookingCompleteButton = (
            <View>
                <View style={styles.cookStatusContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...FONTS2.body3 }}>남은 준비 시간</Text>
                        <Text style={{ ...FONTS2.h1 }}>27분</Text>
                    </View>
                    <StoreButton
                        title="조리 완료"
                        color="#364FC7"
                        fontColor="white"
                    />
                </View>
            </View>
        );
    }



    return (
        <View style={styles.container}>
            <Header title="진행 주문" small="true" />

            <View style={[styles.itemContainer, { marginTop: 20, }]}>
                <View>
                    <Text style={{ ...FONTS2.body2 }}>{`[${deliveryDateTime.getFullYear()}-${digitTwo(deliveryDateTime.getMonth() + 1)}-${digitTwo(deliveryDateTime.getUTCDate())}] ${digitTwo(deliveryDateTime.getUTCHours())}시 ${digitTwo(deliveryDateTime.getUTCMinutes())}분`} 주문</Text>
                    <Text style={{ ...FONTS2.h2, color: COLORS.darkgray, marginVertical: SIZES.base * 0.5 }}>{item.buildingName}</Text>
                    <Text style={{ ...FONTS2.body3 }}>{item.address}</Text>
                </View>
                <View style={{position: 'absolute', right: SIZES.width * 0.02,}}>
                    {button}
                </View>
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ color: 'red', ...FONTS2.body2, marginBottom: SIZES.base * 3 }}>점주에게 보내는 요청사항있을 경우에만 표시</Text>

                <FlatList
                    data={orderList}
                    keyExtractor={ (item, index) => index.toString()}
                    renderItem={renderItem}
                />
                {cookingCompleteButton}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    itemContainer: {
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cookStatusContainer: {
        flexDirection: 'row',
        width: responsiveWidth(90),
        backgroundColor: '#F1F3F5',
        padding: 20,
        borderRadius: 8,
        justifyContent: 'space-between',
        marginTop: SIZES.base * 2
    }
});

export default OrderDetailItem;