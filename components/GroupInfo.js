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
import { useNavigation } from '@react-navigation/native';



export default function GroupInfo(props) {
        const navigation = useNavigation();
        return (
            <TouchableOpacity
                onPress={()=>navigation.navigate('StoreDetail', {storeInfo:props.storeInfo, deliDate:props.deliDate, time:props.time, deliveryPlace:props.location})}
            >
                <View style={props.styleGroupInfo}>
                    <Image style={props.styleLogoImage} source={props.storeInfo.logoUrl}/>
                    <View>
                        <Text style={props.styleShopText}>{props.storeInfo.storeName}</Text>
                        <View style={props.styleRating}>
                            <Image style={props.styleStarImage} source={icons.star}/>
                            <Text style={props.styleRateText}>{props.storeInfo.rate}/5.0</Text>
                        </View>
                        <View style={props.styleDeliveryTime}>
                            <Image style={props.styleTimeImage} source={icons.pin}/>
                            <Text style={props.styleDeliveryTimeText}> {props.time}</Text>
                        </View>
                    </View>
                    <View style={props.styleGroupNumber}>
                        <Image style={props.styleUserImage} source={icons.user} />
                        <Text style={props.groupNumberText}>{props.current}/{props.max}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
}
