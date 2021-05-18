/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StoreManagementStore = (props) => {
    return (
        <View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity
                onPress={()=>props.navigation.navigate('StoreManagementMain')}
            >
            <Text style={{fontSize:35,}}>&lt;</Text>
            </TouchableOpacity>
            <Text style={{fontSize:23,marginLeft:15}}>StoreManagementStore </Text>
        </View>
        </View>
    );
};

export default StoreManagementStore;
