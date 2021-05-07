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
} from 'react-native';
import BottomButton from '../../components/layout/BottomButton';
import Header from '../../components/layout/Header';
import { SIZES, FONTS2 } from '../../constants';

import Postcode from '@actbase/react-daum-postcode';

const RegisterStoreDetail = () => {

    const [isModal, setModal] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [storeNumber, setStoreNumber] = useState('');
    const [storeAddress, setStoreAddress] = useState('');


    return (
        <KeyboardAvoidingView style={styles.container}>
            {isModal &&
                <View style={styles.modal} >
                    <Postcode
                        style={{ width: SIZES.width, height: SIZES.height }}
                        jsOptions={{ animated: true, hideMapBtn: true }}
                        onSelected={data => {
                            setStoreAddress(data.address);
                            setModal(false);
                        }}
                    />
                </View>
            }
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {/* Header */}
                <Header title="매장 등록" small="true" />

                {/* Body */}
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 30 }}>
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', paddingBottom: 10 }}>가게 이름 (상호명)</Text>
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
                            value={storeNumber}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text)=>setStoreNumber(text)}
                        />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>가게 주소</Text>
                        <TouchableOpacity
                            onPress={() => setModal(true)}
                        >
                        <Text
                            style={{
                                borderBottomWidth: 1,
                                width: 300,
                                ...FONTS2.body2,
                                color: '#707070',
                            }}
                        >{storeAddress === '' ? "주소 검색하기" : storeAddress}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Footer */}
                    <BottomButton onPress={() => console.log("hello")} title="다음" />
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
        top:0,
        alignSelf: 'center',
        zIndex: 1,
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
