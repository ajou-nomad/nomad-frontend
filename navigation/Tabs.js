/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Keyboard, Platform} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {OrderDetails} from '../screens/index';
import DayNavigation from './DayNavigation';
import WeeklyNavigation from './WeeklyNavigation';
import MyPageNavigation from './MyPageNavigation';

const Tab = createBottomTabNavigator();


const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
    const [visible, setVisible] = useState(true);
    const isSelected = accessibilityState.selected;

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

const Tabs = ({route}) => {

    const {routeName} = route.params;

    return (
        <Tab.Navigator
            initialRouteName={routeName}
            tabBarOptions={{
                showLabel: true,
                labelPosition: 'below-icon',
                labelStyle: {
                ...FONTS.body6,
                },
                activeTintColor: '#228be6',

                style: {
                borderTopWidth: 0.4,
                height: SIZES.height * 0.09,
                borderTopColor: COLORS.secondary,
                elevation: 0,
                },
            }}
        >
            <Tab.Screen
                name="당일 모집"
                component={DayNavigation}
                options={{
                tabBarIcon: ({focused}) => (
                    <Image
                    source={icons.home}
                    resizeMode="contain"
                    style={{
                        top: 4,
                        width: 22,
                        height: 22,
                        tintColor: focused ? '#228be6' : COLORS.secondary,
                    }}
                    />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />
            <Tab.Screen
                name="주간 모집"
                component={WeeklyNavigation}
                options={{
                tabBarIcon: ({focused}) => (
                    <Image
                    source={icons.calendar}
                    resizeMode="contain"
                    style={{
                        top: 3,
                        width: 23,
                        height: 23,
                        tintColor: focused ? '#228be6' : COLORS.secondary,
                    }}
                    />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />
            <Tab.Screen
                name="주문 내역"
                component={OrderDetails}
                options={{
                tabBarIcon: ({focused}) => (
                    <Image
                    source={icons.receipt}
                    resizeMode= "contain"
                    style={{
                        top: 3,
                        width: 23,
                        height: 23,
                        tintColor: focused ? '#228be6' : COLORS.secondary,
                    }}
                    />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />
            <Tab.Screen
                name="마이페이지"
                component={MyPageNavigation}
                options={{
                tabBarIcon: ({focused}) => (
                    <Image
                    source={icons.user}
                    resizeMode="contain"
                    style={{
                        top: 3,
                        width: 23,
                        height: 23,
                        tintColor: focused ? '#228be6' : COLORS.secondary,
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
