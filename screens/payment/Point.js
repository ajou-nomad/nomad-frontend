/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';

const Point = ({ route, navigation }) => {

    const { paymentInfo } = route.params;

    console.log(paymentInfo);

    return (
        <View>
            <Text>포인트로 지불할 예정</Text>
            <Text>{JSON.stringify(paymentInfo,null, 4)}</Text>
        </View>
    )
}

export default Point;
