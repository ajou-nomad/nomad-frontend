/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import {FONTS2, SIZES, COLORS, icons} from '../../constants';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { launchImageLibrary } from 'react-native-image-picker';

import axiosApiInstance from '../../utils/axios';

const AddMenu = ({modalVisible, closeModal, addMenu}) => {

    const [menuName, setMenuName] = useState('');
    const [menuPrice, setMenuPrice] = useState('');
    const [menuDescription, setMenuDescription] = useState('');
    const [uploadImage, setUploadImage] = useState('');

    const resetMenuInfo = () => {
        setMenuName('');
        setMenuDescription('');
        setMenuPrice('');
        setUploadImage('');
    };

    const handleImage = () => {
        launchImageLibrary({}, (res) => {
            const source = { uri: res.uri };
            setUploadImage(res.uri);
            console.log(res.uri);
        })
    }


    return (

        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                resetMenuInfo();
                closeModal();
            }}
        >
            <KeyboardAvoidingView style={{flex: 1}}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>메뉴 이름</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                width: SIZES.width * 0.8,
                                ...FONTS2.body2,
                            }}
                            placeholder="메뉴 이름을 입력해주세요."
                            value={menuName}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text)=> setMenuName(text)}
                        />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>메뉴 가격</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                width: SIZES.width * 0.8,
                                ...FONTS2.body2,
                            }}
                            placeholder="숫자만 입력해주세요."
                            value={menuPrice}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text)=> setMenuPrice(text)}
                        />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>메뉴 설명</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                width: SIZES.width * 0.8,
                                ...FONTS2.body2,
                                marginBottom: 20,
                            }}
                            placeholder="메뉴에 대해 설명해주세요."
                            value={menuDescription}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={(text)=> setMenuDescription(text)}
                        />

                        {
                            uploadImage ? (
                                <View>
                                    <Image 
                                        source={{ uri: uploadImage}}
                                        resizeMode='contain'
                                        style={{ width: 100, height: 100
                                        }}
                                    />
                                </View>
                            ) : (
                                <View style={{borderWidth: 2,}}>
                                <Image
                                    source={icons.cancel}
                                    resizeMode='contain'
                                    style={{ width: 100, height: 100
                                    }}
                                />
                            </View>


                            )
                        }
                        <TouchableOpacity
                            onPress={handleImage}
                        >
                            <View style={{}}>
                                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>사진 첨부</Text>
                            </View>
                        </TouchableOpacity>


                        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: SIZES.width * 0.7}}>
                            <TouchableOpacity
                                style={{ height: responsiveHeight(10), width: responsiveWidth(20) }}
                                onPress={()=>{
                                    const menuInfo = Object.assign({
                                        name: menuName,
                                        price: menuPrice,
                                        description: menuDescription,
                                        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2Fhollys.jpg?alt=media&token=1dd864d1-1446-4707-a9e4-6117b28efd72', //uploadImage
                                    });
                                    resetMenuInfo();
                                    closeModal();
                                    addMenu(menuInfo);

                                }}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={{ ...FONTS2.body3, fontWeight: 'bold' }}>추가</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: responsiveHeight(10), width: responsiveWidth(20) }}
                                onPress={()=> {
                                    resetMenuInfo();
                                    closeModal();
                                }}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={{ ...FONTS2.body3, fontWeight: 'bold' }}>취소</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>

            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: SIZES.width * 0.95,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonView: {
        flex: 1,
        borderRadius: SIZES.radius,
        marginTop: 20,
        backgroundColor: COLORS.tertiary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddMenu;
