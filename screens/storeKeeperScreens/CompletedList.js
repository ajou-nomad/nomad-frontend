/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import OrderItem from '../../components/item/OrderItem';
import Header from '../../components/layout/Header';
import { COLORS } from '../../constants';
import axiosApiInstance from '../../utils/axios';

const CompletedList = ({navigation}) => {

    const [groupOrder, setGroupOrder] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // 오늘날짜의 배달 그룹만
            axiosApiInstance.get('/deliveryComplete')
                .then(function (response) {
                    // console.log('배달 완료 리스트: ', JSON.stringify(response.data.data, null, 4));
                    setGroupOrder(response.data.data);
                }).catch((e) => console.log(e));
        });

        //unmount 시 리스너 삭제
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <Header title="완료된 주문" small="true"/>

            <FlatList
                data={groupOrder}
                keyExtractor={item => item.groupId.toString()}
                renderItem={({ item }) => <OrderItem item={item} />}
            />
        </View>
    );
};

export default CompletedList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});