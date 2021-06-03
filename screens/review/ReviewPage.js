/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import ReviewItem from '../../components/item/ReviewItem';
import Header from '../../components/layout/Header';
import { COLORS, FONTS2 } from '../../constants';
import axiosApiInstance from '../../utils/axios';

const ReviewPage = () => {

    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        axiosApiInstance.get('/memberReview')
            .then( (response) => setReviewList(response.data.data))
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Header title="리뷰관리" small='true' />

            <View style={{ margin: 20 }}>
                <Text style={{ ...FONTS2.h2 }}>{`내가 쓴 리뷰 ${reviewList?.length}개`}</Text>
            </View>

            <View style={{ width: responsiveWidth(90), alignSelf: 'center' }}>
            {reviewList.map((item, index) =>
                <ReviewItem key={index} item={item} />
            )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
});

export default ReviewPage;
