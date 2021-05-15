/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StoreManagementMenu = (props) => {
    return (
        <View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity
                    onPress={()=>props.navigation.navigate(props.route.params.back)}
                >
                <Text style={{fontSize:35,}}>&lt;</Text>
                </TouchableOpacity>
                <Text style={{fontSize:23,marginLeft:15}}>StoreManagementMenu </Text>
            </View>
        </View>
    );
};

export default StoreManagementMenu;
