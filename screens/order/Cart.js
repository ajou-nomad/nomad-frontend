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
import { COLORS, FONTS2 } from '../../constants';

const Cart = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <View style={{ flex: 4, backgroundColor: COLORS.white }}>
                <View style={{ alignItems: 'center', marginTop: 15, }}>
                    <Text style={{ ...FONTS2.h1 }}>카트</Text>
                </View>
            </View>
        );
    };

    const renderBody = () => {
        return (
            <View style={{ backgroundColor: 'yellow' }}>
                {/* 메뉴 */}

                {/* 주문 금액 */}

                {/* 요청 사항(가게 사장님, 배달 기사님?) */}
            </View>
        );
    };

    const renderBottom = () => {
        return (
            <TouchableOpacity
                style={{ flex: 0.5, backgroundColor: '#EDF2FF', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('CreateGroupDetail')}
            >
                <Text style={{ ...FONTS2.h2, }}>그룹 생성하기</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* 카트 */}
            {renderHeader()}
            {/* 메뉴, 주문 금액, 요청사항 */}
            {renderBody()}
            {/* 그룹 생성하기 버튼 */}
            {renderBottom()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Cart;
