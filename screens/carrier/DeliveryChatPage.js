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
import {View, Text, FlatList, ScrollView} from 'react-native';


export default function DeliveryChatPage(props) {
        const orderData = props.route.params.orderData;
        // console.log(props.route.params.orderData)
        return (
            <ScrollView>
                <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}} >
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}} >
                            {orderData.storeData.storeName}
                        </Text>
                        <Text style={{fontSize:14}} >
                            {orderData.storeData.address}
                        </Text>
                    </View>
                    <Text style={{fontSize:38}} >  -&gt;  </Text>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}} >
                            {orderData.groupData.buildingName}
                        </Text>
                        <Text style={{fontSize:14}} >
                            {orderData.groupData.address}
                        </Text>
                    </View>
                </View>
                <Text>
                    {JSON.stringify(orderData,null,4)}
                </Text>
            </ScrollView>

        );
}
