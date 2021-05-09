/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/layout/Header';
import ChatItem from '../../components/item/ChatItem';
import { COLORS, FONTS2, } from '../../constants';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const ChatList = ({ navigation }) => {

    const [threads, setThreads] = useState([]);

    // Fetch threads from firestore
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('THREADS')
            .onSnapshot(querySnapShot => {
                const threads = querySnapShot.docs.map(docSnapShot => {
                    return {
                        _id: docSnapShot.id,
                        name: '',
                        latestMessage: {
                            text: '',
                        },
                        ...docSnapShot.data(),
                    };
                });

                setThreads(threads);
            });
        
        // unscribe listener
        return () => unsubscribe();
    }, []);

    // console.log(threads);

    const addChatRoom = () => {
        firestore()
            .collection('THREADS')
            .add({
                name: '방이름',
                latestMessage: {
                    text: '주문 생성 성공',
                    createdAt: new Date().getTime(),
                },
            })
            .then(docRef => {
                docRef.collection('MESSAGES').add({
                    text: '주문 생성 성공',
                    createdAt: new Date().getTime(),
                    system: true,
                });
                navigation.navigate('ChatList');
            });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header title="채팅방" small="true" />
            <TouchableOpacity
                style={{
                    backgroundColor: 'yellow',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                }}
                onPress={addChatRoom}
            >
                <Text style={{ ...FONTS2.h1 }}>임시 채팅방 생성 버튼</Text>
            </TouchableOpacity>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    // console.log(item);
                    //  {"_id": "UbPFjHrANWD7P7xo5TKo", "latestMessage": {"createdAt": 1620280242849, "text": "주문 생성 성공"}, "name": "방이름"}
                    return (
                        <ChatItem thread={item} />
                    );
                }
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default ChatList;
