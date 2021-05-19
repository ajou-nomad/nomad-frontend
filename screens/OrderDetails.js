/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, LogBox, Image } from 'react-native';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/layout/Header';
import { FONTS2, COLORS } from '../constants';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

LogBox.ignoreAllLogs();

import { getData } from '../utils/helper';

const OrderDetails = () => {
    const navigation = useNavigation();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        getData('orderData').then(data => setOrderData(data));
    }, []);

    const ReviewButton = ({ item }) => {
        const [items, setItems] = useState(item);
        return (
            <View>
                {items.review === null ? (
                    <TouchableOpacity style={styles.reviewButtonContainer} onPress={() => navigation.navigate('CreateReview', { item: items, setItems: setItems })}>
                        <Text style={styles.ReviewButton}>
                            리뷰 쓰기
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.reviewButtonContainer} onPress={() => navigation.navigate('MyReview', { item: items })}>
                        <Text style={styles.ReviewButton}>
                            작성한 리뷰 보기
                        </Text>
                    </TouchableOpacity>
                )
                }
            </View>
        );
    };
    const StoreButton = ({ onPress }) => {
        return (
            <TouchableOpacity style={styles.storeButton} onPress={onPress}>
                <Text style={{ ...FONTS2.body3, color: COLORS.black,  fontSize: 18 }}>
                    영수증 보기
            </Text>
            </TouchableOpacity>
        );
    };

    const DeliveryState = ({ deliveryComplete }) => {

        // 모집중 모집완료 배달 중 배달 완료
        // recruiting   recruitmentDone  delivering deliveryDone

        const status = () => {
            if (deliveryComplete === 'recruiting') {
                return (
                    <View style={{ backgroundColor: '#228be6', padding: 3, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body3, color: COLORS.white }}>모집 중</Text>
                    </View>
                );
            }
            else if (deliveryComplete === 'recruitmentDone') {
                return (
                    <View style={{ backgroundColor: '#e67700', padding: 3, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body3, color: COLORS.white }}>모집 완료</Text>
                    </View>
                );
            }
            else if (deliveryComplete === 'delivering') {
                return (
                    <View style={{ backgroundColor: '#f03e3e', padding: 3, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body3, color: COLORS.white }}>배달 중</Text>
                    </View>
                );
            }
            else {
                return (
                    <View style={{ backgroundColor: COLORS.darkgray, padding: 3, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body3, color: COLORS.white }}>배달 완료</Text>
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
        return (
            <View style={styles.storeContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate('StoreDetail', { time: null, storeName: item.storeName })}
                    >
                        <Text style={{ ...FONTS2.h2, fontSize: 25 }}>{item.storeName}</Text>
                        <Text style={{ ...FONTS2.body3 }}>{item.orderTime}</Text>
                    </TouchableOpacity>
                    <DeliveryState deliveryComplete={item.orderStatus} />
                </View>

                {/* 주문한 메뉴 */}
                <View style={{ minHeight: 70 }}>
                    <FlatList data={item.menu} keyExtractor={item => item.menuId.toString()} renderItem={renderMenuItem}/>
                </View>
            
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <ReviewButton item={item}/>
                    <View style={{ width: 10 }} />
                    <StoreButton onPress={() => navigation.navigate('Receipt')} />
                </View>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        return (
            <OrderDetailItem item={item} />
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Header title="주문 내역" small='true' />
            <FlatList data={orderData} keyExtractor={item => item.orderId.toString()} renderItem={renderItem} inverted />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
    },
    storeContainer: {
        marginVertical: 10,
        width: responsiveScreenWidth(90),
        backgroundColor: '#f1f3f5',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
    },
    reviewButtonContainer: {
        // backgroundColor: '#1c7ed6',
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        width: 140,
    },
    ReviewButton: {
        ...FONTS2.body3,
        color: COLORS.black,
        fontSize: 18,
    },
    storeButton: {
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        width: 140,
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
