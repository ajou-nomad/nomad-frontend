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
    
        return (
            <>
                <TouchableOpacity
                    onPress={()=>navigation.navigate("WeeklyGroupListChild",{
                        date: props.date,
                        time: props.time,
                        location: props.location,
                        currentGroup: props.currentGroup,
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
                            }}>{props.currentGroup}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
}