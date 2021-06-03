/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

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
    const [isFetching, setIsFetching] = useState(false);



    const chatLists = async () => {

        const myChatList = await axiosApiInstance.get('/chatId')
            .then((res) => {
                return res.data.data.map((item, index) => {

                    return item.chatId.slice(1, -1);
                });
            });
        // setThreads(threadsTmp);
        setChatList(myChatList);
        setIsFetching(false);
    };


    const onRefresh = () => {
        setIsFetching(true);
        chatLists();
    };

    useEffect(() => {

        let unsubscribe;

        if (chatList.length !== 0){
            unsubscribe = firestore()
            .collection('THREADS') // THREADS.chatId
            .onSnapshot(querySnapShot => {
                const threads = querySnapShot.docs.map(docSnapShot => {

                    if (chatList.includes(docSnapShot.id)) {
                        return {
                            _id: docSnapShot.id,
                            name: '',
                            latestMessage: {
                                text: '',
                            },
                            ...docSnapShot.data(),
                        };
                    }
                });
                setThreads(threads.filter((thread, i) => thread != null));
            });

        } else {

            chatLists();
        }

        return () =>  {
            unsubscribe;
        }
    }, [chatList]);


    return (
        <View style={styles.container}>
            {/* Header */}
            <Header title="채팅방" small="true" />
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <ChatItem thread={item} />
                    );
                }}
                onRefresh={onRefresh}
                refreshing={isFetching}
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