/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {icons, FONTS} from '../../constants';
import { useNavigation } from '@react-navigation/native';



export default function WeeklyGroupListParent(props) {
    // const star = require('../assets/icons/star.png');
    // const time = require('../assets/icons/pin.png');
    // const user = require('../assets/icons/user.png');
    // let logo;
    // switch (props.logo){
    //     case 'minus': logo = require('../assets/icons/pizza.png'); break;
    //     case 'home': logo = require('../assets/icons/fries.png'); break;
    //     case 'gps': logo = require('../assets/icons/noodle.png'); break;

    // }
    const navigation = useNavigation();
    const time = props.time.slice(0,2);
    const groupList = [
        {
        id: 'shop1',
        logo:icons.donut,
        shopName:'TempName1',
        rate:3.5,
        time: time+':00',
        current:9,
        max:10,
        day:'monday',
        },
        {
        id: 'shop2',
        logo:icons.pizza,
        shopName:'TempName2',
        rate:4.5,
        time: time+':05',
        current:5,
        max:10,
        day:'tuesday',
        },
        {
        id: 'shop3',
        logo:icons.noodle,
        shopName:'TempName3',
        rate:4.0,
        time: time+':10',
        current:7,
        max:10,
        day:'wednesday',
        },
        {
        id: 'shop4',
        logo:icons.rice_bowl,
        shopName:'TempName4',
        rate:3.5,
        time: time+':15',
        current:9,
        max:10,
        day:'thursday',
        },
        {
        id: 'shop5',
        logo:icons.salad,
        shopName:'TempName5',
        rate:4.5,
        time: time+':20',
        current:5,
        max:10,
        day:'friday',
        },
        {
        id: 'shop6',
        logo:icons.sushi,
        shopName:'TempName6',
        rate:4.0,
        time: time+':25',
        current:7,
        max:10,
        day:'monday',
        },
        {
        id: 'shop7',
        logo:icons.drink,
        shopName:'TempName7',
        rate:3.5,
        time: time+':30',
        current:9,
        max:10,
        day:'tuesday',
        },
        {
        id: 'shop8',
        logo:icons.fries,
        shopName:'TempName8',
        rate:4.5,
        time: time+':45',
        current:5,
        max:10,
        day:'wednesday',
        },
        {
        id: 'shop9',
        logo:icons.hamburger,
        shopName:'TempName9',
        rate:4.0,
        time: time+':50',
        current:7,
        max:10,
        day:'thursday',
        },
    ].filter(
        ({day}) => day === props.day
    );

    const currentGroup = groupList.length

        return (
            <>
                <TouchableOpacity
                    onPress={()=>navigation.navigate("WeeklyGroupListChild",{
                        date: props.date,
                        time: props.time,
                        location: props.location,
                        currentGroup: currentGroup,
                        groupList: groupList,
                        back:'TimeTable',
                    })}
                >

                    <View style={{flexDirection:'row',alignItems:'center',marginVertical:5,paddingVertical:10}}>
                        <View style={{flex:1,marginLeft:5,paddingLeft:10,}}>
                            <Text numberOfLines={1}
                            style={{
                            ...FONTS.body1,
                            }}>
                                {props.time}
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'center'}}>
                            <Text numberOfLines={1}
                            style={{
                            ...FONTS.body2,
                            }}>{props.location}</Text>
                            <Text numberOfLines={1}
                            style={{
                            ...FONTS.body3,
                            }}>{props.date}</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'center',}}>
                            <Image style={{width:60, height:60}} source={icons.group} />
                            <Text numberOfLines={1}
                            style={{
                            ...FONTS.body1,
                            }}>{currentGroup}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
}