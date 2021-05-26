/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Store from '../../../components/store/Store';
import StoreManagementDetail from './StoreManagementDetail';
import { logout } from '../../../utils/helper';
import { AuthContext } from '../../../context/AuthContextProvider';
import Header from '../../../components/layout/Header';
import { COLORS, FONTS2 } from '../../../constants';

const StoreManagementMain = () => {
    /*FlatList로 변경 필요 */
    /* .Get("/storeData") */
    
    const { state, dispatch } = useContext(AuthContext);

    const signOutGoogle = async () => {

        logout(dispatch);
    };

    const storeData = {
        storeName: '빽다방 아주대점',
        storeOpen: false,
        storeOrderStatus: {
            Todo: 10,
            InProgress: 5,
            Complete: 25,
        },
    };

    return (
        <View style={styles.container}>
            <Header title='매장관리' small='true'/>
            <Store storeData={storeData} />
            <StoreManagementDetail />
            <TouchableOpacity
                onPress={signOutGoogle}
                style={{ width: '100%', height: 40, backgroundColor: "yellow", justifyContent: 'center', alignItems: 'center'}}
            >
                <Text style={{ ...FONTS2.h3 }}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        width: '95%',
        alignSelf: 'center',
        textAlign: 'center',
        paddingVertical: 10,
        marginBottom: 12
    },
});

export default StoreManagementMain;
