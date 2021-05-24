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

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


export default function DetailedDelivery(props) {
        const navigation = useNavigation();
        const deliveryInfo = props.deliveryInfo;
        const [visibility,setVisibility] = useState(false);

        const renderDetailedDelivery = ({item}) =>{
            return (
            <View>
                <Text> {JSON.stringify(item,null,4)} </Text>
            </View>
        )}

        return (
            <View>
                <Modal
                    visible={visibility}
                    animationType="slide"
                >
                    <TouchableOpacity
                        onPress={()=>setVisibility(!visibility)}
                    >
                        <Text style={{fontSize:50,}} >X</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={[deliveryInfo]}
                        renderItem={renderDetailedDelivery}
                        keyExtractor={item => item.groupId.toString()}
                    />
                </Modal>
                <TouchableOpacity
                        onPress={()=>setVisibility(!visibility)}
                    >
                        <Text style={{fontSize:24, marginBottom:5 ,borderWidth:2, borderRadius:5, borderColor:'#22ff22'}} >상세 정보</Text>
                </TouchableOpacity>
            </View>

        );
}
                        