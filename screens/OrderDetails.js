/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/layout/Header';
import { FONTS2, COLORS } from '../constants';

import { clearAll, setData, getData, addData} from '../utils/helper';

const OrderDetails = () => {
    const navigation = useNavigation();

    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        getData('orderData').then(data => {
            console.log(JSON.stringify(data, null, 4));
            setOrderData(data);
        });
    }, []);

    const ReviewButton = ({ isWriteReview, onPress }) => {

        return (
            <TouchableOpacity style={styles.reviewButton} onPress={onPress}>
                {isWriteReview ? (
                    <Text style={{ ...FONTS2.body2, color: COLORS.black }}>
                        리뷰 쓰기
                    </Text>
                ) : (
                    <Text style={{ ...FONTS2.body2, color: COLORS.black }}>
                        작성한 리뷰 보기
                    </Text>
                )
                }
            </TouchableOpacity>
        );
    };

    const StoreButton = ({ onPress }) => {
        return (
            <TouchableOpacity style={styles.storeButton} onPress={onPress}>
                <Text style={{ ...FONTS2.body2, color: COLORS.black }}>
                    영수증 보기
            </Text>
            </TouchableOpacity>
        );
    };

    const DeliveryState = ({ deliveryComplete }) => {
        return (
            <View>
                { deliveryComplete ? (
                    <View style={{ backgroundColor: '#f03e3e', padding: 3, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body3, color: COLORS.white }}>배달 중</Text>
                    </View>
                ) : (
                    <View style={{ backgroundColor: '#2f9e44', padding: 3, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body3, color: COLORS.white }}>배달 완료</Text>
                    </View>
                )}
            </View>
        );
    };

    const OrderDetailItem = ({ isWriteReview, deliveryComplete, onPress }) => {
        return (
            <View style={styles.storeContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('StoreDetail', { time: null, storeName:/* .map(storeName:item.storeName) */'빽다방 아주대점' })}
                    >
                        <Text style={{ ...FONTS2.h2, fontSize: 30 }}>가게 이름 &gt;</Text>
                        <Text style={{ ...FONTS2.body3 }}>2021-05-11 16:05</Text>
                    </TouchableOpacity>
                    <DeliveryState deliveryComplete={deliveryComplete} />
                </View>

                {/* 주문한 메뉴 */}
                <View style={{ marginVertical: 20 }}>
                    <Text style={{ ...FONTS2.body2 }}>- 주문한 메뉴</Text>
                </View>
            
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <ReviewButton isWriteReview={isWriteReview} onPress={() => navigation.navigate('CreateReview')} />
                    <View style={{ width: 10 }} />
                    <StoreButton onPress={() => navigation.navigate('Receipt')} />
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Header title="주문 내역" small='true' />
            
            <OrderDetailItem isWriteReview={true} deliveryComplete={true} />
            <OrderDetailItem isWriteReview={true} deliveryComplete={true} />
            <OrderDetailItem isWriteReview={false} deliveryComplete={false} />
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
    reviewButton: {
        // backgroundColor: '#1c7ed6',
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        width: 140,
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
});

export default OrderDetails;

