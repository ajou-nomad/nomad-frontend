/* eslint-disable prettier/prettier */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentMethods from '../screens/payment/PaymentMethods';
import Point from '../screens/payment/Point';
import CreditCard from '../screens/payment/CreditCard';
import PaymentCompleted from '../screens/payment/PaymentCompleted';


const PaymentStack = createStackNavigator();

const PaymentNavigation = ({route, navigation}) => {

    // console.log('PaymentNav\'s params :' + JSON.stringify(route.params,null,4));
    return (
        <PaymentStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'PaymentMethods'}
        >
            <PaymentStack.Screen name="PaymentMethods" component={PaymentMethods} initialParams={{totalData:route.params.totalData}} />
            <PaymentStack.Screen name="Point" component={Point} />
            <PaymentStack.Screen name="CreditCard" component={CreditCard} />
            <PaymentStack.Screen name="PaymentCompleted" component={PaymentCompleted} />
            {/* 채팅방, 뭐 등등 추가시 작성  */}
        </PaymentStack.Navigator>
    );
}

export default PaymentNavigation;
