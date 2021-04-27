/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';


import { FONTS2, icons } from '../constants';


const ReviewItem = () => {
    return (
        <View style={{ flexDirection: 'column', }}>
            <View style={{ flexDirection: 'row', borderTopWidth: 0.5, borderColor: '#ced4da', paddingTop: 10 }}>
                {/* 사진, 유저 닉네임, 별점, 작성 날짜 */}
                <Image
                    source={icons.user}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        alignSelf: 'center',
                        margin: 5,
                    }}
                />
                <View style={{ flexDirection: 'column', }}>
                    {/* 유저 닉네임 */}
                    <Text style={{ ...FONTS2.h4, marginBottom: 5 }}>스윙스</Text>
                    {/* 별점, 작성 날짜 */}
                    <View style={{ flexDirection: 'row', }}>
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
                </View>
            </View>
            {/* 사진, 글?, 댓글? */}
            {/* 사진 */}
            <View
                style={{
                    width: '100%',
                    height: 200,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                }}>
                <Text style={{ ...FONTS2.h1, }}>사진</Text>
            </View>
            {/* 글 */}
            <View style={{ minHeight: 80, paddingTop: 10, paddingHorizontal: 5 }}>
                <Text style={{ ...FONTS2.body3 }}>맛있어요</Text>
            </View>
        </View>
    );
}

export default ReviewItem;
