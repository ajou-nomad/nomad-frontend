/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, LogBox, Image, } from 'react-native';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { FONTS2, COLORS, SIZES } from '../constants';
import Header from '../components/layout/Header';
import Receipt from '../screens/Receipt';


LogBox.ignoreAllLogs();

import { getData } from '../utils/helper';
import axiosApiInstance from '../utils/axios';

const OrderDetails = () => {
    const navigation = useNavigation();
    const [orderData, setOrderData] = useState(null);
    const [memberOrderList, setMemberOrderList] = useState(null);

    useEffect(() => {
        getData('orderData').then(data => setOrderData(data));

        console.log(JSON.stringify(orderData, null, 4));

        // axiosApiInstance.get('/memberOrderList')
        //     .then(function (response) {
        //         console.log('주문 내역 데이터 요청: ', JSON.stringify(response.data, null, 4));
        //         setMemberOrderList(response.data.data);
        //     });
    }, []);

    const ReviewButton = ({ item }) => {
        const [items, setItems] = useState(item);
        return (
            <View>
                {items.review === null ? (
                    <TouchableOpacity style={styles.reviewButtonContainer} onPress={() => navigation.navigate('CreateReview', { item: items, setItems: setItems })}>
                        <Text style={styles.buttonText}>
                            리뷰 쓰기
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.reviewButtonContainer} onPress={() => navigation.navigate('MyReview', { item: items })}>
                        <Text style={styles.buttonText}>
                            작성한 리뷰 보기
                        </Text>
                    </TouchableOpacity>
                )
                }
            </View>
        );
    };

    const DeliveryState = ({ deliveryComplete }) => {

        const status = () => {
            if (deliveryComplete === 'recruiting') {
                return (
                    <View style={{ backgroundColor: '#228be6', padding: SIZES.padding * 0.25, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body4, color: COLORS.white }}>모집 중</Text>
                    </View>
                );
            }
            else if (deliveryComplete === 'recruitmentDone') {
                return (
                    <View style={{ backgroundColor: '#e67700', padding: SIZES.padding * 0.25, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body4, color: COLORS.white }}>모집 완료</Text>
                    </View>
                );
            }
            else if (deliveryComplete === 'delivering') {
                return (
                    <View style={{ backgroundColor: '#f03e3e', padding: SIZES.padding * 0.25, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body4, color: COLORS.white }}>배달 중</Text>
                    </View>
                );
            }
            else {
                return (
                    <View style={{ backgroundColor: COLORS.darkgray, padding: SIZES.padding * 0.25, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body4, color: COLORS.white }}>배달 완료</Text>
                    </View>
                );
            }
            // 배달 완료: #495057 배달 중: #f03e3e 모집 중: #228be6 모집 완료: #e67700
        };

        return (
            <View>
                {status()}
            </View>
        );
    };

    const renderMenuItem = ({ item }) => {
        return (
            <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.detailFont}>- {item.menuName}</Text>
                <Text style={styles.detailFont}>{item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
            </View>
        );
    };

    const OrderDetailItem = ({ deliveryComplete, onPress, item }) => {
        const [modalVisible, setModalVisible] = useState(false);

        const closeModal = () => {
            setModalVisible(!modalVisible);
        };

        const date = new Date(item.orderTime);
        return (
            <View style={styles.storeContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
                    <TouchableOpacity
                    // onPress={() => navigation.navigate('StoreDetail', { time: null, storeName: item.storeName })}
                    >
                        <Text style={{ ...FONTS2.h2, fontSize: 25 }}>{item.storeName}</Text>
                        <Text style={{ ...FONTS2.body3 }}>{date.getFullYear()}년 {date.getMonth()}월 {date.getDay()}일 {date.getUTCHours()}시 {date.getUTCMinutes()}분</Text>
                    </TouchableOpacity>
                    <DeliveryState deliveryComplete={item.orderStatus} />
                </View>

                {/* 주문한 메뉴 */}
                <View style={{ minHeight: 70 }}>
                    <FlatList data={item.menu} keyExtractor={item => item.menuId.toString()} renderItem={renderMenuItem} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <ReviewButton item={item} />
                    <View style={{ width: 10 }} />

                    <TouchableOpacity
                        style={styles.receiptButton}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.buttonText}>
                            영수증 보기
                        </Text>
                    </TouchableOpacity>

                    <Receipt item={item} modalVisible={modalVisible} closeModal={closeModal} />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header title="주문 내역" small='true' />
            <View style={{ padding: 15, flex: 1 }}>
                <FlatList data={orderData} keyExtractor={item => item.orderId.toString()} renderItem={({ item }) => <OrderDetailItem item={item} />} inverted />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    storeContainer: {
        marginVertical: 10,
        width: responsiveScreenWidth(90),
        // backgroundColor: '#f1f3f5',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: '#adb5bd',
    },
    reviewButtonContainer: {
        backgroundColor: '#339af0',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        width: 140,
        opacity: 0.9,
    },
    receiptButton: {
        backgroundColor: '#339af0',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        width: 140,
        opacity: 0.9,
    },
    buttonText: {
        ...FONTS2.body3,
        color: COLORS.white,
        fontSize: 18,
    },
    totalCost: {
        marginTop: 20,
        borderTopWidth: 0.5,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailFont: {
        ...FONTS2.body3,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default OrderDetails;
