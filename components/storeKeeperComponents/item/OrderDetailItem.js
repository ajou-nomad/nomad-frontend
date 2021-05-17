/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, SafeAreaView, } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import uuid from 'react-native-uuid';

import { COLORS, FONTS, FONTS2 } from '../../../constants';


import Header from '../../layout/Header';

const Button = ({ color, text, onPress }) => {
    return (
        <View>
            {!color ? (
                <TouchableOpacity
                    style={[styles.orderButton, { backgroundColor: '#CED4DA' }]}
                    onPress={onPress}
                >
                    <Text style={{ ...FONTS2.h3, color: COLORS.white }}>{text}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.orderButton}
                >
                    <Text style={{ ...FONTS2.h3, color: COLORS.white }}>{text}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const OrderDetailItem = ({ route }) => {
    // {"date": "12:00", "id": 0, "menus": [{"menu": "석류 아이스티", "option": [Array]}, {"menu": "아메리카노", "option": [Array]}, {"menu": "바닐라 라떼", "option": [Array]}], "orderStatus": true, "place": "아주대학교 팔달관"}
    const { menus, orderStatus, place, date } = route.params.data;

    const renderOptions = (item) => {
        const list = item.option.map(
            option_ => (<Text key={uuid.v4()} style={{ ...FONTS2.body2 }}>- {option_}</Text>)
        )

        return (
            <View>
                {list}
            </View>
        )
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS2.h1 }}>{item.menu}</Text>
                    <Text style={{ ...FONTS2.h2 }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                </View>
                {renderOptions(item)}
                {/* {item.option} */}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* <ScrollView> */}
                <Header title='진행 주문' small='true' />

            <View style={[styles.itemContainer, { marginTop: 20, }]}>
                <View>
                    <Text style={{ ...FONTS2.body2 }}>{date} 주문</Text>
                    <Text style={{ ...FONTS2.h2 }}>{place}</Text>
                </View>

                {!orderStatus ? (
                    <Button text='접수하기'onPress={() => alert('백엔드에 주문상태 업데이트 및 버튼 색깔 바꾸기')}/>
                ) : (
                    <Button text='접수완료' color='true' />
                )}
            </View>
            
            <View style={{ padding: 20 }}>
                <Text style={{ color: 'red', ...FONTS2.body2, marginBottom: 20 }}>점주에게 보내는 요청사항</Text>

                <SafeAreaView>
                <FlatList
                    data={menus}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                </SafeAreaView>
                {!orderStatus ? (null) : (
                    <View style={styles.cookStatus}>
                        <View style={{ alignItems: 'center'}}>
                            <Text style={{ ...FONTS2.body3 }}>남은 준비 시간</Text>
                            <Text style={{ ...FONTS2.h1 }}>27분</Text>
                        </View>
                        <Button text='조리완료'/>
                    </View>
                )}
            </View>
            {/* </ScrollView> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
    },
    itemContainer: {
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderButton: {
        justifyContent: 'center',
        backgroundColor: '#364FC7',
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 8,
        height: 35,
        borderBottomRightRadius: 25,
    },
    cookStatus: {
        marginTop: 20,
        width: responsiveWidth(90),
        backgroundColor: '#F1F3F5',
        padding: 20,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default OrderDetailItem;
