/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React,{ useState } from 'react';
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS2, images, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import ToggleSwitch from 'toggle-switch-react-native';

const Store = (props) => {
    const storeData = props.storeData;
    const storeOrderStatus = storeData.storeOrderStatus;
    const [startSales, setStartSales] = useState(storeData.storeOpen);

    console.log('ss', JSON.stringify(storeData, null, 4));

    return (
        <View style={styles.mainView} >
            <View style={styles.storeNameView}>
                <Image style={styles.storeNameImg} source={{uri: storeData.logoUrl}} />
                <Text style={{ ...FONTS2.h3, marginLeft: 15 }}>{storeData.storeName}</Text>
            </View>

            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: SIZES.base }}>
                    <Text style={{ ...FONTS2.h3, marginRight: SIZES.base }}>영업 시작</Text>
                    <ToggleSwitch
                        isOn={startSales}
                        onColor="red"
                        offColor="gray"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="medium"
                        onToggle={isOn => setStartSales(isOn)}
                    />
                </View>

                <Text style={{ ...FONTS2.h3, marginVertical: SIZES.base }} >주문 현황</Text>
                <View style={styles.storeStatusView}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...FONTS2.body3 }}>접수 대기</Text>
                        <Text style={{...FONTS2.h2 }}>{storeOrderStatus.Todo}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...FONTS2.body3 }}>진행 중</Text>
                        <Text style={{...FONTS2.h2 }}>{storeOrderStatus.InProgress}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...FONTS2.body3 }}>배달 완료</Text>
                        <Text style={{...FONTS2.h2 }}>{storeOrderStatus.Complete}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        marginTop: SIZES.base * 2,
        width: responsiveWidth(90),
        backgroundColor: '#F1F3F5',
        borderRadius: 5,
        borderColor: '#d8d8d8',
        borderWidth: 0.3,
        padding: 10,
        paddingLeft: SIZES.base * 2,
        alignSelf: 'center',

    },
    storeNameView: {
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center',
    },
    storeNameImg: {
        width: 65,
        height: 65,
    },
    storeStatusView: {
        backgroundColor: COLORS.white,
        width: SIZES.width * 0.8,
        height: SIZES.height * 0.1,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.base * 3
    },
    storeOrderStatusSubView: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 5,
        marginBottom: 15,
    },
    storeOrderStatusSubDetailView: {
        alignItems: 'center',
        marginHorizontal: 20,
        padding: 10,
    },
    storeOrderStatusSubDetailNumber: {
        fontWeight: 'bold',
        fontSize: 17,
    },

});

export default Store;
