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

import React,{ useState } from 'react';
import {View, Text, Switch, StyleSheet, Image} from 'react-native';
import {icons} from '../../constants';
import { useNavigation} from '@react-navigation/native';



export default function Store(props) {
    const storeData = props.storeData;
    const storeOrderStatus = storeData.storeOrderStatus;
    const [isStoreOpen, setIsStoreOpen] = useState(storeData.storeOpen);
    const toggleSwitch = () => setIsStoreOpen(previousState => !previousState);
    const navigation = useNavigation();
    return (
        <View style={styles.mainView} >
            <View style={styles.storeNameView}>
                <Image style={styles.storeNameImg} source={icons.hotdog}/>
                <Text style={styles.storeNameTxt}>{storeData.storeName}</Text>
            </View>
            <View style={styles.storeStatusView}>
                <Text style={styles.storeStatusTxt}>영업 시작</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value = {isStoreOpen}
                />
            </View>
            <View style={styles.storeOrderStatusMainView} >
                <Text style ={styles.storeOrderStatusMainTxt} >주문 현황</Text>
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
}

const styles = StyleSheet.create({
    mainView:{
        width:'90%',
        backgroundColor:'#e1e1e1',
        borderRadius: 5,
        borderColor: '#d8d8d8',
        borderWidth: 2,
        padding: 4,
        paddingLeft: 10,
        alignSelf: 'center',

    },
    storeNameView:{
        flexDirection: 'row',
        marginVertical: 15,
        marginHorizontal: 10,
    },
    storeNameImg:{
        marginHorizontal: 5,
        width: 65,
        height: 65,
    },
    storeNameTxt:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    storeStatusView:{
        flexDirection: 'row',
    },
    storeStatusTxt:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginVertical:15,
        marginRight: 15,
    },
    storeOrderStatusMainView:{

    },
    storeOrderStatusMainTxt:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:15,
    },
    storeOrderStatusSubView:{
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 5,
        marginBottom: 15,
    },
    storeOrderStatusSubDetailView:{
        alignItems:'center',
        marginHorizontal:20,
        padding:10,
    },
    storeOrderStatusSubDetailNumber:{
        fontWeight: 'bold',
        fontSize:17
    },
    storeOrderStatusSubDetailTxt:{
        fontWeight: 'bold',
        fontSize: 13,
    },

})