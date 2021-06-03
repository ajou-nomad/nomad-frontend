/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */


import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    useWindowDimensions,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

import StoreItem from '../../components/item/StoreItem';
import { COLORS, FONTS2, SIZES, icons, FONTS, FONTS3 } from '../../constants';


const StoreList = ({storeData, deliveryPlace, deliDate, datePicker}) => {


    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: '일반', storeData: storeData, deliveryPlace: deliveryPlace, deliDate: deliDate, datePicker: datePicker },
        { key: 'second', title: '프로 모션', storeData: storeData, deliveryPlace: deliveryPlace, deliDate: deliDate, datePicker: datePicker },
    ]);


    const FirstRoute = ({ route }) => {

        return (
            <ScrollView>
                <View style={{ flex: 1,  }}>
                    {route.storeData.map((storeItems, index) => {
                    return <StoreItem key={index} storeData={storeItems} deliveryPlace={route.deliveryPlace} deliDate={route.deliDate} datePicker={route.datePicker} />;
                })}
                </View>
            </ScrollView>
        );
    };

    const SecondRoute = ({ route }) => {


        const filteredData = route.storeData.filter(store => (store.promotion === 'On'));

        return (
            <ScrollView>
                {filteredData.map((storeItem, index) => {
                    return (
                        <TouchableOpacity key={index} style={styles.promotionContainer} onPress={() => navigation.navigate('Promotion', { storeData: route.storeData, deliveryPlace: route.deliveryPlace, deliDate: route.deliDate, datePicker: route.datePicker } )}>
                            <View style={styles.logoImageContainer}>
                                <Image
                                    source={{ uri: storeItem.logoUrl }}
                                    resizeMode='contain'
                                    style={{
                                        width: 55,
                                        height: 55,
                                        alignSelf: 'center',
                                    }}
                                />
                            </View>

                            <View style={{ alignSelf: 'center', marginLeft: 5, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginRight: SIZES.base }}>{storeItem.storeName}</Text>
                                    <View style={{ borderWidth: 0.3, borderColor: '#e03131', borderRadius: 8, flexDirection: 'row', paddingHorizontal: SIZES.base, backgroundColor: '#e03131' }}>
                                        <Image source={icons.promotion} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#fff', alignSelf: 'center' }} />
                                        <Text style={{ ...FONTS2.body4, color: '#fff' }}>프로모션</Text>
                                    </View>
                                </View>

                                <Text style={{ ...FONTS2.body3 }}>{storeItem.promotionMenuDto.promotionMenuName}</Text>
                                <Text style={{ ...FONTS2.body3 }}>{storeItem.promotionMenuDto.promotionDescription}</Text>
                                <Text style={{ ...FONTS2.body3 }}>{storeItem.promotionMenuDto.cost}원</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}

            </ScrollView>
        );
    };

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });



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
            labelStyle={{ ...FONTS3.h4 }}
        />
    );






    return (
        <View style={{ flex: 5, backgroundColor: 'white' }}>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    promotionContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        borderBottomWidth: 0.6,
        borderBottomColor: '#e9ecef',
    },
    location: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.3,
        borderRadius: 20,
        marginHorizontal: SIZES.width * 0.06,
        paddingVertical: SIZES.base * 0.5,
        borderColor: '#adb5bd',
    },
    destinationHeader: {
        position: 'absolute',
        top: SIZES.height * 0.05,
        left: 0,
        right: 0,
        height: 50,
        alignItems: 'center',
        flex: 1,
    },
    destinationHeaderView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width * 0.65,
        paddingVertical: SIZES.padding * 0.5,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        elevation: 5,
        opacity: 0.9,
    },
    selectButton: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        // borderWidth: 0.5,
        borderRadius: 8,
        borderColor: '#707070',
        marginRight: 15,
        alignSelf: 'center',
        backgroundColor: COLORS.lightGray,
    },
    logoImageContainer: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ced4da',
        width: SIZES.width * 0.18,
        height: SIZES.height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        marginRight: 3,
    },
});

export default StoreList;
