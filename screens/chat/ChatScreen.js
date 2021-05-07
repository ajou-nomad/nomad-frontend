/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send, SystemMessage, MessageImage, Actions, ActionsProps, } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { COLORS, FONTS2, icons } from '../../constants';

const ChatScreen = ({ route }) => {

    const user = auth().currentUser;

    const { thread } = route.params;
    const [messages, setMessages] = useState([]);

    const handleSend = async (mes) => {
        const text = mes[0].text;

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
                    avatar: icons.avatar,
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
    
    const renderSend = (props) => {
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

    const renderMessageImage = (props) => {
        if (props.currentMessage.image) {
            const { containerStyle, wrapperStyle, ...messageImageProps } = props
            // if (props.renderMessageImage) {
            //     return props.renderMessageImage(messageImageProps)
            // }
            return (
                <MessageImage
                    {...messageImageProps}
                    imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
                />
            );
        }
        return null;
    };

    const renderBubble = (props) => {
        return (
            <View style={{ flexDirection: 'column', flex: 1, }}>
                <Bubble {...props}
                    wrapperStyle={{
                        left: {
                            backgroundColor: COLORS.white,
                            paddingRight: 5,
                            paddingVertical: 3,
                            margin: 0,
                            marginBottom: 8,
                        },
                        right: {
                            backgroundColor: '#808080',
                            paddingVertical: 3,
                            right: 10,
                            marginBottom: 8,
                        },
                    }}
                    renderMessageImage={renderMessageImage(props)}
                />
            </View>
        );
    };

    function isSameUser(props) {
        // 자기인지 남인지 판단
        if (props.currentMessage.user._id === props.user._id) {
            return true;
        }
        else {
            return false;
        }
    }

    const renderContainer = (props) => {
        
        const splitUsername = (name) => {
            const splitname = name.split('@');
            return splitname[0];
        };

        if (props.currentMessage.user._id === 0) {
            return (
                <SystemMessage
                    {...props}
                    wrapperStyle={styles.systemMessageWrapper}
                    textStyle={styles.systemMessageText}
                />
            );
        }
        else {
            return (
                <View style={[styles.container, props.containerStyle, {
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }]}>
                    {isSameUser(props) ? (null) : (
                        <Image source={icons.avatar}
                        resizeMode='contain'
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 5,
                            marginTop: 5,
                        }}
                    />
                    )}
                    <View style={{
                        flexDirection: 'column',
                        flex: 1,
                    }}>
                        {isSameUser(props) ? (null) : (
                            <Text style={{ ...FONTS2.h4, marginBottom: 5 }}>{splitUsername(props.currentMessage.user.name)}</Text>
                        )}
                        {renderBubble(props)}
                    </View>
                </View>
            );
        }
    };

    const renderMessage = (props) => {
        return (
            <View style={{
                marginLeft: 8,
                marginRight: 0,
            }}>
                {renderContainer(props)}
            </View>
        );
    };

    const renderActions = () => {

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#dee2e6' }}>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{ 
                    _id: user.uid,
                    name: user.displayName,
                }}
                placeholder='메시지 입력'
                alwaysShowSend
                showUserAvatar
                renderSend={renderSend}
                scrollToBottom
                renderMessage={renderMessage}
                renderActions={renderActions}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    systemMessageWrapper: {
        backgroundColor: '#e03131',
        borderRadius: 4,
        padding: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ChatScreen;
