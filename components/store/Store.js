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
import {icons} from '../../constants';
import { useNavigation } from '@react-navigation/native';



export default function Store(props) {
        const navigation = useNavigation();
        return (
            <TouchableOpacity
                onPress={()=>navigation.navigate('StoreManagementDetail',{back:'StoreManagementMain', storeName:props.storeName, logoSource: icons.hotdog})}
            >
                <View style={{flexDirection: 'row',}}>
                    <Image style={{width:45,height:45,}} source={icons.hotdog}/>
                    <Text style={{fontSize:34,fontWeight: 'bold',}}>{props.storeName}</Text>
                </View>
            </TouchableOpacity>

        );
}
