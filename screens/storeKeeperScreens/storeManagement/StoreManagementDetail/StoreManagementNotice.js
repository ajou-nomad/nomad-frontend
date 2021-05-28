/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Header from '../../../../components/layout/Header';
import { COLORS, SIZES, FONTS2 } from '../../../../constants';
import Notice from '../../../Notice';

const StoreManagementNotice = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(!modalVisible);
    };
    return (
        <View style={styles.container}>
            <Header title='공지사항 관리' small='true' />
            
            
            <View style={styles.reviewContainer}>
                <Text style={{ ...FONTS2.body2, alignSelf: 'center', marginTop: 20 }}>등록된 공지사항이 없습니다.</Text>
                <Text style={{ ...FONTS2.body2, alignSelf: 'center' }}>공지사항을 등록해보세요.</Text>
                <TouchableOpacity
                    style={styles.newButton}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={{ ...FONTS2.h4, color: COLORS.white }}>신규 작성</Text>
                </TouchableOpacity>
                
                <Text style={{ ...FONTS2.body3, alignSelf: 'center', color: COLORS.darkgray, paddingVertical: SIZES.base }}>* 가게 매장정보 탭에서 보여집니다.</Text>

                <Notice modalVisible={modalVisible} closeModal={closeModal} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    reviewContainer: {
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 10,
        width: responsiveWidth(80),
        minHeight: responsiveHeight(20),
        alignSelf: 'center',
        marginTop: SIZES.base * 5,
    },
    newButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 20,
        marginHorizontal: 45,
    },
});

export default StoreManagementNotice;
