/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Store from '../../../components/store/Store';
import { logout } from '../../../utils/helper';
import { AuthContext } from '../../../context/AuthContextProvider';
import Header from '../../../components/layout/Header';
import { COLORS, FONTS2, icons, SIZES } from '../../../constants';
import MyPageButton from '../../../components/MyPageButton';

const StoreManagementMain = ({ navigation }) => {
    /*FlatList로 변경 필요 */
    /* .Get("/storeData") */
    
    const { state, dispatch } = useContext(AuthContext);

    const signOutGoogle = async () => {

        logout(dispatch);
    };

    const storeData = {
        storeName: state.member.nickName,
        storeOpen: false,
        storeOrderStatus: {
            Todo: 10,
            InProgress: 5,
            Complete: 25,
        },
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header title='매장관리' small='true'/>
            <Store storeData={storeData} />
            {/* <StoreManagementDetail /> */}
            <View style={{ marginBottom: SIZES.base * 4 }} />
            <MyPageButton title='공지사항 관리' img={icons.notice} onPress={() => navigation.navigate('StoreManagementNotice')} />
            <MyPageButton title='메뉴관리' img={icons.pencil} onPress={() => navigation.navigate('StoreManagementMenu')} />
            <MyPageButton title='리뷰관리' img={icons.review} onPress={() => navigation.navigate('StoreManagementReview')} />
            <MyPageButton title='로그아웃' img={icons.logout} onPress={signOutGoogle} />
        </ScrollView>
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
