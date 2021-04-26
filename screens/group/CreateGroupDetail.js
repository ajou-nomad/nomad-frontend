/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import Counter from 'react-native-counters';
import DatePicker from 'react-native-date-picker';

import { FONTS2 } from '../../constants';

function CreateGroupDetail({ navigation }) {
    const [date, setDate] = useState(new Date());
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={{
                flex: 0.5,
                backgroundColor: 'white',
                borderBottomWidth: 0.5,
                borderBottomColor: '#707070',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>배달 그룹 생성</Text>
            </View>

            {/* Body */}
            <View style={{ flex: 4, marginHorizontal: 30, marginBottom: 20, }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ ...FONTS2.h1, fontWeight: 'bold', }}>수령장소</Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            width: 300,
                            marginBottom: 20,
                            ...FONTS2.h2,
                        }}
                        placeholder='수령 장소'
                        placeholderTextColor='#707070'
                        selectionColor='#000000'
                    />

                    <Text style={{ ...FONTS2.h1, fontWeight: 'bold', }}>시간</Text>
                    <DatePicker date={date} onDateChange={setDate} mode='time' />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        ...FONTS2.h1,
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
                        paddingBottom: 10,}}/>
                </View>

                <Text style={{ ...FONTS2.body2 }}>
                    그룹 생성하면 주문 확인 내용 페이지로
                </Text>

            </View>

            {/* Footer */}
            <TouchableOpacity
                style={{
                    flex: 0.5,
                    backgroundColor: '#EDF2FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>그룹 생성하기</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default CreateGroupDetail;
