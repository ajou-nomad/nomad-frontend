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
} from 'react-native';

import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import { FONTS, FONTS2, icons } from '../../constants';


const ReviewItem = ({ isMypage }) => {

    const navigation = useNavigation();

    const handleDelete = () => {
        //     return (
        //         <View>
        //             <Modal isVisible={true}>
        //                 <View style={{ flex: 1 }}>
        //                     <Text>I am the modal content!</Text>
        //                 </View>
        //             </Modal>
        //         </View>
        //     );
        ToastAndroid.showWithGravity('리뷰가 삭제되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    const renderRatingAndDate = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
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
                <Text style={{ ...FONTS2.body3, marginLeft: 5 }}>지난 주</Text>
            </View>
        );
    }

    const renderReivewInStore = () => {
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
                    <Text style={{ ...FONTS2.h4, marginBottom: 5 }}>스윙스</Text>
                    {/* 별점, 작성 날짜 */}
                    {renderRatingAndDate()}
                </View>
            </View>
        );
    };

    const renderReivewInMypage = () => {
        return (
            <View>
                <TouchableOpacity
                    style={{ marginVertical: 10 }}
                    onPress={() => navigation.navigate('StoreDetail', { time: null, storeName:/* .map(storeName:item.storeName) */'빽다방 아주대점' })}
                >
                    <Text style={{ ...FONTS2.h3 }}>가게 이름 &gt;</Text>
                </TouchableOpacity>
                {renderRatingAndDate()}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* {renderHeader()} */}

            {!isMypage ? (
                renderReivewInStore()) : (
                renderReivewInMypage()
            )}

            {/* 사진 */}
            <View
                style={styles.photo}>
                <Text style={{ ...FONTS2.h1, }}>사진</Text>
            </View>
            {/* 글 */}
            <View style={styles.content}>
                <Text style={{ ...FONTS2.body3 }}>맛있어요</Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                {!isMypage ? (null) : (
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDelete}
                        >
                            <Text style={{ ...FONTS2.body2 }}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
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
        paddingTop: 10,
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        height: 200,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    content: {
        minHeight: 50,
        paddingTop: 10,
        paddingHorizontal: 5,
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
});

export default ReviewItem;
