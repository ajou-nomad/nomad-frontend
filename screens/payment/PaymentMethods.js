/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MyPoint from '../../components/payment/MyPoint';
import SelectMethod from '../../components/payment/SelectMethod';
import TopText from '../../components/payment/TopText';
import { SIZES, icons } from '../../constants';



const PaymentMethods = ({navigation}) => {

    const data = {
        amount: 10000, // 최종 주문 결제 내역에서 가져올
        myPoint: 150000, // axios로 불러야 할 정보들
        buyerName: '테스트용',
        buyerTel: '010-1234-5678',
        buyerEmail: 'test@gmail.com',
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style= {{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <TopText />
            <SelectMethod
                iconName="point"
                method="포인트"
                disable={false}
                paymentInfo={data}
            />
            <SelectMethod
                iconName="credit_card"
                method="신용카드"
                disable={true}
                paymentInfo={data}
            />
            <MyPoint point={data.myPoint} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        flexDirection: 'row',
    },
});

export default PaymentMethods;

