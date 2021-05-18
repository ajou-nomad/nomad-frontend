/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomButton from '../../components/layout/BottomButton';
import Header from '../../components/layout/Header';
import { FONTS2, COLORS, icons } from '../../constants';
import { clearAll, setData, getData, addData } from '../../utils/helper';

const CreateReview = ({ route }) => {
    const navigation = useNavigation();
    const [uploadImage, setUploadImage] = useState('');
    const [text, setText] = useState('');

    const [storageImage, setStorageImage] = useState('');
    const [orderData, setOrderData] = useState();
    const { item } = route.params;
    // console.log('CreateReview ', item); // item.orderId

    useEffect(() => {
        getData('orderData').then(data => setOrderData(data));
    });

    const renderRating = () => {
        return (
            <View style={{
                marginVertical: 10,
            }}>
                {/* <Image
                source={icons.star}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                }}
            /> */}
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
    };

    const uploadImageToStorage = async (imageUri) => {
        if (imageUri) {
            const ext = imageUri.split('.').pop(); // Extract image extension (jpg)

            const filename = `${uuid.v4()}.${ext}`; // Generate unique name
            //    setImgLoading(true);
            const imgRef = storage().ref(`reviewimage/${filename}`);
            const unsubscribe = imgRef.putFile(imageUri) // putFile: image Storage에 저장
                .on(
                    storage.TaskEvent.STATE_CHANGED,
                    async snapshot => {
                        var state = {
                            ...state,
                            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100, // Calculate progress percentage
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
                            setStorageImage(url.toString());
                            // return url.toString();
                        }
                    },
                    error => {
                        console.log('AccountEditScreen uploading error', error);
                    }
                );
        }
    };

    const renderAddPhoto = () => {
        return (
            <TouchableOpacity style={styles.addPhoto} onPress={handleImage}>
                <Image
                    source={icons.picture}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
                <Text style={{ ...FONTS2.body3 }}>사진 추가</Text>
            </TouchableOpacity>
        );
    };

    const sendReview = async () => {
        // 리뷰 DB에 등록
        // storeId, useId, image, text,
        // let result;

        // if (uploadImage) {
        //     await uploadImageToStorage(uploadImage);
        // }

        // const reviewData = {
        //     reviewId: uuid.v4(),
        //     text: text,
        //     imgUrl: result,
        // };

        // getData('orderData').then(data => {
        //     data.map(item => {
        //         if (item.orderId === 2) {
        //             console.log('전: ', item);
        //             item.review = {
        //                 reviewId: uuid.v4(),
        //                 text: text,
        //                 imgUrl: storageImage,
        //             };
        //             console.log('후: ', item);
        //         }
        //     });
        // });

        orderData.map(item => {
            if (item.orderId === 2) {
                item.review = {
                    reviewId: uuid.v4().toString(),
                    text: text,
                    // imgUrl: storageImage,
                };
            }
        });

        console.log('orderData: ', orderData);
        setData('orderData', orderData);
        getData('orderData').then(data => console.log(data));
        // try {
        //     await AsyncStorage.mergeItem('orderData', JSON.stringify(orderData));
        // } catch (e) {
        //     console.log('에러러러러ㅓㄹ: ', e);
        // }
        // getData('orderData').then(data => console.log('ddddd:::::::: ', data));
        // setData('orderData', reviewData);
        // navigation.goBack();
        // ToastAndroid.showWithGravity('리뷰가 등록되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    const onChange = (text) => {
        // console.log(e);
        setText(text);
    };

   

    return (
        <ScrollView style={styles.container}>
            <Header title='리뷰 작성' small='true' />

            <View style={styles.body}>
                <View style={styles.reviewBox}>
                    <Text style={{ ...FONTS2.h2 }}>{item.storeName}</Text>

                    {renderRating()}

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
        height: responsiveHeight(72),
        alignItems: 'center',
        marginTop: 40,
    },
    reviewBox: {
        width: responsiveWidth(80),
        borderWidth: 0.6,
        // backgroundColor: '#f1f3f5',
        padding: 15,
        borderRadius: 8,
    },
    textInput: {
        borderWidth: 0.6,
        borderRadius: 8,
        minHeight: responsiveHeight(15),
        marginTop: 5,
        textAlignVertical: 'top',
        paddingLeft: 10,
        ...FONTS2.body3,
    },
    addPhoto: {
        marginTop: 10,
        borderWidth: 0.6,
        // backgroundColor: '#f1f3f5',
        borderRadius: 8,
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
});

export default CreateReview;
