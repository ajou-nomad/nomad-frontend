/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import Header from '../../components/layout/Header';
import BottomButton from '../../components/layout/BottomButton';
import OrderMenuItem from '../../components/item/OrderMenuItem';

import { COLORS, FONTS2 } from '../../constants';

const Cart = ({ navigation, route:{params} }) => {

    const renderBody = () => {
        return (
            <View style={{ backgroundColor: COLORS.white, }}>
                <View>
                    {/* 가게이름, 메뉴 */}
                    <View style={{ margin: 30, }}>
                        <Text style={{ ...FONTS2.h2, marginBottom: 10, }}>배스킨라빈스 아주대점</Text>
                        <OrderMenuItem isCart="true" />
                    </View>
                    {/* 메뉴 추가 버튼 */}
                    <TouchableOpacity
                        style={{ alignItems: 'center', }}
                        onPress={() => navigation.navigate('StoreDetail')}
                    // navigate 할 때 원래 주문했던 매장 페이지로 이동해야함.
                    >
                        <Text style={{ ...FONTS2.body2, color: '#4dabf7' }}>+ 메뉴 추가</Text>
                    </TouchableOpacity>
                </View>
                {/* 요청 사항(가게 사장님, 배달 기사님?) */}
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ ...FONTS2.h2, marginBottom: 10 }}>요청사항</Text>
                    <View>
                        <Text style={{ ...FONTS2.body2, marginBottom: 5 }}>가게 사장님에게</Text>
                        <TextInput
                            style={{ ...FONTS2.body2, borderWidth: 0.5, color: COLORS.lightGray, marginBottom: 10 }} placeholder="가게 사장님에게" />
                    </View>

                    <View>
                        <Text style={{ ...FONTS2.body2, marginBottom: 5, }}>배달원에게</Text>
                        <TextInput
                            style={{ ...FONTS2.body2, borderWidth: 0.5, color: COLORS.lightGray, }} placeholder="배달원에게" />
                    </View>
                </View>

                {/* 주문 금액 */}
                <View style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.body2 }}>주문 금액</Text>
                        <Text style={{ ...FONTS2.body2 }}>8,200원</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.body2 }}>배달비</Text>
                        <Text style={{ ...FONTS2.body2 }}>0원</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingTop: 15, borderTopWidth: 0.5 }}>
                        <Text style={{ ...FONTS2.h2 }}>총 결제 금액</Text>
                        <Text style={{ ...FONTS2.h2 }}>8,200원</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                {/* 카트 */}
                <Header title="카트" haveInput="true" />
                {/* 메뉴, 주문 금액, 요청사항 */}
                {renderBody()}
                {/* 그룹 생성하기 버튼 */}
                <BottomButton onPress={() => navigation.navigate('CreateGroupDetail', { time: params.time, location: params.location, storeName: params.storeName })} title="그룹 생성하기" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Cart;
