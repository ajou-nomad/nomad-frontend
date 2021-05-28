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
        const [visibility,setVisibility] = useState(false);

    const renderDetailedDelivery = ({ item }) => {
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
                
                <View style={{ marginVertical: SIZES.base * 5, flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ ...FONTS2.h3, }}>배달 완료 시간 </Text>
                    <Text style={{ ...FONTS2.body2, }}> {item.groupData.time}</Text>
                </View>
                <DetailedOrder orderArray={item.orderArray} />
            </View>
        );
    };

    const button = () => {
        Alert.alert(
            '해당 배달을 선택하시겠습니까?',
            '',
            [
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                {
                    text: 'YES', onPress: () => {
                        setVisibility(!visibility);
                        alert('post: change to 배달 중');
                        navigation.navigate('ChatScreen', { thread: { '_id': 'GommT2R6HnHV5Ky34Ars', 'latestMessage': { 'createdAt': 1621420397090, 'text': '사진을 보냈습니다.' }, 'name': '빽다방 아주대점 팔달관 20:30' } });
                    }
                },
            ]
        );
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
                                <Image source={icons.close} resizeMode='contain' style={styles.closeButton} />
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
                            onPress={() => { button(); }}
                        >
                            <Text style={{ ...FONTS2.h3, color: COLORS.white, alignSelf: 'center' }} >선택</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={{ position: 'absolute', left: SIZES.width * 0.05, bottom: SIZES.height * 0.02 }} onPress={() => setVisibility(!visibility)}>
                <Image source={icons.more} resizeMode='contain' style={{ width: SIZES.base * 2.3, height: SIZES.base * 2.3, tintColor: '#868e96', }} />
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
        width: SIZES.base * 2,
        height: SIZES.base * 2,
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
});
