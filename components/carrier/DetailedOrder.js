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
import {View, Text, FlatList} from 'react-native';


export default function DetailedDelivery(props) {
        const orderArray = props.orderArray;

        const renderDetailedOrders = (item) => {
            console.log(JSON.stringify(item,null,4));
            return (
                <View>
                    <Text> 주문 #{item.index+1}</Text>
                    {item.item.menu.map((items,index)=>{
                        return (
                            <>
                                <View style={{flexDirection:'row',}} >
                                    <Text> 메뉴 </Text>
                                    <Text> [ 이름: </Text>
                                    <Text>{items.menuName} /</Text>
                                    <Text> 수량: </Text>
                                    <Text>{items.quantity} ] </Text>
                                </View>
                                </>
                        )
                    })}
                    <View style={{flexDirection:'row',}} >
                        <Text> 결제 금액 </Text>
                        <Text>{item.item.totalCost}</Text>
                    </View>
                </View>
            )
        }


        return (
            <View>
                <FlatList
                    data={orderArray}
                    renderItem={renderDetailedOrders}
                    keyExtractor={item => item.orderId.toString()}
                />
            </View>

        );
}
