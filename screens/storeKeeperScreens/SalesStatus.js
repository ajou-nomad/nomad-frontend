/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/layout/Header';
import { COLORS } from '../../constants';

const SalesStatus = () => {
    return (
        <View style={styles.container}>
            <Header title='매출 현황' small='true' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default SalesStatus;
