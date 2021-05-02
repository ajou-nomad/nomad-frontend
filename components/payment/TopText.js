/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES, FONTS } from '../../constants';

const TopText = () => {
    let headerText = '결제 방식\n선택';
    return (
      <View style={styles.container}>
        <Text style={{...FONTS.h1, color: 'black'}}>{headerText}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: SIZES.padding * 2,
        marginTop: 20,
        marginBottom: 60,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 33,
        color: '#1B1C1C',
        marginLeft: 10,
    },
});

export default TopText;
