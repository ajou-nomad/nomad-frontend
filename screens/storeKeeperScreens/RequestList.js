/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../components/layout/Header';
import {FONTS2, icons } from '../../constants';

const RequestList = () => {
    return (
        <View style={{ flex: 1}}>
            <Header title="주문 리스트" small="true" />
            <View style={{justifyContent: 'center', alignSelf: 'center', alignItems:'center', flex: 1, flexDirection: 'row'}}>
                    <Image
                        source={icons.no}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                <Text style={{ ...FONTS2.body1, color: '#707070', alignSelf: 'center' }}> 아직 주문이 없습니다.</Text>
            </View>
        </View>
    );
};

export default RequestList;
