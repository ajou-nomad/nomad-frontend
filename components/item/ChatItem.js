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


const ChatItem = ({ thread, groupId }) => {
    const navigation = useNavigation();

    // console.log('ChatItem ', thread);
    
    return (
        <View>
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('ChatScreen', { thread: thread, groupId: groupId })}
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
                <View>
                    <Text style={{ ...FONTS2.h3, }}>{thread.name}</Text>
                    <Text style={{ ...FONTS2.body3, }}>{thread.latestMessage.text}</Text>
                    {/* <Text style={{ ...FONTS2.body3, }}>{(new Date(thread.latestMessage.createdAt)).toString()}</Text> */}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ChatItem;