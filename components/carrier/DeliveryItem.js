/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DetailedDelivery from './DetailedDelivery';
import { COLORS, FONTS2, icons, SIZES } from '../../constants';

const DeliveryItem = ({ deliveryInfo, onPress }) => {
    const date = JSON.stringify(deliveryInfo.groupData.deliveryDateTime).substr(1,10);
    const time = JSON.stringify(deliveryInfo.groupData.deliveryDateTime).substr(12,5);

    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#e9ecef', padding: SIZES.base, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.base, marginVertical: SIZES.base * 0.5 }} >
                <View>
                    <Text style={{ ...FONTS2.body2, marginBottom: SIZES.base * 0.2 }}>
                        {date}      {time}
                    </Text>
                    
                    <View style={{ marginVertical: SIZES.base * 2 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.base * 0.3 }}>
                        {/* <Image source={icons.circle} resizeMode='contain' style={{ width: SIZES.base, height: SIZES.base, tintColor: '#74b816', marginRight: SIZES.base * 3 }} /> */}
                        <View>
                            <Text style={{ ...FONTS2.h3 }}>{deliveryInfo.storeData.storeName}</Text>
                        </View>
                    </View>

                    <Image source={icons.arrow} resizeMode='contain' style={{ width: SIZES.base * 1.5, height: SIZES.base * 2, tintColor: '#868e96', marginVertical: SIZES.base, marginLeft: SIZES.base }} />
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.base * 0.3 }}>
                        {/* <Image source={icons.circle} resizeMode='contain' style={{ width: SIZES.base, height: SIZES.base, tintColor: '#f03e3e', marginRight: SIZES.base * 3 }} /> */}
                        <View>
                            <Text style={{ ...FONTS2.h3 }}>{deliveryInfo.groupData.buildingName}</Text>
                        </View>
                    </View>
                    </View>
                
                </View>


                <View style={{ marginLeft: SIZES.width * 0.2, alignItems: 'center', justifyContent: 'center' }} >
                    <DetailedDelivery deliveryInfo={deliveryInfo} onPress={onPress} />

                    <TouchableOpacity
                        onPress={() => onPress(deliveryInfo.storeData.storeName,time,deliveryInfo.groupData.buildingName,deliveryInfo.groupData.groupId)}
                        style={{ backgroundColor: '#3897f1', width: SIZES.width * 0.25, height: SIZES.base * 4.5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: SIZES.base * 2 }}
                    >
                        <Text style={{ ...FONTS2.h4, color: COLORS.white }} >선택</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default DeliveryItem;
