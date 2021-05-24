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
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
 import DetailedDelivery from './DetailedDelivery';

export default function AvailableDeliveryListComponent(props) {
        const navigation = useNavigation();
        const deliveryInfo = props.deliveryInfo;
        return (
            <View>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}} >
                    <View style={{alignItems:'center',marginRight:20}} >
                        <Text style={{fontWeight:'bold', fontSize:24}} >
                            {deliveryInfo.date}
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:24}} >
                            {deliveryInfo.storeName}
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:24}}>
                            V
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:17}} >
                            {deliveryInfo.buildingName}
                        </Text>
                    </View>

                    <View style={{alignItems:'center', marginLeft:20}} >
                        <Text style={{fontWeight:'bold', fontSize:24}} >
                            {deliveryInfo.time}
                        </Text>
                        <DetailedDelivery deliveryInfo={deliveryInfo} />
                        <TouchableOpacity
                            onPress={()=>alert('HAAA')}
                        >
                            <Text style={{fontSize:24, marginTop:5, borderWidth:2, borderRadius:5, borderColor:'#22ff22'}} >선택</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
}
