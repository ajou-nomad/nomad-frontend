/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import { FONTS2, COLORS, SIZES } from '../constants';
import Header from '../components/layout/Header';
import Receipt from '../screens/Receipt';

import axiosApiInstance from '../utils/axios';
import { AuthContext } from '../context/AuthContextProvider';

const OrderDetails = () => {
    const navigation = useNavigation();
    const [memberOrderList, setMemberOrderList] = useState([]);

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);

        axiosApiInstance.get('/memberOrderList')
            .then(function (response) {
                console.log('주문 내역 데이터 요청: ', JSON.stringify(response.data.data, null, 4));
                setMemberOrderList(response.data.data.reverse());
                    
                setIsFetching(false);
            }).catch((e) => console.log(e));
    };


    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        
        // navigation에서 올때마다 최신데이터 호출( 리렌더링은 제외 )
        const unsubscribe = navigation.addListener('focus', async () => {

            axiosApiInstance.get('/memberOrderList')
                .then(function (response) {
                    console.log('주문 내역 데이터 요청: ', JSON.stringify(response.data.data, null, 4));
                    setMemberOrderList(response.data.data.reverse());
                    
                    setIsFetching(false);
                }).catch((e) => console.log(e));
        });

        //unmount 시 리스너 삭제
        return unsubscribe;
    }, [navigation]);


    const ReviewButton = ({ item }) => {
        return (
            <View>
                {item.reviewList.reviewId === null ? (
                    <TouchableOpacity style={styles.reviewButtonContainer} onPress={() => navigation.navigate('CreateReview', { item: item })}>
                        <Text style={styles.buttonText}>
                            리뷰 쓰기
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.reviewButtonContainer} onPress={() => navigation.navigate('MyReview', { item: item })}>
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
            else if (deliveryComplete === 'recruitmentAccept') {
                return (
                    <View style={{ backgroundColor: '#f03e3e', padding: SIZES.padding * 0.25, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body4, color: COLORS.white }}>접수 완료</Text>
                    </View>
                );
            }
            else if ((deliveryComplete === 'delivering' ) || (deliveryComplete === 'waitingForDelivery')) {
                return (
                    <View style={{ backgroundColor: '#f03e3e', padding: SIZES.padding * 0.25, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body4, color: COLORS.white }}>배달 중</Text>
                    </View>
                );
            }
            else if (deliveryComplete === 'deliveryDone') {
                return (
                    <View style={{ backgroundColor: COLORS.darkgray, padding: SIZES.padding * 0.25, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body4, color: COLORS.white }}>배달 완료</Text>
                    </View>
                );
            }
            else {
                 return (
                    <View style={{ borderWidth: 0.3, borderColor: 'red', padding: SIZES.padding * 0.25, borderRadius: 8 }}>
                        <Text style={{ ...FONTS2.body4, color: 'red' }}>주문취소</Text>
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
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.detailFont}>{item.quantity}개 </Text>
                    <Text style={styles.detailFont}>{item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                </View>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SIZES.base }}>
                    <TouchableOpacity>
                        <Text style={{ ...FONTS2.h2, fontSize: 25 }}>{item.storeName}</Text>
                        <Text style={{ ...FONTS2.body3 }}>{date.getFullYear()}년 {date.getMonth() + 1}월 {date.getUTCDate()}일 {date.getUTCHours()}시 {date.getUTCMinutes()}분</Text>
                    </TouchableOpacity>
                    <DeliveryState deliveryComplete={item.orderStatus} />
                </View>

                {/* 주문한 메뉴 */}
                <View style={{ marginVertical: SIZES.base * 1.5 }}>
                    {item.orderItemList.map((orderItem, index) => {
                        return (
                            <View key={index} style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailFont}>- {orderItem.menuName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.detailFont}>{orderItem.quantity}개 </Text>
                                    <Text style={styles.detailFont}>{orderItem.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                                </View>
                            </View>
                        );
                    })}
                    {/* <FlatList data={item.orderItemList} keyExtractor={item => item.orderItemId.toString()} renderItem={renderMenuItem} /> */}
                </View>

                <View style={{ justifyContent: 'space-between', flex: 1 }}>

                    {item.orderStatus === 'deliveryDone' ? (<ReviewButton item={item} />) : (null)}

                    <TouchableOpacity
                        style={styles.receiptButton}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.buttonText}>
                            영수증 보기
                        </Text>
                    </TouchableOpacity>
                </View>
                {item.orderStatus === 'recruiting' ? (
                    <TouchableOpacity
                        style={{ marginTop: SIZES.base, paddingRight: SIZES.base }}
                        onPress={() => {
                            Alert.alert(
                                '주문을 취소하시겠습니까?',
                                '',
                                [
                                    { text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel' },
                                    {
                                        text: 'YES', onPress: () => {
                                            axiosApiInstance.post('/memberOrderCancel', {
                                                memberOrderId: item.memberOrderId,
                                            }).then((res) => {
                                                console.log('포인트: ', res.data); // 응답으로 포인트

                                                dispatch({ type: 'RESTORE_POINT', point: res.data });
                                                // navigation.navigate('OrderDetails');
                                            }).catch((e) => {
                                                console.log(e);
                                            });
                                        },
                                    },
                                ]
                            );
                        }}
                    >
                        <Text style={{ ...FONTS2.body3, textAlign: 'right' }}>주문 취소</Text>
                    </TouchableOpacity>
                ) : (null)}
                
                <Receipt item={item} modalVisible={modalVisible} closeModal={closeModal} />
            </View>
        );
    };

    
    


    return (
        <View style={styles.container}>
            <Header title="주문 내역" small='true' />
            
            {/* <ScrollView style={{ padding: 15, flex: 1, }}>
                {memberOrderList.map((item, index) => {
                    return (
                        <OrderDetailItem key={index} item={item} />
                    );
                })}
            </ScrollView> */}
            <View style={{ padding: 15, flex: 1 }}>
                <FlatList onRefresh={onRefresh}
                refreshing={isFetching}data={memberOrderList} keyExtractor={item => item.memberOrderId.toString()} renderItem={({ item }) => <OrderDetailItem item={item} />} />
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
        marginVertical: 15,
        width: responsiveScreenWidth(90),
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: '#adb5bd',
    },
    reviewButtonContainer: {
        backgroundColor: '#339af0',
        padding: SIZES.padding,
        borderRadius: 8,
        opacity: 0.9,
    },
    receiptButton: {
        backgroundColor: '#ced4da',
        alignItems: 'center',
        borderRadius: 8,
        opacity: 0.9,
        padding: SIZES.padding,
        flex: 1,
        marginTop: SIZES.base,
    },
    buttonText: {
        ...FONTS2.body3,
        color: COLORS.white,
        fontSize: 18,
        alignSelf: 'center',
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
