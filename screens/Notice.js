/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { COLORS, SIZES, icons, FONTS2 } from '../constants';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Notice = ({ modalVisible, closeModal, item }) => {
    const modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
    
    const [text, setText] = useState('');

    /*
    공지사항 post 시
    storeId, text, date 보내고
    공지사항 get 시
    text, date 받는다.
    */

    
    const onChange = (text) => {
        // console.log(e);
        setText(text);
    };

    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
            onRequestClose={() => {
                closeModal();
            }}
            transparent
        >
            <View style={[styles.container, modalBackgroundStyle]}>
                <View style={styles.modal}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.3 }}>
                        <TouchableOpacity
                            onPress={() => closeModal()}
                            style={{ padding: 15 }}
                        >
                            <Image source={icons.close} resizeMode='contain' style={styles.closeButton} />
                        </TouchableOpacity>

                        <Text style={{ ...FONTS2.h3, marginLeft: SIZES.padding * 5, }}>공지사항 등록 및 수정</Text>
                    </View>

                    <TextInput
                        multiline={true}
                        placeholder='공지사항을 작성해주세요.&#13;&#10;ex) &#13;&#10;고급스러운 소고기와 남녀노소의 마음을 모두 다 사로잡는 바삭한 치킨을 오랜기간 연구한 끝에 드디어 출시하게 되었습니다!'
                        style={styles.textInput}
                        onChangeText={(e) => onChange(e)}
                    />
                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => closeModal()}
                    >
                        <Text style={{ ...FONTS2.h4, color: COLORS.white }}>등록</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    closeButton: {
        width: SIZES.base * 2,
        height: SIZES.base * 2,
        tintColor: COLORS.darkgray,
    },
    modal: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        // height: responsiveHeight(75),
        width: responsiveWidth(85),
        alignSelf: 'center',
        marginTop: SIZES.padding,
        paddingBottom: SIZES.base * 3
    },
    newButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 20,
        marginHorizontal: 40,
    },
    textInput: {
        borderRadius: 8,
        backgroundColor: COLORS.lightGray,
        width: responsiveWidth(75),
        minHeight: responsiveHeight(20),
        marginTop: SIZES.base * 3,
        textAlignVertical: 'top',
        paddingLeft: 10,
        ...FONTS2.body3,
        alignSelf: 'center'
    },
});

export default Notice;
