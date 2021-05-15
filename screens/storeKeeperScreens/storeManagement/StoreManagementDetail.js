/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ManagementAction from '../../../components/store/ManagementAction';

const StoreManagementDetail = (props) => {
    return (
        <View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity
                    onPress={()=>props.navigation.navigate(props.route.params.back)}
                >
                <Text style={{fontSize:35,}}>&lt;</Text>
                </TouchableOpacity>
                <Text style={{fontSize:23,marginLeft:15}}>StoreManagementDetail </Text>
            </View>
            <Image style={{width:45,height:45,}} source={props.route.params.logoSource}/>
            <Text>{props.route.params.storeName}</Text>
            <ManagementAction ActionType="StoreManagementMenu" />
            <ManagementAction ActionType="StoreManagementStore" />
            <ManagementAction ActionType="StoreManagementReview" />
        </View>
    );
};

export default StoreManagementDetail;
