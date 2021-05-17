/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/layout/Header';
import ChatItem from '../../components/item/ChatItem';
import { COLORS, FONTS2, } from '../../constants';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { clearAll, setData, getData, addData} from '../../utils/helper';

const ChatList = ({ navigation }) => {

    const [threads, setThreads] = useState([]);
    const chatList = [
        {
            uid: '8MaepsFt67SrssZX1zxA8s96S0k1',
            chatIds: ['채팅방id1', '채팅방id2'],
        },
    ];
    // Fetch threads from firestore
    useEffect(() => {

        const unsubscribe = firestore()
            .collection('THREADS') // THREADS.chatId
            .onSnapshot(querySnapShot => {
                const threads = querySnapShot.docs.map(docSnapShot => { // filter로 바꾸면 될듯?
                    // if (docSnapShot.id === 'J20cpij66wXL371qUcXt') {
                    //     console.log('여기!! ', docSnapShot.id);
                    //     return {
                    //         _id: docSnapShot.id,
                    //         name: '',
                    //         latestMessage: {
                    //             text: '',
                    //         },
                    //         ...docSnapShot.data(),
                    //     };
                    // }
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

    const addChatRoom = () => { // 채팅방 리스트
        firestore()
            .collection('THREADS')
            .add({
                name: '방이름', // storeName + deliveryTime + deliveryPlace
                latestMessage: {
                    text: '주문 생성 성공',
                    createdAt: new Date().getTime(),
                },
            })
            .then(docRef => {
                console.log('채팅방id : ', docRef.id); // 채팅방 ID

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
            {/* <ChatItem thread={threads} /> */}
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
