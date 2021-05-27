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
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailedDelivery from './DetailedDelivery';


export default function AvailableDeliveryListComponent(props) {


    const navigation = useNavigation();
    const deliveryInfo = props.deliveryInfo;

    const button = () => {
        Alert.alert(
            '해당 배달을 선택하시겠습니까?',
            '',
            [
              {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => {
                  alert('post: change to 배달 중');
                  navigation.navigate('ChatScreen',{thread: {'_id': 'GommT2R6HnHV5Ky34Ars', 'latestMessage': {'createdAt': 1621420397090, 'text': '사진을 보냈습니다.'}, 'name': '빽다방 아주대점 팔달관 20:30'}});
                }},
            ]
        );
    }

    return (
        <View>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}} >
                <View style={{alignItems:'center',marginRight:20}} >
                    <Text style={{fontWeight:'bold', fontSize:24}} >
                        {deliveryInfo.groupData.date}
                    </Text>
                    <Text style={{fontWeight:'bold', fontSize:24}} >
                        {deliveryInfo.storeData.storeName}
                    </Text>
                    <Text style={{fontWeight:'bold', fontSize:24}}>
                        V
                    </Text>
                    <Text style={{fontWeight:'bold', fontSize:17}} >
                        {deliveryInfo.groupData.buildingName}
                    </Text>
                </View>

                <View style={{alignItems:'center', marginLeft:20}} >
                    <Text style={{fontWeight:'bold', fontSize:24}} >
                        {deliveryInfo.groupData.time}
                    </Text>
                    <DetailedDelivery deliveryInfo={deliveryInfo} />
                    <TouchableOpacity
                        onPress={()=>{ button(); }}
                    >
                        <Text style={{fontSize:24, marginTop:5, borderWidth:2, borderRadius:5, borderColor:'#22ff22'}} >선택</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}
