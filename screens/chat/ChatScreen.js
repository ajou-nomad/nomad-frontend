/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send, utils, SystemMessage } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { COLORS, FONTS2, icons } from '../../constants';
import SlackMessage from './SlackMessage';


const ChatScreen = ({ route }) => {

    function getInnerComponentProps() {
    const { containerStyle, ...props } = this.props
    return {
      ...props,
      position: 'left',
      isSameUser,
      isSameDay,
    }
  }

    const { isSameUser, isSameDay } = utils;
    
    const user = auth().currentUser;
    // console.log(user.displayName);
    //  {"displayName": null, "email": "erang14@naver.com", "emailVerified": true, "isAnonymous": false, "metadata": {"creationTime": 1618893797007, "lastSignInTime": 1620278278220}, "phoneNumber": null, "photoURL": null, "providerData": [[Object]], "providerId": "firebase", "tenantId": null, "uid": "4413yQUDOWP3nrwsyfKpfYJen0I3"}
    

    const { thread } = route.params;
    const [messages, setMessages] = useState([]);

    const handleSend = async (mes) => {
        const text = mes[0].text;

        // console.log('here  ', mes);
        // [{"_id": "2212d0f9-7a39-43cb-8b60-0acefbf27045", "createdAt": 2021-05-06T03:00:03.383Z, "text": "ㄱㄴ자니너ㆍㄴ", "user": {"_id": 1}}]
        firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: user.uid, // currentUser.uid,
                    email: user.email, // currentUser.email
                },
            });

        await firestore()
            .collection('THREADS')
            .doc(thread._id)
            .set(
                {
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime(),
                    },
                },
                { merge: true }
            );
    };

    useEffect(() => {
        const messageListener = firestore()
            .collection('THREADS')
            .doc(thread._id) // 채팅방의 id
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => { // 실시간 업데이트 수신 대기
                const mes = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData,
                    };

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.email,
                        };
                    }

                    return data;
                });

                setMessages(mes);
            });
        // stop listening for updates 컴포넌트가 unmount될 때
        return () => messageListener();
    }, [thread._id]);

    const getColor = (username) => {
        let sumChars = 0;
        
        if (username === undefined) {
            return colors[sumChars % 5];
        }
        for (let i = 0; i < username.length; i++) {
            sumChars += username.charCodeAt(i);
        }

        const colors = [
            '#e67e22', // carrot
            '#2ecc71', // emerald
            '#3498db', // peter river
            '#8e44ad', // wisteria
            '#e74c3c', // alizarin
            '#1abc9c', // turquoise
            '#2c3e50', // midnight blue
        ];
        return colors[sumChars % colors.length];
    };

    const renderBubble = (props) => {
        
        const isDisplayUsername = isSameUser(props.currentMessage, props.previousMessage) && isSameDay(props.currentMessage, props.previousMessage);
        // const username = props.currentMessage.user.name;
        const color = getColor(props.currentMessage.user.name);
        // console.log(username);

        return (
            <View style={{ backgroundColor: 'pink',}}>
                { !isDisplayUsername ? (
                    <>
                        {/* <Avatar {...props} /> */}
                        <Text style={{ ...FONTS2.body2, }}>{props.currentMessage.user.name}</Text>
                    </>
                ) : null}
                <Bubble {...props} 
        wrapperStyle={{
          left: {
            backgroundColor: color
          }
        }}/>
            </View>
        );
    };

    const renderSend = (props) => {

        // console.log(props.messages[1]);
        return (
            <Send {...props}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={icons.send}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: 'black',
                            margin: 10,
                        }}
                    />
                </View>
            </Send>
        );
    };

    const renderMessage = (props) => {
        return (
            // <SlackMessage {...props} />
            <View style={{
                marginLeft: 8,
                marginRight: 8,
                margin: 5
            }}>
                {renderBubble(props)}
            </View>
        );
    };

    const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{ // (Object) - User sending the messages: { _id, name, avatar }
                    _id: user.uid,
                    name: user.displayName,
                }}
                placeholder='메시지 입력'
                // alwaysShowSend
                // showUserAvatar
                // renderBubble={renderBubble}
                // renderSend={renderSend}
                // scrollToBottom
                // renderUsernameOnMessage
                // renderAvatar={renderAvatar}
                renderMessage={renderMessage}
                // renderSystemMessage={renderSystemMessage}
            />
            {/* <Text>채팅ㅇㄻㅇㄴㄹㄴㅇㄻㄴㅇ</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#000',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default ChatScreen;
