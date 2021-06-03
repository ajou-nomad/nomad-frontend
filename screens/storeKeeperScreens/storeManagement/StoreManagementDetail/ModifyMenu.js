/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, Modal,TouchableOpacity, Image, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS, FONTS2, icons, SIZES } from '../../../../constants';

const ModifyMenu = ({ modalVisible, closeModal, item }) => {

    const modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: SIZES.height * 0.02, borderBottomWidth: 0.3 }}>
                        <TouchableOpacity
                            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }} //터치영역 확장
                            onPress={() => closeModal()}
                            style={{ position: 'absolute', left: SIZES.width * 0.03 }}
                        >
                            <Image source={icons.close} resizeMode='contain' style={styles.closeButton} />
                        </TouchableOpacity>

                        <Text style={{ ...FONTS2.h3, }}>솜사탕캔디 플랫치노</Text>
                    </View>

                    <View style={{ alignItems: 'center', }}>
                        <TouchableOpacity>
                            <Text style={{ ...FONTS2.h3, paddingVertical: SIZES.base * 2, }}>메뉴 수정</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{ ...FONTS2.h3, paddingVertical: SIZES.base * 2 }}>메뉴 삭제</Text>
                        </TouchableOpacity>
                    </View>
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
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        // minHeight: responsiveHeight(25),
        width: responsiveWidth(100),
        alignSelf: 'center',
        paddingTop: SIZES.base,
        position: 'absolute',
        bottom: 0,
    },
});

export default ModifyMenu;
