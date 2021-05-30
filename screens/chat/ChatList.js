/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/layout/Header';
import ChatItem from '../../components/item/ChatItem';
import { COLORS, } from '../../constants';
import axiosApiInstance from '../../utils/axios';


const ChatList = ({ navigation }) => {

    const [threads, setThreads] = useState([]);
    const [chatList, setChatList] = useState([]);

    // Fetch threads from firestore
    useEffect(() => {

        // axiosApiInstance.get('/chatList')
        //     .then((res) => {
        //         setChatList(res.data.data);
        //     })
        //     .catch(e => console.log(e));

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

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header title="채팅방" small="true" />
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
