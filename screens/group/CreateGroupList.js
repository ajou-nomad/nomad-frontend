/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    useWindowDimensions,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import StoreItem from '../../components/item/StoreItem';
import Header from '../../components/layout/Header';
import { COLORS, FONTS2, SIZES, icons, FONTS, FONTS3 } from '../../constants';

import axiosApiInstance from '../../utils/axios';

import MiniMap from '../../components/map/MiniMap';
import SelectButton from '../../components/layout/SelectButton';
import BackButton from '../../components/layout/BackButton';


function CreateGroupList({ navigation, route }) {
    
    //route.params.initLocation.buildingName존재 시 배달장소를 선택할 필요x
    const [isSelected, setIsSelected] = useState(route.params.initLocation.buildingName ? true : false);
    const [deliveryPlace, setDeliveryPlace] = useState(route.params.initLocation.buildingName ? route.params.initLocation : '');
    const deliDate = route.params.deliDate;
    const datePicker = route.params.datePicker;
    const storeData = route.params.storeData;

    const onPlaceChange = (region) => {
        setDeliveryPlace(region);
    };

    
    const FirstRoute = ({ route }) => {
        return (
            <ScrollView>
                {route.storeData.map((storeItems, index) => {
                    return <StoreItem key={index} storeData={storeItems} deliveryPlace={route.deliveryPlace} deliDate={route.deliDate} datePicker={route.datePicker} />;
                })}
            </ScrollView>
        );
    };

    const SecondRoute = ({ route }) => {
        return (
            <ScrollView>
                {route.storeData.map((storeItems, index) => {
                    return (
                        <TouchableOpacity style={styles.promotionContainer} onPress={() => navigation.navigate('Promotion', { storeData: route.storeData })}>
                            <View style={styles.logoImageContainer}>
                                <Image
                                    source={{ uri: storeItems.logoUrl }}
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
                                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginRight: SIZES.base }}>{storeItems.storeName}</Text>
                                    <View style={{ borderWidth: 0.3, borderColor: '#e03131', borderRadius: 8, flexDirection: 'row', paddingHorizontal: SIZES.base, backgroundColor: '#e03131' }}>
                                        <Image source={icons.promotion} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#fff', alignSelf: 'center' }} />
                                        <Text style={{ ...FONTS2.body4, color: '#fff' }}>프로모션</Text>
                                    </View>
                                </View>

                
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, }}>
                                    <Image
                                        source={icons.star}
                                        resizeMode='contain'
                                        style={{
                                            width: SIZES.base * 1.6,
                                            height: SIZES.base * 1.6,
                                            marginRight: SIZES.base * 0.5,
                                        }}
                                    />
                                    <Text style={{ ...FONTS2.body3, }}>{storeItems.rate} </Text>
                                    <Text style={{ ...FONTS2.body3, marginRight: SIZES.base * 0.5 }}>(50+), </Text>

                                    <Text style={{ ...FONTS2.body3, color: '#000000' }}>배달팁 {storeItems.deliveryTip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icons.clock} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#000000' }} />
                                    <Text style={{ ...FONTS2.body3, color: '#000000' }}>운영시간 {storeItems.openTime} ~ {storeItems.closeTime}</Text>
                                </View>
                
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icons.bell} resizeMode='contain' style={{ width: SIZES.base * 1.6, height: SIZES.base * 1.6, marginRight: SIZES.base * 0.5, tintColor: '#000000', }} />
                                    <Text style={{ ...FONTS2.body3, color: '#000000' }}>{storeItems.storeIntro}</Text>
                                </View>
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

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: '안 프로모션', storeData: storeData, deliveryPlace: deliveryPlace, deliDate: deliDate, datePicker: datePicker },
        { key: 'second', title: '프로 모션', storeData: storeData, },
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
            labelStyle={{ ...FONTS3.h4 }}
        />
    );

    const renderDestinationHeader = () => {
        return (
          <TouchableOpacity
            disable
            style={styles.destinationHeader}
          >
            <View style={styles.destinationHeaderView}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginHorizontal:  30,
                }}>
                <Text style={{...FONTS2.body5}}>{'배달 받을 위치를 설정하세요.'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
    };

    const chooseDeliveryPlace = () => {
        return (
            <View style={{ flex: 1 }}>
                <MiniMap location={route.params.initLocation} onPlaceChange={onPlaceChange} />
                {/* Header */}
                { renderDestinationHeader() }
                {/* back button */}
                <BackButton imageStyle={{ opacity: 0.8, height: 17, width: 17}} position={{left: SIZES.width * 0.04, top: SIZES.height * 0.03}} />
                {/* selectButton */}
                <SelectButton navigation={navigation} deliveryPlace={deliveryPlace} setDeliveryPlace={setDeliveryPlace} setIsSelected={setIsSelected} />
            </View>
        );
    };

    const haveLocation = () => {
        return (
            <View style={{ flex: 4, backgroundColor: 'white' }}>
                <Header title="배달 그룹 생성" small="true" createGroupList="true" />
                <View style={styles.location}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}
                    >
                        <Image source={icons.pin} resizeMode='contain' style={{ width: 24, height: 24, marginRight: SIZES.base, }} />
                        <Text style={{ ...FONTS2.body3, color: 'black' }}>{deliveryPlace?.address}</Text>
                    </View>
                </View>
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
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Body */}
            { isSelected ? haveLocation() : chooseDeliveryPlace()  }
        </SafeAreaView>
    );
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

export default CreateGroupList;
