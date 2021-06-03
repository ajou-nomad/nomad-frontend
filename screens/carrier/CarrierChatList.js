/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    LogBox,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/layout/Header';
import ChatItem from '../../components/item/ChatItem';
import { COLORS, SIZES, icons, FONTS2 } from '../../constants';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import axiosApiInstance from '../../utils/axios';


LogBox.ignoreAllLogs();//Ignore all log notifications

const CarrierChatList = (props) => {

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

        console.log("carrier 처음 입장시");

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

        return () => {
            unsubscribe;
            console.log("carrier 언마운트시");
        };
    }, [chatList]);



    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: responsiveHeight(10), borderBottomWidth: 0.3, borderBottomColor: '#adb5bd', }}>
                <TouchableOpacity style={{ position: 'absolute', left: 0, marginLeft: SIZES.base * 2, }} onPress={() => props.navigation.openDrawer()}>
                    <Image source={icons.menu} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 3 }} />
                </TouchableOpacity>
                <Text style={{ ...FONTS2.h2 }} >채팅방</Text>
            </View>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                renderItem={({ item }) =>
                    <ChatItem thread={item} groupId={props.route.params.groupId} />
                }
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

export default CarrierChatList;
