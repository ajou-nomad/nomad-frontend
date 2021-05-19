/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FONTS2 } from '../../constants';

const orderInfo = {
    storeName: '배스킨라빈스 아주대점',
    delPlace: '아주대학교 팔달관',
    delTime: '9:00',
    peopleNum: 1,
    totalNum: 4,
    foods: [
        {
            name: '파인트(플레이버 3가지)',
            total: 1,
            price: 8200,
            options: [
                {
                    name: '31요거트',
                    total: 2,
                },
                {
                    name: '엄마는 외계인',
                    total: 1,
                },
            ],
        }
    ]
};

const OrderMenuItem = ({ isCart, orderDetail }) => {
    // console.log(orderDetail);
    return (
        <View style={{ borderBottomWidth: 0.5, paddingBottom: 15, borderBottomColor: '#ced4da', marginBottom: 25, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, }}>
                <Text style={{ ...FONTS2.body2,  }}>{orderDetail.menuName}</Text>
                <Text style={{ ...FONTS2.body2,  }}>{orderDetail.quantity}개</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                {/* 옵션 정보 */}
                {/* <View style={{ width: '50%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.body2 }}>{orderInfo.foods[0].options[0].name}</Text>
                        <Text style={{ ...FONTS2.body2 }}>{orderInfo.foods[0].options[0].total} 개</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.body2 }}>{orderInfo.foods[0].options[1].name}</Text>
                        <Text style={{ ...FONTS2.body2 }}>{orderInfo.foods[0].options[1].total} 개</Text>
                    </View>
                </View> */}

                {/* 가격 */}
                <Text style={{ ...FONTS2.h2 }}>{orderDetail.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            </View>
            { isCart ? (
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => alert('메뉴 삭제')}
                    >
                        <Text style={{ ...FONTS2.body2, color: '#4dabf7' }}>삭제</Text>
                    </TouchableOpacity>
                </View>
            ) : null
            }
        </View>
    );
}

export default OrderMenuItem;
