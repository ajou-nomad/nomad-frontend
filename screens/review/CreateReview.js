/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomButton from '../../components/layout/BottomButton';
import Header from '../../components/layout/Header';
import { FONTS2, COLORS, icons, SIZES } from '../../constants';
import { getData } from '../../utils/helper';
import axiosApiInstance from '../../utils/axios';

const CreateReview = ({ route }) => {
    const navigation = useNavigation();
    const [uploadImage, setUploadImage] = useState('');
    const [text, setText] = useState('');

    // let [orderData, setOrderData] = useState();
    let { item, setItems } = route.params;
    
    // console.log('hhhh: ', item);
    // console.log('CreateReview ', item); // item.orderId

    // getData('orderData').then(data => setOrderData(data));

    const renderRating = () => {
        return (
            <View style={{
                marginVertical: 10,
            }}>
                <Image
                source={icons.star}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                }}
            />
            </View>
        );
    };
    
    const handleImage = () => {
        launchImageLibrary({}, (res) => {
            const source = { uri: res.uri };

            // uploadImage(source, res.uri);
            console.log(source);
            setUploadImage(res.uri);
        });
    }

    const renderAddPhoto = () => {
        return (
            <TouchableOpacity style={styles.addPhoto} onPress={handleImage}>
                <Image
                    source={icons.picture}
                    resizeMode='contain'
                    style={{
                        width: SIZES.base * 5,
                        height: SIZES.base * 3,
                    }}
                />
                <Text style={{ ...FONTS2.body3 }}>사진 추가</Text>
            </TouchableOpacity>
        );
    };

    const onChange = (text) => {
        // console.log(e);
        setText(text);
    };

    const sendReview = async () => {
        // 리뷰 DB에 등록

        if (text === '') {
            ToastAndroid.showWithGravity('작성한 리뷰가 없습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        else {
            // item = {
            //     ...item,
            //     review: {
            //         reviewId: uuid.v4(),
            //         text: text,
            //     },
            // };
            // setItems(item);

            // 리뷰 axios

            const currentTime = new Date();
            currentTime.setHours(currentTime.getHours() + 9);

            //currentTime.getFullYear()}-${('00' + JSON.stringify(currentTime.getUTCMonth() + 1)).slice(-2)}-${('00' + JSON.stringify(currentTime.getUTCDate())).slice(-2)} ${('00' + JSON.stringify(currentTime.getUTCHours())).slice(-2)}:${('00' + JSON.stringify(currentTime.getUTCMinutes())).slice(-2)}:${('00' + JSON.stringify(currentTime.getUTCSeconds())).slice(-2)}

            await axiosApiInstance.post('/review', {
                storeId: item.storeId,
                contents: text,
                rate: 5,
                localDateTime: currentTime,
                imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/reviewimage%2F1c2b5839-0760-485c-817a-780d68c924a8.jpg?alt=media&token=295fe92f-316c-44cb-aef1-d57e308f8f4b'
            }).then(function (response) {
				console.log('리뷰 등록: ', response.data);
            });

            navigation.goBack();
            ToastAndroid.showWithGravity('리뷰가 등록되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <Header title='리뷰 작성' small='true' />

            <View style={styles.body}>
                <View style={styles.reviewBox}>
                    <Text style={{ ...FONTS2.h2, marginBottom: 20 }}>{item.storeName}</Text>

                    {/* {renderRating()} */}

                    <TextInput
                        placeholder='리뷰를 작성해주세요.'
                        style={styles.textInput}
                        onChangeText={(e) => onChange(e)}
                    />
                    {uploadImage ? (
                        <View style={{ paddingTop: 10, }}>
                            <Image
                                source={{ uri: uploadImage }}
                                resizeMode='contain'
                                style={{
                                    borderRadius: 8,
                                    width: responsiveWidth(40),
                                    height: responsiveWidth(40),
                                }}
                            />
                        </View>
                    ) : (null)}
                    {renderAddPhoto()}
                </View>
            </View>

            <BottomButton title='등록하기' onPress={sendReview} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    body: {
        flex: 1,
        height: responsiveHeight(72),
        alignItems: 'center',
        marginTop: 40,
    },
    reviewBox: {
        width: responsiveWidth(80),
        borderWidth: 0.1,
        // backgroundColor: '#f1f3f5',
        padding: 15,
        borderRadius: 8,
    },
    textInput: {
        borderRadius: 8,
        backgroundColor: COLORS.lightGray,
        minHeight: responsiveHeight(15),
        marginTop: 5,
        textAlignVertical: 'top',
        paddingLeft: 10,
        ...FONTS2.body3,
    },
    addPhoto: {
        marginTop: SIZES.padding,
        borderWidth: 0.3,
        borderRadius: 8,
        width: SIZES.width * 0.19,
        height: SIZES.height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CreateReview;
