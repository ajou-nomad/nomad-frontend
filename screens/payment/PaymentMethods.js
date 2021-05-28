/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useRef, useMemo} from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import BottomButton from '../../components/layout/BottomButton';
import Header from '../../components/layout/Header';
import { SIZES, icons, FONTS2,COLORS } from '../../constants';

// re-rendering animation issue 해결
// 추후 point부분 구현시 수정
const PaymentMethods = ({ navigation, route: { params } }) => {

    const [xOffset] = useState(new Animated.Value(0));
    const [method, setMethod] = useState(0); //default 카드
    const paymentMethods = ['카드', '포인트'];

    // pass to next screen
    const totalData = params.totalData;
    const data = {
        amount: totalData.totalPrice,
        myPoint: 150000,
        buyerName: '테스트용',
        buyerTel: '010-1234-5678',
        buyerEmail: 'test@gmail.com',
        paymentMethod: method ? '카드' : '포인트',
    };


    const priceEdit = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };


    const Screen = props => {
        return (
            <View style={styles.scrollPage}>
                <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
                    <Image
                        source={props.index ? icons.credit_card : icons.credit_card2 }
                        resizeMode="contain"
                        style={{
                            width: 350,
                            height: 350,
                        }}
                    />
                </Animated.View>
            </View>
        );
    };

    const renderDots = () => {
        const dotPosition = Animated.divide(xOffset, SIZES.width);

        return (
            <View style={{height: 30}}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding,
                    }}
                >
                    {/* interpolate를 이용하여 animated되는 사이에 추가적인 효과가 가능 */}
                    {paymentMethods.map((item, index) => {
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3 , 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: 'clamp',
                        });

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, '#339af0', COLORS.darkgray],
                            extrapolate: 'clamp',
                        });


                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor,
                                }}
                            />
                        );
                    })}
                </View>
            </View>
        );
    };

    const renderOrder = () => {
        return (
        <View>
            <View style={{ backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ ...FONTS2.body2 }}>주문 금액</Text>
                    <Text style={{ ...FONTS2.body2 }}>{priceEdit(totalData.totalPrice - totalData.storeInfo.deliveryTip)}원</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ ...FONTS2.body2 }}>배달비</Text>
                    <Text style={{ ...FONTS2.body2 }}>{priceEdit(totalData.storeInfo.deliveryTip)}원</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingTop: 15, borderTopWidth: 0.5, marginBottom: 20, }}>
                    <Text style={{ ...FONTS2.h2 }}>총 결제 금액</Text>
                    <Text style={{ ...FONTS2.h2 }}>{priceEdit(totalData.totalPrice)}원</Text>
                </View>
            </View>
                <BottomButton
                    onPress = { () => method ? navigation.replace('Point', { paymentInfo: data, postData: totalData}) : navigation.replace('CreditCard', { paymentInfo: data, postData: totalData })}
                    title = { method ? '포인트 선택' : '신용/체크카드 선택'}
                />
            </View>
        </View>
        );
    };



    const transitionAnimation = index => {
        return {
            transform: [
            { perspective: 800 },
            {
              scale: xOffset.interpolate({
                inputRange: [
                  (index - 1) * SIZES.width,
                  index * SIZES.width,
                  (index + 1) * SIZES.width,
                ],
                outputRange: [0.25, 1, 0.25],
              }),
            },
            {
              rotateX: xOffset.interpolate({
                inputRange: [
                  (index - 1) * SIZES.width,
                  index * SIZES.width,
                  (index + 1) * SIZES.width,
                ],
                outputRange: ['45deg', '0deg', '45deg'],
              }),
            },
            {
              rotateY: xOffset.interpolate({
                inputRange: [
                  (index - 1) * SIZES.width,
                  index * SIZES.width,
                  (index + 1) * SIZES.width,
                ],
                outputRange: ['-45deg', '0deg', '45deg'],
              }),
            },
            ],
        };
    };



    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <Header title="결제수단" small="true" haveInput="true" />

            {/* Body */}
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}

                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                            {
                                useNativeDriver: false,
                                listener: (e) => {

                                    // 페이지네이션
                                    const nextCurrent =  Math.floor(Math.floor(e.nativeEvent.contentOffset.x) / Math.floor(SIZES.width));
                                    (method === nextCurrent) ? null : setMethod(nextCurrent);
                                },
                            },
                        )
                    }
                >
                {paymentMethods.map( (item, index) =>
                    <Screen key={index} text={item} index={index} />
                )}
                </Animated.ScrollView>
                {renderDots()}
            </View>

            {/* 결제정보 및 선택버튼 */}
            {renderOrder()}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        flexDirection: 'row',
    },
    scrollPage: {
        width: SIZES.width,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    screen: {
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 25,
        // opacity: 0.6,
        // elevation: 5,
    },
});

export default PaymentMethods;
