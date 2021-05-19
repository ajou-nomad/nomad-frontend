/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Store from '../../../components/store/Store';
import StoreManagementDetail from './StoreManagementDetail';

const StoreManagementMain = () => {
     /*FlatList로 변경 필요 */
     /* .Get("/storeData") */

     const storeData = {
         storeName: '빽다방 아주대점',
         storeOpen: false,
         storeOrderStatus: {
             Todo: 10,
             InProgress: 5,
             Complete: 25,
         }
     }

    return (
        <View>
            <Text style={styles.header} >매장 관리</Text>
            <Store storeData={storeData} />
            <StoreManagementDetail />
        </View>
    );
};

const styles=  StyleSheet.create({
    header:{
        fontWeight: 'bold' ,
        fontSize: 25,
        borderBottomWidth:2,
        borderBottomColor:'#000',
        width: '95%',
        alignSelf:'center',
        textAlign:'center',
        paddingVertical:10,
        marginBottom:12},
})

export default StoreManagementMain;
