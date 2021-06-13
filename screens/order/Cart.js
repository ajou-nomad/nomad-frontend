/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ToastAndroid,
    LogBox,
} from 'react-native';
import Header from '../../components/layout/Header';
import BottomButton from '../../components/layout/BottomButton';
import OrderMenuItem from '../../components/item/OrderMenuItem';
import { COLORS, FONTS2, SIZES } from '../../constants';
import { insertComma } from '../../utils/helper';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const Cart = ({ navigation, route: { params } }) => {


    const [cartItems, setCartItems] = useState(params.cartItems);

    let itemPrice = 0;
    for (let indexOfCart = 0; indexOfCart < cartItems.length; indexOfCart++) {
        itemPrice += cartItems[indexOfCart].cost;
    }
    let deliveryTip = 0;
    if (cartItems.length > 0) {
        deliveryTip = params.storeInfo.deliveryTip;
    }
    const totalPrice = itemPrice + deliveryTip;


    const delItem = (deleteMenuId) => {
        setCartItems( (currentCartItems) => {
            return currentCartItems.filter( (cartItem) => cartItem.menuId !== deleteMenuId);
        });
    };

    const renderBody = () => {
        return (
            <View style={{ backgroundColor: COLORS.white, }}>
                <View>
                    <View style={{ margin: 30, }}>
                        <Text style={{ ...FONTS2.h2, marginBottom: 10, }}>{params.storeInfo.storeName}</Text>
                        {
                            cartItems.map((items, index) => {
                                return <OrderMenuItem key={index} isCart="true" orderDetail={items} delCartItem={params.delCartItem} delItem={delItem} promotion={params.promotion} />
                            })
                        }
                    </View>
                    {params.promotion ? (
                        <></>
                    ) : (
                        <TouchableOpacity
                            style={{ alignItems: 'center', }}
                            onPress={() => navigation.navigate('StoreDetail')}
                        // navigate 할 때 원래 주문했던 매장 페이지로 이동해야함.
                        >
                            <Text style={{ ...FONTS2.body2, color: '#4dabf7' }}>+ 메뉴 추가</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ ...FONTS2.h2, marginBottom: 10 }}>요청사항</Text>
                    <View style={{ marginBottom: SIZES.base * 2 }}>
                        <Text style={{ ...FONTS2.body2, marginBottom: 5 }}>가게 사장님에게</Text>
                        <TextInput
                            style={styles.textInput} placeholder="가게 사장님에게" />
                    </View>

                    <View>
                        <Text style={{ ...FONTS2.body2, marginBottom: 5, }}>배달원에게</Text>
                        <TextInput
                            style={styles.textInput} placeholder="배달원에게" />
                    </View>
                </View>


                <View style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.body2 }}>주문 금액</Text>
                        <Text style={{ ...FONTS2.body2 }}>{insertComma(itemPrice)}원</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.body2 }}>배달비</Text>
                        <Text style={{ ...FONTS2.body2 }}>{insertComma(deliveryTip)}원</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingTop: 15, borderTopWidth: 0.5, marginBottom: 20, }}>
                        <Text style={{ ...FONTS2.h2 }}>총 결제 금액</Text>
                        <Text style={{ ...FONTS2.h2 }}>{insertComma(totalPrice)}원</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Header title="카트" haveInput="true" />
                {renderBody()}
                <View>
                    {(params.location.buildingName && params.deliDate && params.time) ? (
                        <BottomButton onPress={() => totalPrice === 0 ? ToastAndroid.showWithGravity('메뉴를 선택해주세요.', ToastAndroid.SHORT, ToastAndroid.CENTER) : navigation.navigate('CheckOrder',
                            {
                                totalPrice: totalPrice,
                                cartItems: cartItems,
                                time: params.time,
                                location: params.location,
                                storeInfo: params.storeInfo,
                                deliDate: params.deliDate,
                                groupData: params.groupData,
                                promotion: params.promotion,
                            })} title="결제하기" />
                    ) : (
                        <BottomButton onPress={() => totalPrice === 0 ? ToastAndroid.showWithGravity('메뉴를 선택해주세요.', ToastAndroid.SHORT, ToastAndroid.CENTER) : navigation.navigate('CreateGroupDetail',
                            {
                                totalPrice: totalPrice,
                                cartItems: cartItems,
                                time: params.time,
                                location: params.location,
                                storeInfo: params.storeInfo,
                                deliDate: params.deliDate,
                                groupData: params.groupData,
                                datePicker: params.datePicker,
                                promotion: params.promotion,
                            }
                        )} title="그룹 생성하기" />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    textInput: {
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#adb5bd',
        padding: 10,
        ...FONTS2.body3,
    },
});

export default Cart;
