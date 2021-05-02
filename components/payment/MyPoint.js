/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { icons, COLORS, SIZES, FONTS } from '../../constants';

const MyPoint = ({point}) => {
    return (
        <TouchableOpacity
            disabled = {true}
            style={styles.container}
        >
            <View style={styles.pointView}>
                <Image
                    source={icons.user}
                    style={styles.logoStyle}
                />
                <View
                    style={styles.pointTextView}>
                    <Text style={styles.pointText}>보유 포인트:  {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                </View>
            </View>
      </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 45,
      width: SIZES.width * 0.7,
      alignSelf: 'center',
    },
    pointView:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.padding,
      paddingHorizontal: SIZES.padding * 2,
      borderRadius: SIZES.radius * 0.5,
      backgroundColor: '#1c7ed6',
      opacity: 0.9,
      elevation: 5,
    },
    logoStyle:{
      width: 25,
      height: 25,
      tintColor: COLORS.white,
      marginRight: SIZES.padding,
    },
    pointTextView:{
      flex: 1,
      alignItems: 'center',
    },
    pointText:{
      ...FONTS.body3,
      color: COLORS.white,
    },
});

export default MyPoint;
