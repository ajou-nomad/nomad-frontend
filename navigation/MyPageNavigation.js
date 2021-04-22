import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPage } from '../screens/Index';




const MyPageStack = createStackNavigator();

const MyPageNavigation = ({route, navigation}) => {


    useEffect( () => {

    }, []);

    return (
        <MyPageStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={"MyPage"}
        >
            <MyPageStack.Screen name="MyPage" component={MyPage} />
            {/* 채팅방, 뭐 등등 추가시 작성  */}
        </MyPageStack.Navigator>
    );
};

export default MyPageNavigation;