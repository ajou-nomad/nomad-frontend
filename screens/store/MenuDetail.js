/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
    FlatList,
    Image,
    SafeAreaView,
} from 'react-native';

import { COLORS, FONTS2, } from '../../constants';

import Counter from 'react-native-counters';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultTheme, Checkbox } from 'react-native-paper';

import BottomButton from '../../components/layout/BottomButton';

// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();//Ignore all log notifications

// 옵션 선택 컴포넌트
const Option = ({ item, userOption, setUserOption }) => {
    // 유저가 선택한 옵션 항목들 => 전역 상태?
    const [selectOption, setSelectOption] = useState([]);
    const [isSelect, setIsselect] = useState(false);

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: 'tomato',
            accent: 'red',
        },
    };



    return (
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            {/* <TouchableOpacity
                onPress={() => {
                    setIsselect(!isSelect);
                    if (isSelect === false) {
                        console.log('here:------- ', isSelect);
                        // 선택 취소한 경우 삭제
                        setUserOption(userOption.filter(user => user !== item.id));
                    } else {
                        // 선택한 경우 배열에 추가
                        setUserOption([...userOption, item.id ]);
                    }
                }}
            >
                <Image
                    source={icons.checkbox}
                    resizeMode='contain'
                    style={{
                        width: 23,
                        height: 23,
                        marginRight: 10,
                        tintColor: isSelect ? 'red' : COLORS.secondary,
                    }}
                />
            </TouchableOpacity> */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    status={isSelect ? 'checked' : 'unchecked'}
                    onPress={() => { setIsselect(!isSelect); }}
                    theme={theme}
                />
                <Text style={{ ...FONTS2.body2, }}>{item.flavor}</Text>
            </View>
        </View>
    );
};

function MenuDetail({ navigation, route:{params} }) {

    const menu = params.menu;

    // 메뉴 정보
    const [menuDetail] = useState({
        menuId: menu.menuId,
        photo: menu.imgUrl,
        menuName: menu.menuName,
        description: menu.description,
        price: menu.cost,
        flavors: [
            {
                id: '1',
                flavor: '31요거트',
            },
            {
                id: '2',
                flavor: '엄마는 외계인',
            },
            {
                id: '3',
                flavor: '베리베리 스트로베리',
            },
            {
                id: '4',
                flavor: '31요거트',
            },
            {
                id: '5',
                flavor: '엄마는 외계인',
            },
            {
                id: '6',
                flavor: '베리베리 스트로베리',
            },
            {
                id: '7',
                flavor: '31요거트',
            },
            {
                id: '8',
                flavor: '엄마는 외계인',
            },
            {
                id: '9',
                flavor: '베리베리 스트로베리',
            },
            {
                id: '10',
                flavor: '31요거트',
            },
            {
                id: '11',
                flavor: '엄마는 외계인',
            },
            {
                id: '12',
                flavor: '베리베리 스트로베리',
            },
            {
                id: '13',
                flavor: '엄마는 외계인',
            },
            {
                id: '14',
                flavor: '베리베리 스트로베리',
            },
            {
                id: '15',
                flavor: '31요거트',
            },
            {
                id: '16',
                flavor: '엄마는 외계인',
            },
            {
                id: '17',
                flavor: '베리베리 스트로베리',
            },
        ],
        quantity: 3,
    });

    // 최종 금액
    const [totalPrice, setTotalPrice] = useState(menuDetail.price);


    // 총 가격 계산
    const handleTotalPrice = (number, type) => {
        if (type === '+') {
            setTotalPrice(totalPrice + menuDetail.price);
        }
        else {
            setTotalPrice(totalPrice - menuDetail.price);
        }
    };

    // console.log(params);
    const addCart = () => {

        const addedItem = {
            menuId: menuDetail.menuId,
            menuName: menuDetail.menuName,
            quantity: totalPrice / menuDetail.price,
            cost: totalPrice,
        };
        navigation.navigate('StoreDetail', { storeName: params.storeName, time: params.time, location: params.location, post: addedItem });
    };

    const renderBody = () => {
        return (
            <View>
                {/* 사진, 메뉴이름, 설명 */}
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {/* 음식 사진 */}
                    <Image
                        source={{ uri: menuDetail.photo }}
                        resizeMode='contain'
                        style={{
                            width: 300,
                            height: 300,
                        }}
                    />
                    {/* 메뉴 이름 */}
                    <Text style={{ ...FONTS2.h1, margin: 10 }}>{menuDetail.menuName}</Text>
                    {/* 메뉴 설명 */}
                    <View style={{ width: '80%', }}>
                        <Text style={{ ...FONTS2.body2 }}>{menuDetail.description}</Text>
                    </View>
                </View>

                
                <View style={{ marginHorizontal: 25, marginTop: 15 }}>
                    {/* 가격 */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>가격</Text>
                        {/* useState로 price update */}
                        <Text style={{ ...FONTS2.h2, }}>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                    {/* 수량 */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 50 }}>
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>수량</Text>
                        {/* useState로 수량 update */}
                        <Counter
                            start={1}
                            min={1}
                            buttonTextStyle={{ color: 'black', ...FONTS2.h2 }}
                            buttonStyle={{ borderColor: 'black' }}
                            countTextStyle={{ color: 'black', ...FONTS2.h2 }}
                            onChange={handleTotalPrice}
                        />
                    </View>
                
                    {/* 맛 선택 */}
                    {/* <View style={{ borderTopWidth: 0.5, marginTop: 10, }}>
                        <Text style={{ ...FONTS2.h2, marginTop: 10 }}>맛 선택 ({menuDetail.quantity}개)</Text>
                        <FlatList
                            data={menuDetail.flavors}
                            renderItem={({ item }) => {
                                return (
                                    <Option
                                        item={item}
                                        userOption={userOption}
                                        setUserOption={setUserOption}
                                    />
                                );
                            }}
                            style={{ marginTop: 10, }}
                            keyExtractor={item => item.id}
                        />
                    </View> */}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex: 5, }}>
                {renderBody()}
            </ScrollView>
            <BottomButton title='카트에 담기' small='true' onPress={() => addCart()}/>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        marginTop: 200,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: 200,
        resizeMode: 'cover',
    },
});

export default MenuDetail;
