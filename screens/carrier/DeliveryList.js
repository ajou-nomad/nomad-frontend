/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import { View, Text, useWindowDimensions, ScrollView, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, FONTS2, icons, SIZES } from '../../constants';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import DeliveryItem from '../../components/carrier/DeliveryItem';

const FirstRoute = ({ route }) => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {/* <DeliveryItem /> */}
        </ScrollView>
    );
};

const SecondRoute = ({route}) => (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
    </ScrollView>
);


const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const DeliveryList = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: '진행 중', },
        { key: 'second', title: '배달 완료',},
    ]);

    const navigation = useNavigation();


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

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: responsiveHeight(10), borderBottomWidth: 0.3, borderBottomColor: '#adb5bd',}}>
				<TouchableOpacity  style={{ position: 'absolute', left: 0, marginLeft: SIZES.base * 2, }} onPress={() => navigation.openDrawer()}>
					<Image source={icons.menu} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 3  }} />
				</TouchableOpacity>
				<Text style={{ ...FONTS2.h2 }} >배달 현황</Text>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};

export default DeliveryList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    }
})