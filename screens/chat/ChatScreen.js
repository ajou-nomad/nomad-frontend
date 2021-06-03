/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Bubble, GiftedChat, Send, SystemMessage, Actions, } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import ImageModal from 'react-native-image-modal';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS2, icons, SIZES } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {AuthContext} from '../../context/AuthContextProvider';
import axiosApiInstance from '../../utils/axios';


const ChatScreen = ({ route }) => {
    
    const { state } = useContext(AuthContext);
    
    console.log(JSON.stringify(route.params.groupId));


    const user = auth().currentUser;

    const { thread, groupId } = route.params;
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
                    name: state.member.nickName,
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
                        image: '',
                        name: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData,
                    };

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                        };
                    }

                    return data;
                });

                setMessages(mes);
            });
        
        return () => messageListener();
    }, [thread._id]);
    
    const renderSendButton = (props) => {
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
        return (
            <View style={{ padding: 5 }}>
                <ImageModal
                    resizeMode="contain"
                    style={{
                        width: 200,
                        height: 200,
                        padding: 6,
                        borderRadius: 15,
                        resizeMode: "cover",
                    }}
                    source={{ uri: props.currentMessage.image }}
                />
            </View>
        );
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
                    renderQuickReplySend
                    renderMessageImage={renderMessageImage}
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

        if (props.currentMessage.user._id === 0) {
            return (
                // <SystemMessage
                //     {...props}
                //     wrapperStyle={styles.systemMessageWrapper}
                //     textStyle={styles.systemMessageText}
                // />
                <View style={{ backgroundColor: '#f03e3e', width: SIZES.width * 0.8, alignSelf: 'center', padding: SIZES.base, borderRadius: 8, marginVertical: SIZES.base * 2.5 }}>
                    <Text style={{ ...FONTS2.h4, color: 'white', alignSelf: 'center' }}>{props.currentMessage.text}</Text>
                    <Text style={{ ...FONTS2.body3, color: 'white', alignSelf: 'center', marginTop: SIZES.base }}>{thread.name}</Text>
                </View>
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
                            <Text style={{ ...FONTS2.h4, marginBottom: 5 }}>{props.currentMessage.user.name}</Text>
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

    const uploadImage = (source, imageUri) => {
        if (imageUri) {
            const ext = imageUri.split('.').pop();

            const filename = `${uuid.v4()}.${ext}`;
            //    setImgLoading(true);
            const imgRef = storage().ref(`chatimage/${filename}`);
            const unsubscribe = imgRef.putFile(imageUri)
                .on(
                    storage.TaskEvent.STATE_CHANGED,
                    async snapshot => {
                        var state = {
                            ...state,
                            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                        };
                        if (snapshot.state === storage.TaskState.SUCCESS) {
                            console.log('upload success');
                            // unsubscribe the event
                            unsubscribe();
                            // update the image url
                            let url;
                            await imgRef.getDownloadURL()
                                .then((response) => {
                                    console.log('get url response', response);
                                    url = response;
                                })
                                .catch(error => {
                                    console.log('Failed to get url', error);
                                });

                            firestore()
                                .collection('THREADS')
                                .doc(thread._id)
                                .collection('MESSAGES')
                                .add({
                                    image: url.toString(),
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
                                            text: '사진을 보냈습니다.',
                                            createdAt: new Date().getTime(),
                                        },
                                    },
                                    { merge: true }
                                );

                        }
                    });
        }
    };

    const handlePickImage = () => {
        launchImageLibrary({}, (res) => {
            const source = { uri: res.uri };

            uploadImage(source, res.uri);
        });
    };

    const handleCamera = () => {
        launchCamera({}, (res) => {
            const source = { uri: res.uri };

            uploadImage(source, res.uri);
        });
    };

    const renderActions = (props) => {
        return (
            <Actions
                {...props}
                options={{
                    ['사진 추가']: handlePickImage,
                    ['사진 찍기']: handleCamera,
                }}
                icon={() => <Image source={icons.plus} style={{ width: 28, height: 28 }} />}
                onSend={(args) => console.log('eerere', args)}
            />
        );
    };
    
    const navigation = useNavigation();


    return (
        <View style={{ flex: 1, backgroundColor: '#dee2e6' }}>
            {user ? (
                <>
                    {state.member.memberType === 'Deli' && groupId >= 0 ?
                        <View style={{ position: 'absolute', bottom: SIZES.height * 0.09, right: SIZES.width * 0.04, zIndex: 2, opacity: 0.9 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    axiosApiInstance.post('/deliveryComplete', {
                                        groupId: groupId,
                                    }).then((res) => {
                                        console.log('배달 완료 post', JSON.stringify(res.data.data, null, 4));
                                        navigation.navigate('CarrierMain');
                                        
                                        firestore().collection('THREADS').doc(thread._id).delete();
                                    }).catch((e) => {
                                        console.log(e);
                                    })
                                }}
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#3897f1', paddingVertical: SIZES.base * 2.5, paddingHorizontal: SIZES.base, borderRadius: 50, }}
                            >
                                <Text style={{ ...FONTS2.body3, color: 'white' }} >
                                        배달완료
                                </Text>
                            </TouchableOpacity>
                        </View>
                        : (null)}
                    <GiftedChat
                        messages={messages}
                        onSend={handleSend}
                        user={{
                            _id: user.uid,
                            name: user.displayName,
                        }}
                        placeholder="메시지 입력"
                        alwaysShowSend
                        showUserAvatar
                        renderSend={renderSendButton}
                        scrollToBottom
                        renderMessage={renderMessage}
                        renderActions={renderActions}
                    />
                
                </>
            ) : (
                (null)
            )}
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
        // fontSize: 14,
        color: '#fff',
        // fontWeight: 'bold',
        ...FONTS2.body3
    },
});

export default ChatScreen;