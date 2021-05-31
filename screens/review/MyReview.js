/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Header from '../../components/layout/Header';
import { COLORS, FONTS, FONTS2, SIZES } from '../../constants';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


// 나중에 모달로 바꾸기(매장 메뉴 등록 부분 참고)
const MyReview = ({ route }) => {
    const { item } = route.params;
    // const { orderItemList, storeName, review } = item;

    // console.log(JSON.stringify(route.params, null, 4));
    
    const renderItem = ({ item }) => {
        return (
            <Text style={{ ...FONTS2.body3, }}> · {item.menuName}</Text>
        );
    };
    
    return (
        <View style={styles.container}>
            <Header title='내가 작성한 리뷰' small='true' />
            <View style={styles.reviewContainer} >
                <Text style={{ ...FONTS2.h2 }}>{item.storeName}</Text>

                <Image source={{ uri: item.reviewList.imgUrl }} resizeMode='contain' style={{ width: responsiveWidth(65), height: responsiveHeight(40), marginTop: SIZES.base * 1.5 }}/>
                <Text style={{ ...FONTS2.body2, marginTop: 15, }}>{item.reviewList.contents}</Text>

                <View style={styles.menu}>
                    <Text style={{ ...FONTS2.body2, color: COLORS.darkgray, marginTop: 20, }}>주문 메뉴</Text>
                    <FlatList data={item.orderItemList} keyExtractor={item => item.orderItemId.toString()} renderItem={renderItem}/>
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