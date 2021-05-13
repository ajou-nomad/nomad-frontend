/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, } from 'react-native';

import { icons, FONTS2 } from '../constants';

const MyPageButton = ({ title, img, onPress}) => {
    return (
        // <TouchableOpacity style={styles.container} onPress={onPress}>
        //   <Image
        //     source={img}
        //     style={{
        //       width: 35,
        //       height: 35,
        //       marginRight: 10,
        //     }}
        //     resizeMode='contain' />
        //   <Text style={{ ...FONTS2.body2, }}>{title}</Text>
        // </TouchableOpacity>
        <TouchableOpacity
            style={{ height: 70, alignItems: 'center', marginLeft: 25, flexDirection: 'row', }}
            onPress={onPress}
        >
        <Image
            source={img}
            style={{
              width: 35,
              height: 35,
              marginRight: 15,
            }}
            resizeMode='contain' />
        <Text style={{ ...FONTS2.body2}}>{title}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
    }
});

export default MyPageButton;
