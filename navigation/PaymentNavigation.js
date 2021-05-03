/* eslint-disable prettier/prettier */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentMethods from '../screens/payment/PaymentMethods';
import Payment from '../screens/payment/Payment';
import Point from '../screens/payment/Point';


const PaymentStack = createStackNavigator();

const PaymentNavigation = ({route, navigation}) => {


    return (
        <PaymentStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'PaymentMethods'}
        >
            <PaymentStack.Screen name="PaymentMethods" component={PaymentMethods} />
            <PaymentStack.Screen name="Point" component={Point} />
            <PaymentStack.Screen name="Payment" component={Payment} />
            {/* 채팅방, 뭐 등등 추가시 작성  */}
        </PaymentStack.Navigator>
    );
}

export default PaymentNavigation;