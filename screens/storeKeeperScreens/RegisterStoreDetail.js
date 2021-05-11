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
} from 'react-native';
import BottomButton from '../../components/layout/BottomButton';
import Header from '../../components/layout/Header';
import { SIZES, FONTS2 } from '../../constants';
import { responsiveHeight } from 'react-native-responsive-dimensions';

import Postcode from '@actbase/react-daum-postcode';
import DatePicker from 'react-native-date-picker';
import { geocode } from '../../utils/helper';

const RegisterStoreDetail = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [storeCallNumber, setStoreCallNumber] = useState('');
    const [storeTip, setStoreTip] = useState('');
    const [storeLocation, setStoreLocation] = useState('');
    const [openTime, setOpenTime] = useState(new Date());
    const [closeTime, setCloseTime] = useState(new Date());

    const isEmpty = (val) => {
        if (val === '') {
            return true;
        } else {
            return false;
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            {modalVisible &&
                <View style={styles.modal} >
                    <Postcode
                        style={{ width: SIZES.width, height: SIZES.height - responsiveHeight(13.5) }}
                        jsOptions={{ animated: true, hideMapBtn: true }}
                        onSelected={ async (data) => {
                            setModalVisible(false);
                            const addedCoords = await geocode(data.address + ' ' + data.buildingName);
                            setStoreLocation(addedCoords);
                        }}
                    />
                    <BottomButton onPress={() =>  setModalVisible(false)} title="뒤로 가기" />
                </View>
            }
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {/* Header */}
                <Header title="매장 정보" small="true" />

                {/* Body */}
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 30 }}>
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>가게 이름 (상호명)</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                width: 300,
                                ...FONTS2.body2,
                            }}
                            placeholder="가게명을 입력해주세요."
                            value={storeName}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text)=>setStoreName(text)}
                        />

                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>가게 전화번호</Text>
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
                            onChangeText={(text)=>setStoreCallNumber(text)}
                        />

                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>가게 주소</Text>
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
                            onChangeText={(text)=>setStoreTip(text)}
                        />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop:30, paddingBottom: 10 }}>매장 오픈시간</Text>
                        <DatePicker date={openTime} onDateChange={ date => setOpenTime(date)} mode="time" minuteInterval={30} />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop:30, paddingBottom: 10 }}>매장 마감시간</Text>
                        <DatePicker date={closeTime} onDateChange={ date => setCloseTime(date)} mode="time" minuteInterval={30} />
                    </View>
                    {/* Footer */}
                    <BottomButton onPress={() => {
                        if ( !isEmpty(storeName) && !isEmpty(storeCallNumber) && !isEmpty(storeLocation) && !isEmpty(storeTip) ) {
                            const storeInfo = Object.assign({
                                storeName: storeName,
                                storeLocation: storeLocation,
                                storeCallNumber: storeCallNumber,
                                storeTip: storeTip,
                                openTime: ('0' + openTime.getHours()).slice(-2) + ':' + ('0' + openTime.getMinutes()).slice(-2),
                                closeTime: ('0' + closeTime.getHours()).slice(-2) + ':' + ('0' + closeTime.getMinutes()).slice(-2),
                            });
                            navigation.navigate('RegisterFoodDetail', {storeInfo});
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
