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
    Image
} from 'react-native';
import StoreItem from '../../components/item/StoreItem';
import Header from '../../components/layout/Header';
import { COLORS, FONTS2, SIZES, icons, FONTS } from '../../constants';

import axiosApiInstance from '../../utils/axios';

import { responsiveWidth } from 'react-native-responsive-dimensions';
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
                <Header title="배달 그룹 생성" small="true" />
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
                    <ScrollView>
                        {storeData.map((storeItems, index) => {
                            return <StoreItem key={index} storeData={storeItems} deliveryPlace={deliveryPlace} deliDate={deliDate} datePicker={datePicker} />;
                        })}
                    </ScrollView>
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
    location: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SIZES.base * 1.5,
        borderWidth: 0.3,
        borderRadius: 20,
        marginHorizontal: SIZES.width * 0.06,
        paddingVertical: SIZES.base * 0.5,
        borderColor: '#adb5bd',
        // backgroundColor: '#c1c1c1'
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
});

export default CreateGroupList;
