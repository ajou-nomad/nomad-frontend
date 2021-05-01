/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Header from '../../components/layout/Header';
import OrderMenuItem from '../../components/item/OrderMenuItem';

import { COLORS, FONTS2 } from '../../constants';
import BottomButton from '../../components/layout/BottomButton';

const Cart = ({ navigation }) => {

    const renderBody = () => {
        return (
            <View style={{ flex: 4, backgroundColor: COLORS.white }}>
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
                {/* 주문 금액 */}

                {/* 요청 사항(가게 사장님, 배달 기사님?) */}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* 카트 */}
            <Header title="카트" />
            {/* 메뉴, 주문 금액, 요청사항 */}
            {renderBody()}
            {/* 그룹 생성하기 버튼 */}
            <BottomButton onPress={() => navigation.navigate('CreateGroupDetail')} title="그룹 생성하기" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Cart;
