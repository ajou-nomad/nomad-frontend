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



export default function ManagementAction(props) {
        const navigation = useNavigation();
        let ActionName;
        switch (props.ActionType) {
            case 'StoreManagementMenu':
                ActionName = '메뉴 수정'
                break;
            case 'StoreManagementStore':
                ActionName = '매장 정보 수정'
                break;
            case 'StoreManagementReview':
                ActionName = '리뷰 답변'
                break;
        }
        return (
            <TouchableOpacity
                onPress={()=>navigation.navigate(props.ActionType,{back:'StoreManagementDetail'})}
            >
                <View style={{borderRadius:15, borderColor:'#000', borderWidth:3, alignItems:'center', marginVertical:10, width:'75%', alignSelf:'center',}}>
                    <Text style={{fontSize:34,fontWeight: 'bold',}}>
                        {ActionName}
                    </Text>
                </View>
            </TouchableOpacity>

        );
}
