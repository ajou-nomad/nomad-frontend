/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ReviewItem from '../../../../components/item/ReviewItem';
import Header from '../../../../components/layout/Header';
import { COLORS } from '../../../../constants';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axiosApiInstance from '../../../../utils/axios';

const StoreManagementReview = (props) => {

    const [reviewList, setReviewList] = useState([]);


    useEffect(() => {

        //추후에 reviewList로 가져와야함 오류나서 myStoreList로
        axiosApiInstance.get('/myStoreList').then(
            (response) => setReviewList(response.data.data.reviewList)
        );

    }, []);


    return (
        <ScrollView style={styles.container}>
            <Header title='리뷰관리' small='true' />
            {reviewList.map((item, index) =>

                <ReviewItem key={index} item={item} admin={true} />
            )}
             </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default StoreManagementReview;
