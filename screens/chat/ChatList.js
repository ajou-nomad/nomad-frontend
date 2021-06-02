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

    const chatLists = async () => {

        const chatIdTmp = await axiosApiInstance.get('/chatId')
            .then((res) => {
                console.log(res.data.data);
                return res.data.data.map((item, index) => {

                    return item.chatId.slice(1, -1);
                });
            });

        console.log('chatIdTmp---',chatIdTmp);

        // setThreads(threadsTmp);
        setChatList(chatIdTmp);

    };

    // Fetch threads from firestore
    useEffect(() => {
        let threadsTmp = [];
        let chatIdTmp = [];

        chatLists();
        console.log('dsfds', chatList);
        // axiosApiInstance.get('/chatId')
        //     .then((res) => {
        //         console.log(res.data.data);
                
        //         res.data.data.map((item, index) => {

        //             console.log('잘림: ', item.chatId.slice(1, -1));
        //             const chat = {
        //                 _id: item.chatId.slice(1, -1),
        //                 name: '',
        //                 latestMessage: {
        //                     text: '',
        //                 },
        //             };
        //             // console.log('쳇', chat);
        //             threadsTmp = [...threadsTmp, chat];
        //             // console.log('123:: ', JSON.stringify(threadsTmp, null, 4));
        //             chatIdTmp = [...chatIdTmp, item.chatId.slice(1, -1)];
        //         });

        //         // setThreads(threadsTmp);
        //         setChatList(chatIdTmp);
        //     })
        //     .catch(e => console.log(e));
        
        const unsubscribe = firestore()
            .collection('THREADS') // THREADS.chatId
            .onSnapshot(querySnapShot => {
                const threads = querySnapShot.docs.map(docSnapShot => {
                    console.log('확인', docSnapShot.data());

                    if (chatList.includes(docSnapShot.id)) {
                        console.log('여기여기sd456');
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
        
        console.log('456:: ',JSON.stringify(threads, null, 4));
    
        // const unsubscribe = firestore()
        //     .collection('THREADS') // THREADS.chatId
        //     // .doc()
        //     .onSnapshot(querySnapShot => {
        //         const threads = querySnapShot.docs.map(docSnapShot => {
        //             return {
        //                 _id: docSnapShot.id,
        //                 name: '',
        //                 latestMessage: {
        //                     text: '',
        //                 },
        //                 ...docSnapShot.data(),
        //             };
        //         });

        //         setThreads(threads);
        //     });
        
        // // unscribe listener
        return () => unsubscribe();
    }, []);

    console.log('456:: ',JSON.stringify(threads, null, 4));
    // console.log(chatList);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header title="채팅방" small="true" />
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    // console.log(item)
                    return (
                        <ChatItem thread={item} />
                    );
                }}
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
