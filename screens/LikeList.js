/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, StyleSheet, } from 'react-native';
import Header from '../components/layout/Header';
import StoreItem from '../components/item/StoreItem';
import { COLORS } from '../constants';

const LikeList = () => {
    return (
        <View style={styles.container}>
            <Header title='찜한 목록' small='true' />
            {/* <StoreItem isLikeList='true'/>
            <StoreItem isLikeList='true'/>
            <StoreItem isLikeList='true'/>
            <StoreItem isLikeList='true'/>
            <StoreItem isLikeList='true'/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default LikeList;
