/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React,{ useState } from 'react';
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
import { FONTS2, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ToggleSwitch from 'toggle-switch-react-native';

const Store = (props) => {
    const storeData = props.storeData;
    const storeOrderStatus = storeData.storeOrderStatus;
    const [isStoreOpen, setIsStoreOpen] = useState(storeData.storeOpen);
    const toggleSwitch = () => setIsStoreOpen(previousState => !previousState);
    const navigation = useNavigation();

    return (
        <View style={styles.mainView} >
            <View style={styles.storeNameView}>
                <Image style={styles.storeNameImg} source={images.store_logo} />
                <Text style={{ ...FONTS2.h3 }}>{storeData.storeName}</Text>
            </View>
            <View style={styles.storeStatusView}>
                <Text style={styles.storeStatusTxt}>영업 시작</Text>
                {/* <Switch
                    onValueChange={toggleSwitch}
                    value={isStoreOpen}
                /> */}
                <ToggleSwitch
                    isOn={false}
                    onColor="green"
                    offColor="red"
                    label="Example label"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="large"
                    onToggle={isOn => console.log("changed to : ", isOn)}
                />
            </View>
            <View style={styles.storeOrderStatusMainView} >
                <Text style={styles.storeOrderStatusMainTxt} >주문 현황</Text>
                <View style={styles.storeOrderStatusSubView} >
                    <View style={styles.storeOrderStatusSubDetailView}>
                        <Text style={styles.storeOrderStatusSubDetailNumber} >{storeOrderStatus.Todo}</Text>
                        <Text style={styles.storeOrderStatusSubDetailTxt} >접수 대기</Text>
                    </View>
                    <View style={styles.storeOrderStatusSubDetailView}>
                        <Text style={styles.storeOrderStatusSubDetailNumber} >{storeOrderStatus.InProgress}</Text>
                        <Text style={styles.storeOrderStatusSubDetailTxt} >진행 중</Text>
                    </View>
                    <View style={styles.storeOrderStatusSubDetailView}>
                        <Text style={styles.storeOrderStatusSubDetailNumber} >{storeOrderStatus.Complete}</Text>
                        <Text style={styles.storeOrderStatusSubDetailTxt} >배달 완료</Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        marginTop: 20,
        width: responsiveWidth(90),
        backgroundColor: '#F1F3F5',
        borderRadius: 5,
        borderColor: '#d8d8d8',
        borderWidth: 0.3,
        padding: 4,
        paddingLeft: 10,
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    storeNameView: {
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center',
    },
    storeNameImg: {
        marginHorizontal: 5,
        width: 65,
        height: 65,
    },
    storeStatusView: {
        flexDirection: 'row',
    },
    storeStatusTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginVertical: 15,
        marginRight: 15,
    },
    storeOrderStatusMainView: {

    },
    storeOrderStatusMainTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
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
        fontSize: 17
    },
    storeOrderStatusSubDetailTxt: {
        fontWeight: 'bold',
        fontSize: 13,
    },

});

export default Store;
