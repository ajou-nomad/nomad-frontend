/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/layout/Header';
import { COLORS } from '../../constants';

const CompletedList = () => {
    return (
        <View style={styles.container}>
            <Header title='완료된 주문' small='true'/>
        </View>
    );
};

export default CompletedList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});