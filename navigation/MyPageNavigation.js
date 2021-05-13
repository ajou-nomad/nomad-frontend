/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPage } from '../screens/index';
import ReviewPage from '../screens/review/ReviewPage';
import LikeList from '../screens/LikeList';
import MyPointPage from '../screens/mypage/MyPointPage';

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
            <MyPageStack.Screen name="ReviewPage" component={ReviewPage} />
            <MyPageStack.Screen name="LikeList" component={LikeList} />
            <MyPageStack.Screen name="MyPointPage" component={MyPointPage} />
            {/* 채팅방, 뭐 등등 추가시 작성  */}
        </MyPageStack.Navigator>
    );
};

export default MyPageNavigation;