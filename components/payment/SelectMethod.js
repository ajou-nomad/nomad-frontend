/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SIZES, icons, FONTS, COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const SelectMethod = (props) => {

    const navigation = useNavigation();
    const imgSource = (props.iconName === 'point') ? icons.point : icons.credit_card;

    return (
        <TouchableOpacity
            onPress={() => {
                (props.method === '포인트') ? navigation.replace('Point', { paymentInfo: props.paymentInfo}) : navigation.replace('Payment', { paymentInfo: props.paymentInfo});
            }}
        >
            <View style={cardStyle(props.disable)}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{...FONTS.body2, color: COLORS.black }}>{props.method}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                        source={imgSource}
                        resizeMode="contain"
                        style= {{
                            width: 40,
                            height: 40,
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};


const cardStyle = (cardFlag) => {
    let bgColor = cardFlag ? '#ffff' : '#ffffff';
    let shadowLevel = cardFlag ? 2.27 : 6.27;
    let shadowOpacityLevel = cardFlag ? 0.2 : 0.44;
    let shadowLvelAndroid = cardFlag ? 6 : 10;


    return {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: shadowOpacityLevel,
        shadowRadius: shadowLevel,

        elevation: shadowLvelAndroid,
        height: SIZES.height * 0.12,
        width: SIZES.height * 0.5,
        backgroundColor: bgColor,
        borderRadius: 17,
        marginBottom: 45,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    };
};

export default SelectMethod;
