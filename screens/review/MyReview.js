/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import Header from '../../components/layout/Header';
import { COLORS, FONTS, FONTS2 } from '../../constants';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


// 나중에 모달로 바꾸기(매장 메뉴 등록 부분 참고)
const MyReview = ({ route }) => {
    const { item } = route.params;
    const { menu, storeName, review } = item;
    
    const renderItem = ({ item }) => {
        return (
            <Text style={{ ...FONTS2.body3, }}>{item.menuName}</Text>
        );
    };

    return (
        <View style={styles.container}>
            <Header title='내가 작성한 리뷰' small='true' />
            <View style={styles.reviewContainer} >
                <Text style={{ ...FONTS2.h2 }}>{storeName}</Text>
                <Text style={{ ...FONTS2.body2, marginTop: 15, }}>{review.text}</Text>

                <View style={styles.menu}>
                    <Text style={{ ...FONTS2.body2, color: COLORS.darkgray, marginTop: 20, }}>주문 메뉴</Text>
                    <FlatList data={menu} keyExtractor={item => item.menuId} renderItem={renderItem}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    reviewContainer: {
        backgroundColor: COLORS.lightGray,
        padding: 20,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
        width: responsiveWidth(85),
    },
    menu: {
        marginTop: 10,
    }
});

export default MyReview;