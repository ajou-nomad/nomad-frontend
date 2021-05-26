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
    Pressable
} from 'react-native';
import BottomButton from '../../../components/layout/BottomButton';
import Header from '../../../components/layout/Header';
import { SIZES, FONTS2 } from '../../../constants';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { launchImageLibrary } from 'react-native-image-picker';

import Postcode from '@actbase/react-daum-postcode';
import DatePicker from 'react-native-date-picker';
import { geocode } from '../../../utils/helper';

import { icons } from '../../../constants';
import axiosApiInstance from '../../../utils/axios';




const RegisterStoreDetail = ({navigation}) => {


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

    const [uploadImage, setUploadImage] = useState('https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F03_%EC%95%97%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8_HOT.jpg?alt=media&token=529afacf-945e-46f9-b0b1-ed2d6f41103d');


    const isEmpty = (val) => {
        if (val === '') {
            return true;
        } else {
            return false;
        }
    };

    const handleImage = () => {
        launchImageLibrary({}, (res) => {
            const source = { uri: res.uri };
            setUploadImage(res.uri);
            console.log(res.uri);
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
                {/* Header */}
                <Header title="매장 정보" small="true" />

                {/* Body */}
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>

                        {/* 매장 이름 */}
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

                        {/* 카테고리 */}
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>카테고리</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
                        <View style={{flex:1 ,marginBottom: 30 ,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            {categories.map( (item, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        setSelected([
                                        ...initalSelected.slice(0, index),
                                        !selected[index],
                                        ...initalSelected.slice(index + 1),
                                        ]);

                                        setCategory((prevItem) => prevItem === item ? '' : item );
                                    }}
                                    style={ [
                                        {
                                            marginHorizontal: 5,
                                            borderRadius: 100,
                                            backgroundColor: selected[index]
                                                ? '#6E99F0'
                                                : 'white',
                                                // opacity: selected[index]
                                                // ? 0.9
                                                // : 0.5,
                                        },
                                        styles.dateButton,
                                    ]}
                                >
                                <View style={{ width: 65, height: 65, alignItems: 'center', justifyContent: 'center'}}>
                                <Text  style={{color: selected[index] ? 'white' : 'black', ...FONTS2.body4}}>{item}</Text>
                                </View>
                                </Pressable>
                            ))}
                        </View>
                        </ScrollView>


                        {/* 사진 */}
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
                                <View style={{ borderWidth: 2, }}>
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
                        <TouchableOpacity
                            // onPress={handleImage}
                        >
                            <View style={{}}>
                                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>사진 첨부</Text>
                            </View>
                        </TouchableOpacity>


                        {/* 매장 전화번호 */}
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

                        {/* 매장 주소 */}
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

                        {/* 배달 팁 */}
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

                        {/* 매장 오픈 마감 시간 */}
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>매장 오픈시간</Text>
                        <DatePicker date={openTime} onDateChange={date => setOpenTime(date)} mode="time" />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>매장 마감시간</Text>
                        <DatePicker date={closeTime} onDateChange={date => setCloseTime(date)} mode="time" />

                        {/* 공지 사항 */}
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

                        {/* 상점 설명 */}
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
                    {/* Footer */}
                    <BottomButton onPress={() => {
                        // !isEmpty(storeName) && !isEmpty(storeCallNumber) && !isEmpty(storeLocation) && !isEmpty(storeTip)
                        if (true) {
                            axiosApiInstance.post('/store', {
                                storeName: storeName,
                                address: storeLocation.address,
                                latitude: storeLocation.latitude,
                                longitude: storeLocation.longitude,
                                phoneNumber: storeCallNumber,
                                deliveryTip: storeTip,
                                openTime: ('0' + openTime.getHours()).slice(-2) + ':' + ('0' + openTime.getMinutes()).slice(-2),
                                closeTime: ('0' + closeTime.getHours()).slice(-2) + ':' + ('0' + closeTime.getMinutes()).slice(-2),
                                logoUrl: uploadImage,

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
