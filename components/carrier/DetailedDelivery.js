/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React, {useState} from 'react';
import { View, Text, Alert, TouchableOpacity, FlatList, Modal, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DetailedOrder from './DetailedOrder';
import { COLORS, FONTS2, icons, SIZES } from '../../constants';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


export default function DetailedDelivery(props) {
    const modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
        const navigation = useNavigation();
        const deliveryInfo = props.deliveryInfo;
        const button = props.onPress;
        const [visibility,setVisibility] = useState(false);

    const renderDetailedDelivery = ({ item }) => {
        const deliveryTime = JSON.stringify(item.groupData.deliveryDateTime).substr(12,5);
        return (
            <View style={{ margin: SIZES.base * 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.base * 3, marginLeft: SIZES.base * 0.3 }}>
                    <Image source={icons.circle} resizeMode='contain' style={{ width: SIZES.base, height: SIZES.base, tintColor: '#74b816', marginRight: SIZES.base * 3 }} />
                    <View>
                        <Text style={{ ...FONTS2.h3, textAlign: 'left' }}>{item.storeData.storeName}</Text>
                        <Text style={{ ...FONTS2.body3, textAlign: 'left' }}>{item.storeData.address}</Text>
                    </View>
                </View>

                <Image source={icons.arrow} resizeMode='contain' style={{ width: SIZES.base * 1.5, height: SIZES.base * 1.5, tintColor: '#868e96', marginRight: SIZES.base * 3 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base * 3, marginLeft: SIZES.base * 0.3 }}>
                    <Image source={icons.circle} resizeMode='contain' style={{ width: SIZES.base, height: SIZES.base, tintColor: '#f03e3e', marginRight: SIZES.base * 3 }} />
                    <View>
                        <Text style={{ ...FONTS2.h3, textAlign: 'left' }}>{item.groupData.buildingName}</Text>
                        <Text style={{ ...FONTS2.body3, textAlign: 'left'  }}>{item.groupData.address}</Text>
                    </View>
                </View>

                <View style={{ marginVertical: SIZES.base * 5, alignItems: 'center', }}>
                    <Text style={{ ...FONTS2.h3, }}>배달 완료 시간 </Text>
                    <Text style={styles.deliveryTime}>{deliveryTime} 까지</Text>
                </View>
                {/* <DetailedOrder orderArray={item.orderArray} /> */}
            </View>
        );
    };

    const buttonDeDe = () => {
        const deliveryTime = JSON.stringify(props.deliveryInfo.groupData.deliveryDateTime).substr(12,5);
        setVisibility(!visibility);
        button(deliveryInfo.storeData.storeName,deliveryTime,deliveryInfo.groupData.buildingName,deliveryInfo.groupData.groupId);
    };

    return (
        <View>
            <Modal
                visible={visibility}
                animationType="slide"
                transparent={true}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={styles.modal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.3, justifyContent: 'center', paddingVertical: SIZES.height * 0.02 }}>
                            <TouchableOpacity onPress={() => setVisibility(!visibility)} style={{ position: 'absolute', left: SIZES.base * 2 }}>
                                <Image source={icons.close} resizeMode="contain" style={styles.closeButton} />
                            </TouchableOpacity>
                            <Text style={{ ...FONTS2.h3, }}>상세 정보</Text>
                        </View>
                        <FlatList
                            data={[deliveryInfo]}
                            renderItem={renderDetailedDelivery}
                            keyExtractor={item => item.groupData.groupId.toString()}
                        />
                        <TouchableOpacity
                            style={{ alignSelf: 'center', backgroundColor: '#3897f1', borderRadius: 8, height: SIZES.height * 0.08, width: SIZES.width * 0.7, justifyContent: 'center', marginBottom: SIZES.base * 2 }}
                            onPress={() => { buttonDeDe(); }}
                        >
                            <Text style={{ ...FONTS2.h3, color: COLORS.white, alignSelf: 'center' }} >선택</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={{ position: 'absolute', left: SIZES.width * 0.05, bottom: SIZES.height * 0.02 }} onPress={() => setVisibility(!visibility)}>
                <Image source={icons.more} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 2.5, tintColor: '#868e96',  }} />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    closeButton: {
        width: SIZES.base * 2.5,
        height: SIZES.base * 2.5,
        tintColor: COLORS.darkgray,
    },
    modal: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        height: responsiveHeight(75),
        width: responsiveWidth(85),
        alignSelf: 'center',
        marginTop: SIZES.padding,
    },
    deliveryTime: {
        ...FONTS2.body2,
        padding:10,
        borderWidth:3,
        textAlign:'center',
        textAlignVertical:'center',
        borderColor: '#3897f1',
    }
});
