/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    useWindowDimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { FONTS2, icons, COLORS } from '../../constants';


import { responsiveWidth } from 'react-native-responsive-dimensions';


import Menu from '../../components/item/Menu';
import CartButton from '../../components/CartButton';
import Review from '../../screens/review/Review';
import StoreInfo from './StoreInfo';

// 메뉴 (flatlist로 바꾸기)
const MenuRoute = ({ route }) => {
    const { logoUrl, menu } = route.item;

    const renderItem = ({ item }) => {
        return (
            <Menu item={item} />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView>
                <FlatList data={menu} keyExtractor={item => item.menuId} renderItem={renderItem} />
                {/* <Menu time={route.time} location={route.location} storeName={route.storeName} /> */}
            </ScrollView>
        </SafeAreaView>
    );
};

// 매장 정보
const StoreInfoRoute = ({ route }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
            <ScrollView>
                <StoreInfo item={route.item} />
            </ScrollView>
        </SafeAreaView>
    );
};

// 리뷰
const ReviewRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
        <Review />
    </ScrollView>
);

const renderScene = SceneMap({
    first: MenuRoute,
    second: StoreInfoRoute,
    third: ReviewRoute,
});

function StoreDetail({ route }) {
    const { deliDate, deliveryPlace, time, item } = route.params;


    // console.log('ddd', route.params);

    // const storeInfo = {
    //     'address': route.params.item.address,
    //     'closeTime': route.params.item.closeTime,
    //     'deliveryTip': route.params.item.deliveryTip,
    //     'latitude': route.params.item.latitude,
    //     'logoUrl': route.params.item.logoUrl,
    //     'longitude': route.params.item.longitude,
    //     'openTime': route.params.item.openTime,
    //     'phoneNumber': route.params.item.phoneNumber,
    //     'storeId': route.params.item.storeId,
    //     'storeName': route.params.item.storeName,
    // };

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: '메뉴', time: time, /*location: deliveryPlace, */ item: item },
        { key: 'second', title: '매장 정보', item: item },
        { key: 'third', title: '리뷰' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: COLORS.tertiary,
                height: '80%',
                borderRadius: 20,
            }}
            style={{ backgroundColor: COLORS.white }}
            inactiveColor={COLORS.darkgray}
            activeColor={COLORS.black}
            labelStyle={{ ...FONTS2.body2 }}
        />
    );

    const renderHeader = () => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    justifyContent: 'flex-end',
                }}
            >
                <View
                    style={styles.headerBox}>
                    <Text style={{ ...FONTS2.h1 }}>{item.storeName}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 3, alignSelf: 'center' }}>
                        <Image
                            source={icons.star}
                            resizeMode="contain"
                            style={{
                                width: 23,
                                height: 23,
                                marginRight: 5,
                            }}
                        />
                        <Text style={{ ...FONTS2.body2 }}>4.2 </Text>
                        <Text style={{ ...FONTS2.body2 }}>(50+)</Text>
                    </View>
                </View>

                <View style={{ width: '60%', backgroundColor: 'white', alignSelf: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS2.body2 }}>최소주문금액</Text>
                        <Text style={{ ...FONTS2.body2 }}>13,500원</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS2.body2 }}>배달팁</Text>
                        <Text style={{ ...FONTS2.body2 }}>2,000원</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={{ ...FONTS2.body2, color: 'blue' }}>매장 생성 그룹 보기</Text>
                    </TouchableOpacity>
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
                    backgroundColor: COLORS.secondary,
                }}
            >
                {/* TabView 들어갈 곳 */}
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
            <CartButton items={route.params.items} deliDate={route.params.deliDate} time={route.params.time} deliveryPlace={route.params.deliveryPlace} storeName={route.params.storeName} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBox: {
        alignSelf: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#adb5bd',
        borderBottomRightRadius: 20,
        marginBottom: 10,
        width: responsiveWidth(70),
        alignItems: 'center',
    },
});

export default StoreDetail;
