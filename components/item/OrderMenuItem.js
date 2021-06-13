/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FONTS2 } from '../../constants';


const OrderMenuItem = ({ isCart, orderDetail, delCartItem, delItem, promotion}) => {
    return (
        <View style={{ borderBottomWidth: 0.5, paddingBottom: 15, borderBottomColor: '#ced4da', marginBottom: 25, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, }}>
                <Text style={{ ...FONTS2.body2,  }}>{orderDetail.menuName}</Text>
                <Text style={{ ...FONTS2.body2,  }}>{orderDetail.quantity}개</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <Text style={{ ...FONTS2.h2 }}>{orderDetail.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            </View>
            { isCart ? (
                <View style={{ alignItems: 'flex-end' }}>
                    { promotion ? (
                        <>
                        </>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                delItem(orderDetail.menuId);
                                delCartItem(orderDetail.menuId);
                                ToastAndroid.showWithGravity('메뉴가 삭제되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                            }}
                        >
                            <Text style={{ ...FONTS2.body2, color: '#4dabf7' }}>삭제</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : null
            }
        </View>
    );
}

export default OrderMenuItem;
