/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
    Pressable,
} from 'react-native';
import BottomButton from '../../../components/layout/BottomButton';
import Header from '../../../components/layout/Header';
import { SIZES, FONTS2 } from '../../../constants';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

import Postcode from '@actbase/react-daum-postcode';
import DatePicker from 'react-native-date-picker';
import { geocode } from '../../../utils/helper';

import { icons } from '../../../constants';
import axiosApiInstance from '../../../utils/axios';




const RegisterStoreDetail = ({ navigation }) => {


    // 상점 입력 정보
    const [modalVisible, setModalVisible] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [storeCallNumber, setStoreCallNumber] = useState('');
    const [storeTip, setStoreTip] = useState('');
    const [storeLocation, setStoreLocation] = useState('');
    const [openTime, setOpenTime] = useState(new Date());
    const [closeTime, setCloseTime] = useState(new Date());
    const [notice, setNotice] = useState('');
    const [storeIntro, setStoreIntro] = useState('');

    // 카테고리 관련 변수
    const [category, setCategory] = useState('');
    const categories = ['한식', '중식', '일식', '양식', '패스트푸드', '카페'];
    const initalSelected = [false, false, false, false, false];
    const [selected, setSelected] = useState(initalSelected);

    const [uploadImage, setUploadImage] = useState('');


    const isEmpty = (val) => {
        if (val === '') {
            return true;
        } else {
            return false;
        }
    };

    const handleImage = () => {
        launchImageLibrary({}, (res) => {
            setUploadImage(res.uri);
        });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            {modalVisible &&
                <View style={styles.modal} >
                    <Postcode
                        style={{ width: SIZES.width, height: SIZES.height - responsiveHeight(13.5) }}
                        jsOptions={{ animated: true, hideMapBtn: true }}
                        onSelected={async (data) => {
                            setModalVisible(false);
                            const addedCoords = await geocode(data.address + ' ' + data.buildingName);
                            setStoreLocation(addedCoords);
                        }}
                    />
                    <BottomButton onPress={() => setModalVisible(false)} title="뒤로 가기" />
                </View>
            }
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Header title="매장 정보" small="true" />

                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>매장 이름 (상호명)</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                width: 300,
                                ...FONTS2.body2,
                            }}
                            placeholder="매장명을 입력해주세요."
                            value={storeName}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text) => setStoreName(text)}
                        />
                        
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>카테고리</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
                            <View style={{ flex: 1, marginBottom: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {categories.map((item, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => {
                                            setSelected([
                                                ...initalSelected.slice(0, index),
                                                !selected[index],
                                                ...initalSelected.slice(index + 1),
                                            ]);

                                            setCategory((prevItem) => prevItem === item ? '' : item);
                                        }}
                                        style={[
                                            {
                                                marginHorizontal: 5,
                                                borderRadius: 100,
                                                backgroundColor: selected[index]
                                                    ? '#6E99F0'
                                                    : 'white',
                                            },
                                            styles.dateButton,
                                        ]}
                                    >
                                        <View style={{ width: 65, height: 65, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: selected[index] ? 'white' : 'black', ...FONTS2.body4 }}>{item}</Text>
                                        </View>
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>

                        {
                            uploadImage ? (
                                <View>
                                    <Image
                                        source={{ uri: uploadImage }}
                                        resizeMode="contain"
                                        style={{
                                            width: 100, height: 100,
                                        }}
                                    />
                                </View>
                            ) : (
                                <View style={{ borderWidth: 2, width: 104 }}>
                                    <Image
                                        source={icons.cancel}
                                        resizeMode="contain"
                                        style={{
                                            width: 100, height: 100,
                                        }}
                                    />
                                </View>


                            )
                        }
                        <TouchableOpacity onPress={handleImage}>
                            <View>
                                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>사진 첨부</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>매장 전화번호</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                width: 300,
                                ...FONTS2.body2,
                            }}
                            placeholder="숫자만 입력해주세요."
                            value={storeCallNumber}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text) => setStoreCallNumber(text)}
                        />

                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>매장 주소</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                        >
                            <Text
                                style={{
                                    borderBottomWidth: 1,
                                    width: 300,
                                    ...FONTS2.body2,
                                    color: '#707070',
                                }}
                            >{storeLocation.address === undefined ? '주소 검색하기' : storeLocation.address}</Text>
                        </TouchableOpacity>

                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>배달 팁</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                width: 300,
                                ...FONTS2.body2,
                            }}
                            placeholder="숫자만 입력해주세요."
                            value={storeTip}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text) => setStoreTip(text)}
                        />

                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>매장 오픈시간</Text>
                        <DatePicker date={openTime} onDateChange={date => setOpenTime(date)} mode="time" />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>매장 마감시간</Text>
                        <DatePicker date={closeTime} onDateChange={date => setCloseTime(date)} mode="time" />

                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>공지사항</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                marginBottom: 20,
                                width: 300,
                                ...FONTS2.body2,
                            }}
                            placeholder="공지사항을 입력해주세요."
                            value={notice}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text) => setNotice(text)}
                        />

                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>매장 설명</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                marginBottom: 30,
                                width: 300,
                                ...FONTS2.body2,
                            }}
                            placeholder="매장을 소개해주세요."
                            value={storeIntro}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text) => setStoreIntro(text)}
                        />
                    </View>
                    
                    <BottomButton onPress={() => {
                        
                        const uploadImageUri = (imageUri) => {
                            if (imageUri) {
                                const ext = imageUri.split('.').pop();
                                const filename = `${uuid.v4()}.${ext}`;
                                const imgRef = storage().ref(`menuimage/${filename}`);

                                const unsubscribe = imgRef.putFile(imageUri)
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

                                                console.log('파이어베이스 URL 체크: ', url);

                                                if (!isEmpty(storeName) && !isEmpty(storeCallNumber) && !isEmpty(storeLocation) && !isEmpty(storeTip)) {
                                                    axiosApiInstance.post('/store', {
                                                        storeName: storeName,
                                                        address: storeLocation.address,
                                                        latitude: storeLocation.latitude,
                                                        longitude: storeLocation.longitude,
                                                        phoneNumber: storeCallNumber,
                                                        deliveryTip: storeTip,
                                                        openTime: ('0' + openTime.getHours()).slice(-2) + ':' + ('0' + openTime.getMinutes()).slice(-2),
                                                        closeTime: ('0' + closeTime.getHours()).slice(-2) + ':' + ('0' + closeTime.getMinutes()).slice(-2),
                                                        logoUrl: url,

                                                        // 추가된 속성
                                                        notice: notice,
                                                        storeIntro: storeIntro,
                                                        category: category,

                                                    }).then(function (response) {

                                                        console.log(response);
                                                        navigation.navigate('RegisterMenuDetail');

                                                    }).catch(function (error) {
                                                        console.log('post store error');
                                                    });
                                                } else {
                                                    Alert.alert('필요한정보를 입력해주세요.');
                                                }
                                            }
                                        });
                            }
                        };
                        uploadImageUri(uploadImage);
                        
                    }} title="다음" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    modal: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
    },
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 5,
    },
    headerButton: {
      marginHorizontal: 10,
      padding: 5,
      borderColor: '#e5e5e5',
      borderWidth: 5,
      borderRadius: 25,
    },
    headerButtonText:{
      fontSize: 14,
      fontWeight: 'bold',
    },
});

export default RegisterStoreDetail;
