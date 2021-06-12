/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, View } from 'react-native';
import { icons, SIZES } from '../../constants';

const HeartEmpty = () => {
    return (
        <View>
            <Image
                source={icons.heart_empty}
                resizeMode="contain"
                style={{
                    width: SIZES.base * 3,
                    height: SIZES.base * 3,
                }}
            />
        </View>
    );
};

export default HeartEmpty;
