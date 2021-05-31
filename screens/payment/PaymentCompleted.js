/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS2, icons, SIZES } from '../../constants';


const PaymentCompleted = ({ navigation, route: { params } }) => {

    const currentTime = new Date();

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                {/* Header */}
                <View style={styles.title}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Tabs',{routeName: ''})}
                        style={{ position: 'absolute', left: SIZES.width * 0.045, top: SIZES.height * 0.025 }}
                    >
                        <Image
                            source={icons.close}
                            resizeMode="contain"
                            style={styles.closeButton}
                        />
                    </TouchableOpacity>
                    <Image
                        source={icons.check2}
                        resizeMode="contain"
                        style={{
                            width: 50,
                            height: 50,
                            marginBottom: 10,
                        }}
                    />
                    <Text style={{ ...FONTS2.h3}}>결제요청 처리완료</Text>
                </View>

                {/* Body */}
                <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: SIZES.base * 3, borderBottomWidth: 0.3 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text style={{ ...FONTS2.h4 }}>가맹점</Text>
                        <Text style={{ ...FONTS2.body3 }}>{'Dutch Delivery'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                        <Text style={{ ...FONTS2.h4 }}>결제 금액</Text>
                        <Text style={{ ...FONTS2.h4, color: '#339af0' }}>{params.totalCost?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: SIZES.base * 3 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text style={{ ...FONTS2.h4 }}>결제 일시</Text>
                        <Text style={{ ...FONTS2.body3 }}>{`${currentTime.getFullYear()}-${('00' + JSON.stringify(currentTime.getMonth())).slice(-2)}-${('00' + JSON.stringify(currentTime.getDay())).slice(-2)} ${('00' + JSON.stringify(currentTime.getHours())).slice(-2)}:${('00' + JSON.stringify(currentTime.getMinutes())).slice(-2)}:${('00' + JSON.stringify(currentTime.getSeconds())).slice(-2)}`}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                        <Text style={{ ...FONTS2.h4 }}>거래상태</Text>
                        <Text style={{ ...FONTS2.body3, color: 'black' }}>승인</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                        <Text style={{ ...FONTS2.h4 }}>결제수단</Text>
                        <Text style={{ ...FONTS2.body3, color: 'black' }}>{params.paymentMethod}</Text>
                    </View>
                </View>

                {/* Bottom */}
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Tabs',{routeName: ''})}
                        style={{width: '100%', height: '50%', backgroundColor: '#339af0'}}
                    >
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ ...FONTS2.h4, color: 'white' }}>홈으로</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    modal: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        height: SIZES.height * 0.75,
        width: SIZES.width * 0.85,
    },
    closeButton: {
        width: SIZES.base * 2,
        height: SIZES.base * 2,
        tintColor: COLORS.darkgray,
    },
    title: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.3,
    },

});


export default PaymentCompleted;
