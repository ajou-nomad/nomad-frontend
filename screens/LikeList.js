/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/layout/Header';
import StoreItem from '../components/item/StoreItem';
import { COLORS } from '../constants';

const LikeList = ({navigation, route: { params }}) => {
    return (
        <View style={styles.container}>
            <Header title='찜한 목록' small='true' />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    {params.likeStore?.map((storeItems, index) => {
                        return <StoreItem key={index} storeData={storeItems} isLikeList={true} />;
                    })}
                </View>
            </ScrollView>
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
