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
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/layout/Header';
import ChatItem from '../../components/item/ChatItem';
import { COLORS, SIZES, icons, FONTS2 } from '../../constants';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import axiosApiInstance from '../../utils/axios';


const CarrierChatList = (props) => {

    const [threads, setThreads] = useState([]);
    const [chatList, setChatList] = useState([]);

    console.log(props.route.params.groupId)

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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: responsiveHeight(10), borderBottomWidth: 0.3, borderBottomColor: '#adb5bd',}}>
				<TouchableOpacity  style={{ position: 'absolute', left: 0, marginLeft: SIZES.base * 2, }} onPress={() => props.navigation.openDrawer()}>
					<Image source={icons.menu} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 3  }} />
				</TouchableOpacity>
				<Text style={{ ...FONTS2.h2 }} >채팅방</Text>
            </View>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    // console.log(item);
                    //  {"_id": "UbPFjHrANWD7P7xo5TKo", "latestMessage": {"createdAt": 1620280242849, "text": "주문 생성 성공"}, "name": "방이름"}
                    return (
                        <ChatItem thread={item} groupId = {props.route.params.groupId} />
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

export default CarrierChatList;
