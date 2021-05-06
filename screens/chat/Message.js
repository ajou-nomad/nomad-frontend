/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { Avatar, Day, utils } from 'react-native-gifted-chat'

const Message = (props) => {
    console.log(props);

    const renderDay = () => {
        if (props.currentMessage.createdAt) {
            
        }
    }
    return (
        <View>
            <Text></Text>
        </View>
    );
}

export default Message;
