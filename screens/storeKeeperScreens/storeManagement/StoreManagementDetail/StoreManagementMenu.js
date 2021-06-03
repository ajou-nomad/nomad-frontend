/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView, Image, } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Header from '../../../../components/layout/Header';
import { COLORS, icons, FONTS2, SIZES } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';

import ModifyMenu from './ModifyMenu';

const FirstRoute = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const closeModal = () => {
        setModalVisible(!modalVisible);
    };

    const MenuItem = ({ menuName, cost }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SIZES.base * 3, paddingVertical: SIZES.base * 1.5, borderBottomWidth: 0.3 }}>
            <View>
                <Text style={{ ...FONTS2.h4 }}>{menuName}</Text>
                <Text style={{ ...FONTS2.body2 }}> · {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            </View>

            <TouchableOpacity
                style={{ justifyContent: 'center' }}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Image source={icons.more} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 2.5, }} />
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView>
            <View style={styles.menuMaanagementHeader}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu') }
                    style={styles.menuButton}>
                    <Text style={{ ...FONTS2.h4, color: COLORS.white }}>프로모션 메뉴추가</Text>
                </TouchableOpacity>
            </View>
            {route.menuData.map((menu, index) =>
                <MenuItem key={index} menuName={menu.menuName} cost={menu.cost} />
            )}

            <ModifyMenu modalVisible={modalVisible} closeModal={closeModal} />
        </ScrollView>
    );
};

const SecondRoute = ({ route }) => (
    <ScrollView>
        <Text>d</Text>
    </ScrollView>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const StoreManagementMenu = ({ navigation, route }) => {

    const [storeInfo, setStoreInfo] = useState(route.params.storeInfo);

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: '메뉴 관리', menuData: storeInfo.menu },
        { key: 'second', title: '정보 관리' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: 'black',
            }}
            style={{
                backgroundColor: 'white',
                elevation: 0,
                borderBottomColor: '#e9ecef',
                borderBottomWidth: 0.5,
            }}
            inactiveColor={COLORS.darkgray}
            activeColor={COLORS.black}
            pressColor='white'
            labelStyle={{ ...FONTS2.h4 }}
        />
    );

    return (
        <View style={styles.container}>
            <Header title='가게관리' small='true' />
            {/* 메뉴이름, 사진,  */}
            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    menuMaanagementHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.base * 2,
    },
    menuButton: {
        backgroundColor: '#3897f1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 1.5,
        paddingHorizontal: SIZES.width * 0.2,
        borderRadius: 8,
        marginVertical: SIZES.base * 1.5,
    },
});

export default StoreManagementMenu;
