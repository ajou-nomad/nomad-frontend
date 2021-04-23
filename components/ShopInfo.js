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
import {icons} from '../constants';



export default function ShopInfo(props) {
    // const star = require('../assets/icons/star.png');
    // const time = require('../assets/icons/pin.png');
    // const user = require('../assets/icons/user.png');
    // let logo;
    // switch (props.logo){
    //     case 'minus': logo = require('../assets/icons/pizza.png'); break;
    //     case 'home': logo = require('../assets/icons/fries.png'); break;
    //     case 'gps': logo = require('../assets/icons/noodle.png'); break;

    // }
        return (
            <>
                <TouchableOpacity
                    onPress={()=>alert(`${props.shopName}`)}
                >
                    <View style={props.styleGroupInfo}>
                        <Image style={props.styleLogoImage} source={props.logo}/>
                        <View>
                            <Text style={props.styleShopText}>{props.shopName}</Text>
                            <View style={props.styleRating}>
                                <Image style={props.styleStarImage} source={icons.star}/>
                                <Text style={props.styleRateText}>{props.rate}/5.0</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={props.styleGroupNumber}>
                            <Text>그룹 생성</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </>
        );
}
