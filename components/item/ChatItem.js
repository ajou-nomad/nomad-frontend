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

import { COLORS, FONTS2, icons, images, SIZES } from '../../constants';


const ChatItem = ({ thread, groupId }) => {
    const navigation = useNavigation();

    const colors = [
        '#FAF1D6',
        '#FAD4AE',
        '#FDAFAB',
        '#B6E3E9',
    ];

    // console.log(thread);

    return (
        <View>
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('ChatScreen', { thread: thread, groupId: groupId })}
            >
                <View style={{ width: 50, height: 50, borderRadius: 20, backgroundColor: colors[Math.round(Math.random() * 3)], justifyContent: 'center', alignItems: 'center', margin: SIZES.base * 1.25 }}>
                    <Image
                        // source={images.store_logo}
                        source={icons.team}
                        resizeMode='contain'
                        style={{
                            // width: 60,
                            // height: 60,
                            width: 37,
                            height: 37,
                            marginHorizontal: 10,
                            marginVertical: 5,
                            tintColor: 'white',
                        }}
                    />
                </View>
                
                <View>
                    <Text style={{ ...FONTS2.h3, marginBottom: SIZES.base * 0.2 }}>{thread.name}</Text>
                    <Text style={{ ...FONTS2.body3, }}>{thread.latestMessage.text}</Text>
                    <Text style={{ ...FONTS2.body3, }}>{(new Date(thread.latestMessage.createdAt)).toString()}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ChatItem;
