/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../../../components/layout/Header';
import { COLORS } from '../../../../constants';


const StoreManagementMenu = () => {
    return (
        <View style={styles.container}>
            <Header title='메뉴관리' small='true' />
            {/* 메뉴이름, 사진,  */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default StoreManagementMenu;
