/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FONTS2, images } from '../../constants';


const ChatItem = ({ thread }) => {
    const navigation = useNavigation();
    
    return (
        <View>
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('ChatScreen', { thread: thread })}
            >
                <Image
                    source={images.store_logo}
                    resizeMode='contain'
                    style={{
                        width: 60,
                        height: 60,
                        marginHorizontal: 10,
                        marginVertical: 5,
                    }}
                />
                <Text style={{ ...FONTS2.h2, }}>{thread.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChatItem;
