/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
} from 'react-native';


import { FONTS2, } from '../../constants';

import ReviewItem from '../../components/item/ReviewItem';

const Review = ({ storeReivew }) => {

    console.log('Review: ', JSON.stringify(storeReivew, null, 4));
    return (
        <View>
            <Text style={{ ...FONTS2.h2, margin: 20, }}>리뷰 {storeReivew.length}개</Text>
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
        </View>
    );
}

export default Review;
