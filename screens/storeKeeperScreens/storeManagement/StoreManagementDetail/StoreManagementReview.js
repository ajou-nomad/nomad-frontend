/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ReviewItem from '../../../../components/item/ReviewItem';
import Header from '../../../../components/layout/Header';
import { COLORS } from '../../../../constants';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const StoreManagementReview = (props) => {
    return (
        <ScrollView style={styles.container}>
            <Header title='리뷰관리' small='true' />
            <View style={{ width: responsiveWidth(90), alignSelf: 'center' }}>
                <ReviewItem isMypage='true' />
                <ReviewItem isMypage='true' />
            </View>
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
