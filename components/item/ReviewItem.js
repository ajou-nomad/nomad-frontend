/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid,
    Button,
    StyleSheet,
    Alert,
    Modal,
} from 'react-native';

import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, FONTS2, FONTS3, icons, SIZES } from '../../constants';


const ReviewItem = ({ item, admin }) => {

    // default는 undefinded 즉 false 이기 때문에 특수한 상황에서만 true 되도록 구현 ( isMypage 삭제)

    const navigation = useNavigation();

    const handleDelete = () => {
            return (
                <View style={{position: 'absolute'}}>
                    <Modal isVisible={true}>
                        <View style={{ flex: 1 }}>
                            <Text>I am the modal content!</Text>
                        </View>
                    </Modal>
                </View>
            );
        // ToastAndroid.showWithGravity('리뷰가 삭제되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    const renderRatingAndDate = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* 별점 함수 */}
                <Image
                    source={icons.star}
                    resizeMode='contain'
                    style={{
                        width: 15,
                        height: 15,
                    }}
                />
                {/* 날짜 */}
                <Text style={{ ...FONTS2.body3, marginLeft: 5 }}>{item.localDateTime.slice(0,10)}</Text>
            </View>
        );
    }

    const renderReviewTitle = () => {
        return (
            <View style={styles.reviewHeader}>
                {/* 사진, 유저 닉네임, 별점, 작성 날짜 */}
                <Image
                    source={icons.avatar}
                    resizeMode='contain'
                    style={styles.avatar}
                />
                <View style={styles.container}>
                    {/* 유저 닉네임 */}
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ ...FONTS2.h4 }}>{item.storeName}&gt;</Text>
                        <Text style={{ ...FONTS2.h4, marginBottom: 5 }}> {item.nickName}</Text>
                    </View>

                    {/* 별점, 작성 날짜 */}
                    {renderRatingAndDate()}
                </View>
            </View>
        );
    };

    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(!modalVisible);
    };

    const DeleteModal = () => {

        const modalBackgroundStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
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
                        <Text style={{ ...FONTS2.body2, textAlign: 'center', }}>리뷰를 삭제하시겠습니까?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: SIZES.base * 3, marginTop: SIZES.base * 3 }}>
                            <TouchableOpacity
                             onPress={() => closeModal()}
                            >
                                <Text style={{ ...FONTS2.body2 }}>닫기</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={{ ...FONTS2.h3 }}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );

    };

    return (
        <View style={styles.container}>
            {/* {renderHeader()} */}

            {renderReviewTitle()}

            {/* 사진 */}
            <Image source={{ uri: item.imgUrl }} resizeMode='contain' style={{ width: SIZES.width * 0.85, height: SIZES.height * 0.4, }} />
            {/* 글 */}
            <View style={styles.content}>
                <Text style={{ ...FONTS2.body3 }}>{item.contents}</Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                {admin ? (
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            // onPress={ () => handleDelete}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{ ...FONTS2.body2 }}>삭제</Text>
                        </TouchableOpacity>

                        <DeleteModal />
                    </View>
                    
                ) : (null)
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: SIZES.base,
    },
    avatar: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        margin: 5,
    },
    reviewHeader: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: '#ced4da',
        paddingVertical: 10,
        alignItems: 'center',
    },
    content: {
        minHeight: 50,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    deleteButton: {
        backgroundColor: '#e9ecef',
        alignItems: 'center',
        width: responsiveWidth(15),
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginBottom: 10,
    },
    closeButton: {
        width: SIZES.base * 2,
        height: SIZES.base * 2,
        tintColor: COLORS.darkgray,
    },
    modal: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        height: responsiveHeight(25),
        width: responsiveWidth(85),
        alignSelf: 'center',
        marginTop: SIZES.padding,
        justifyContent: 'center',
    },
});

export default ReviewItem;