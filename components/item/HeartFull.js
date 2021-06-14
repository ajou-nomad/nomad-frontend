/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, View } from 'react-native';
import { icons, SIZES } from '../../constants';

const HeartFull = () => {
    return (
        <View>
            <Image
                source={icons.heart_full}
                resizeMode="contain"
                style={{
                    width: SIZES.base * 3,
                    height: SIZES.base * 3,
                }}
            />
        </View>
    );
};

export default HeartFull;

