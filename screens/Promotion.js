/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import BottomButton from '../components/layout/BottomButton';
import Header from '../components/layout/Header';
import { FONTS2, FONTS3, icons, SIZES } from '../constants';

const Promotion = ({ route }) => {
    // 배열 고려 안함. 나중에 여러 매장 들어올 때 코드 바꿔줘야함.
    const storeData = route.params.storeData[0];

    const promotionMenuDto = storeData.promotionMenuDto;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <Header title={storeData.storeName} small='true' />
            
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ margin: SIZES.base, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...FONTS2.body2, color: '#868e96' }}>단일 메뉴 </Text>
                            <Text style={{ ...FONTS3.h2, color: '#f03e3e' }}>프로모션</Text>
                            <Text style={{ ...FONTS2.body2, color: '#868e96' }}>입니다.</Text>
                        </View>
                        <ImageBackground
                            source={icons.highlight}
                            resizeMode="contain"
                            style={{
                                height: SIZES.height * 0.045,
                            }}>
                            <Text style={{ ...FONTS2.body2, color: '#868e96' }}>아래 메뉴를 할인된 가격으로 주문해보세요!</Text>
                        </ImageBackground>
                    </View>
                    <Image source={{ uri: promotionMenuDto.imgUrl }} resizeMode='contain' style={{ width: SIZES.width * 0.8, height: SIZES.height * 0.35, }} />
                    <Text style={{ ...FONTS3.h1, marginTop: SIZES.base }}>{promotionMenuDto.promotionMenuName}</Text>
                    <Text style={{ ...FONTS2.body2 }}>{promotionMenuDto.promotionDescription}</Text>
                    <Text style={{ ...FONTS2.body2 }}>{promotionMenuDto.description}</Text>
                    <Text style={{ ...FONTS2.body2 }}>{promotionMenuDto.cost}원</Text>
                </View>
            </View>

            <BottomButton title='참여하기' />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Promotion;
