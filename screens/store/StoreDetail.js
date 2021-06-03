/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    useWindowDimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    ToastAndroid,
    Animated,
    FlatList,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { FONTS2, icons, COLORS, SIZES } from '../../constants';


import { responsiveWidth } from 'react-native-responsive-dimensions';


import Menu from '../../components/item/Menu';
import CartButton from '../../components/CartButton';
import StoreInfo from './StoreInfo';
import ReviewItem from '../../components/item/ReviewItem';


// 메뉴 (flatlist로 바꾸기)
const MenuRoute = ({ route }) => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {route.menu.map((items, index) => {
                    return (
                        <Menu key={index} menu={items} time={route.time} location={route.location} storeName={route.storeName} />
                    );
                })}
        </ScrollView>
    );
};

// 매장 정보
const StoreInfoRoute = ({ route }) => (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
        <StoreInfo storeInfo={route.storeInfo} />
    </ScrollView>
);

// 리뷰
const ReviewRoute = ({ route }) => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 15, paddingBottom: SIZES.base * 6,  }}>
            <Text style={{ ...FONTS2.h2, margin: 20, }}>리뷰 {route.storeReview.length}개</Text>
            {route.storeReview.map((item, index) => {
                return (
                    <ReviewItem key={index} item={item} />
                );
            })}
        </ScrollView>
    );
};

const renderScene = SceneMap({
    first: MenuRoute,
    second: StoreInfoRoute,
    third: ReviewRoute,
});

function StoreDetail({ route }) {
    const groupData = route.params.groupData;
    const storeInfo = route.params.storeInfo;
    const datePicker = route.params.datePicker;

    // console.log(JSON.stringify(groupData,null,4))

    const [cartItems, setCartItems] = useState([]);


    const menu = storeInfo.menu;
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: '메뉴', setCartItems: setCartItems, menu: menu ,time: route.params.time, location: route.params.deliveryPlace, storeName: storeInfo.storeName},
        { key: 'second', title: '매장 정보', storeInfo: storeInfo},
        { key: 'third', title: '리뷰', storeReview: route.params.storeInfo.reviewList },
    ]);

    const offset = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // MenuDetail에서 담긴 아이템 navigation props로 전달.
        if (route.params?.post){

            ToastAndroid.showWithGravity('카트에 담겼습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            setCartItems((prevState)=>[...prevState, route.params?.post]);
        }
    }, [route.params?.post]);



    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{
                // backgroundColor: '#339af0',
                // opacity: 0.6,
                backgroundColor: COLORS.black,
            }}
            style={{ backgroundColor: COLORS.white, elevation: 0, borderBottomWidth: 0.3, }}
            inactiveColor={COLORS.darkgray}
            activeColor={COLORS.black}
            labelStyle={{ ...FONTS2.body3 }}
            pressColor='white'
            // ref={}
        />
    );

    const renderHeader = () => {
        return (
            <View
                style={{
                    backgroundColor: COLORS.white,
                    paddingTop: 30,
                }}
            >
                <View style={[styles.headerContainer,{width: SIZES.width * 0.75}]}>
                    <Text style={{ ...FONTS2.h1 }}>{storeInfo.storeName}</Text>
                    <View style={{ marginTop: SIZES.base }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                source={icons.star}
                                resizeMode="contain"
                                style={{
                                    width: SIZES.base * 2,
                                    height: SIZES.base * 2,
                                    marginRight: SIZES.base * 0.5,
                                }}
                            />
                            {/* <Text style={{ ...FONTS2.body3 }}>{storeInfo.rate} / 5.0</Text> */}
                            <Text style={{ ...FONTS2.body3 }}>({storeInfo.reviewList.length}+)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={icons.clock} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#000000' }} />
                            <Text style={{ ...FONTS2.body3, color: '#000000' }}>운영시간 {storeInfo.openTime} ~ {storeInfo.closeTime}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={icons.bell} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#000000', }} />
                            <Text style={{ ...FONTS2.body3, color: '#000000' }}>배달팁 {storeInfo.deliveryTip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            {/* 탭(메뉴, 매장 정보, 리뷰) */}
            <View
                style={{
                    flex: 2,
                }}
            >
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
            <CartButton datePicker={datePicker} cartItems={cartItems} storeInfo={route.params.storeInfo} deliDate={route.params.deliDate} time={route.params.time} deliveryPlace={route.params.deliveryPlace} groupData={route.params.groupData} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        alignSelf: 'center',
        padding: 15,
        // borderWidth: 1,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 5,
        borderColor: '#adb5bd',
        // borderBottomRightRadius: 20,
        borderRadius: 10,
        marginBottom: 15,
        width: responsiveWidth(70),
        alignItems: 'center',
    },
});

export default StoreDetail;