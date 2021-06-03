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

import { FONTS, FONTS2, icons, SIZES } from '../../constants';


const ReviewItem = ({ item, admin }) => {

    // default는 undefinded 즉 false 이기 때문에 특수한 상황에서만 true 되도록 구현 ( isMypage 삭제)

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
                    <Text style={{ ...FONTS2.h4, marginBottom: 5 }}>{item.nickName}</Text>
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
                    // onPress={() => navigation.navigate('StoreDetail', { time: null, storeName:/* .map(storeName:item.storeName) */'빽다방 아주대점' })}
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

            { admin ? (
                renderReivewInStore()) : (
                renderReivewInMypage()
            )}

            {/* 사진 */}
            <Image source={{ uri: item.imgUrl }} resizeMode='contain' style={{ width: SIZES.width * 0.85, height: SIZES.height * 0.4,}} />
            {/* 글 */}
            <View style={styles.content}>
                <Text style={{ ...FONTS2.body3 }}>{item.contents}</Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                { admin ? (
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={handleDelete}
                                >
                                    <Text style={{ ...FONTS2.body2 }}>삭제</Text>
                                </TouchableOpacity>
                            </View>
                ) : (null)
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        paddingTop: 10,
        alignItems: 'center',
    },
    content: {
        minHeight: 50,
        paddingHorizontal: 5,
        justifyContent: 'center'
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