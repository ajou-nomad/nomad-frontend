/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';

import Counter from 'react-native-counters';
import DatePicker from 'react-native-date-picker';

import { FONTS2 } from '../../constants';
import Header from '../../components/layout/Header';
import BottomButton from '../../components/layout/BottomButton';

function CreateGroupDetail({ navigation, route: { params } }) {
    const [date, setDate] = useState(new Date());
    const [buildingName, setBuildingName] = useState('');

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                {/* Header */}
                <Header title="배달 그룹 생성" small="true" haveInput="true" />
            
                {/* Body */}
                <View style={{ flex: 4, marginHorizontal: 30, }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>건물명</Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                width: 300,
                                ...FONTS2.body2,
                            }}
                            placeholder="건물명"
                            value={buildingName}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={text => setBuildingName(text)}
                        />

                        {params.time === null ?
                            <View style={{ marginVertical: 50,}}>
                                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>시간</Text>
                                <DatePicker date={date} onDateChange={setDate} mode="time" />
                            </View>
                            :
                            <View style={{ marginVertical: 45, }} />
                        }
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{
                                ...FONTS2.h2,
                                fontWeight: 'bold',
                            }}>인원</Text>
                            <Counter
                                start={1}
                                min={1}
                                buttonTextStyle={{ color: 'black', ...FONTS2.h1 }}
                                buttonStyle={{ borderColor: 'black' }}
                                countTextStyle={{ color: 'black', ...FONTS2.h1 }}
                            />
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            width: 300,
                            paddingBottom: 10,
                            marginBottom: 35,
                        }} />
                    </View>
                </View>
                    
                {/* Footer */}
                <BottomButton onPress={() => navigation.navigate('CheckOrder', { time: params.time, location: params.location.address, storeName: params.storeName })} title="그룹 생성하기" />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default CreateGroupDetail;
