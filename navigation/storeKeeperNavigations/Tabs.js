/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Keyboard, Platform} from 'react-native';
import {COLORS, FONTS2, icons, SIZES} from '../../constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import RequestListNavigation from './RequestListNavigation';
import SalesStatus from '../../screens/storeKeeperScreens/SalesStatus';
import StoreManagementNavigation from './StoreManagementNavigation';
import CompletedListNavigation from './CompletedListNavigation';





const Tab = createBottomTabNavigator();

//하단 tabBar customalize
const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  const [visible, setVisible] = useState(true);
  const isSelected = accessibilityState.selected;

  //키보드에 따라 tab hide/show
  useEffect(() => {
    let keyboardEventListeners;
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }

    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach((eventListener) =>
            eventListener.remove(),
          );
      }
    };
  }, []);

  if (!visible) {
    return null;
  } else if (isSelected) {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: SIZES.height * 0.09,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: SIZES.height * 0.09,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const Tabs = () => {

  return (
    <Tab.Navigator
      initialRouteName={'주문 접수'}
      tabBarOptions={{
        showLabel: true,
        labelPosition: 'below-icon',
        labelStyle: {
          color: 'black',
          ...FONTS2.body6,
        },
        style: {
          borderTopWidth: 0.3,
          height: SIZES.height * 0.09,
          borderTopColor: 'black',
          // backgroundColor: 'transparent',
          elevation: 0, //그림자가 깔리는 입체적인 효과
        },
      }}>
      <Tab.Screen
        name="주문 접수"
        component={RequestListNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.request}
              resizeMode="contain"
              style={{
                top: 5,
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.black : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="완료 주문"
        component={CompletedListNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.completed}
              resizeMode="contain"
              style={{
                top: 5,
                width: 23,
                height: 23,
                tintColor: focused ? COLORS.black : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="매출 현황"
        component={SalesStatus}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.statistics}
              resizeMode="contain"
              style={{
                top: 5,
                width: 27,
                height: 27,
                tintColor: focused ? COLORS.black : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="매장 관리"
        component={StoreManagementNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.store}
              resizeMode="contain"
              style={{
                top: 5,
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.black : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
