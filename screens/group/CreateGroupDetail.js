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
    ProgressViewIOSComponent,
    TouchableOpacity,
} from 'react-native';

import Counter from 'react-native-counters';
import DatePicker from 'react-native-date-picker';

import { FONTS2 } from '../../constants';
import Header from '../../components/layout/Header';
import BottomButton from '../../components/layout/BottomButton';

function CreateGroupDetail({ navigation, route: { params } }) {

    const [buildingName, setBuildingName] = useState(params.location.buildingName);
    const todayFullDate = new Date();
    todayFullDate.setDate(todayFullDate.getDate() + 1);
    if (todayFullDate.getDay() === 0){
     todayFullDate.setDate(todayFullDate.getDate() + 1);
    } else if (todayFullDate.getDay() === 6){
     todayFullDate.setDate(todayFullDate.getDate() + 2);
    }
    const todayForWeekly = JSON.stringify(todayFullDate.toJSON()).substr(1,10);
    // console.log(params);

    const dayArrayKorFixed = params.datePicker === undefined ? [0,0,0,0,0] : params.datePicker[0];
    const dateDifference = params.datePicker === undefined ? [0,0,0,0] : params.datePicker[1];

    const [date, setDate] = useState(todayFullDate);
    const today = params.deliDate !== (undefined || null) ? params.deliDate : todayForWeekly;
    // console.log(today)
    const [groupDate,setGroupDate] = useState(today);
    const [time,setTime] = useState(today);
    const [maxValue,setMax] = useState(1);

    const setGroupDateValue = (dateDifference) =>{
        const d = new Date(todayForWeekly);
        d.setDate(d.getDate()+dateDifference);
        return JSON.stringify(d.toJSON()).substr(1,10);
   };

    const DayPicking = () =>{
        return (
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => {
                setGroupDate(setGroupDateValue(0));
              }}
              style={styles.headerButton}
              >
              <Text style={styles.headerButtonText}>{dayArrayKorFixed[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setGroupDate(setGroupDateValue(dateDifference[0]));
              }}
              style={styles.headerButton}
              >
              <Text style={styles.headerButtonText}>{dayArrayKorFixed[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setGroupDate(setGroupDateValue(dateDifference[1]));
              }}
              style={styles.headerButton}
              >
              <Text style={styles.headerButtonText}>{dayArrayKorFixed[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setGroupDate(setGroupDateValue(dateDifference[2]));
              }}
              style={styles.headerButton}
              >
              <Text style={styles.headerButtonText}>{dayArrayKorFixed[3]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setGroupDate(setGroupDateValue(dateDifference[3]));
              }}
              style={styles.headerButton}
              >
              <Text style={styles.headerButtonText}>{dayArrayKorFixed[4]}</Text>
            </TouchableOpacity>
          </View>
        );
      };



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
                            placeholder="상세주소를 입력하세요.(건물명)"
                            value={buildingName}
                            placeholderTextColor="#707070"
                            selectionColor="#000000"
                            onChangeText={text => setBuildingName(text)}
                        />
                        {
                            !params.deliDate ?
                            <View style={{ marginVertical: 15,}}>
                                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>날짜</Text>
                                {DayPicking()}
                            </View>
                            :
                            <>
                            </>
                        }

                        {
                            !params.time ?
                            <View style={{ marginVertical: 15,}}>
                                <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>시간</Text>
                                <DatePicker date={date} onDateChange={(data)=>{data.setHours(data.getHours()+9);setTime(data);}} mode="time" minuteInterval={5}/>
                            </View>
                            :
                            <>
                            </>
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
                                onChange={(value)=>setMax(value)}
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

                <BottomButton onPress={() => {
                  navigation.navigate('CheckOrder', { totalPrice: params.totalPrice, cartItems: params.cartItems, deliDate: groupDate, time: JSON.stringify(time).slice(12,17), location: {...params.location,buildingName:buildingName}, storeInfo: params.storeInfo , groupData: params.groupData, maxValue: maxValue})
                  }} title="그룹 생성하기" />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 5,
    },
    headerButton: {
      marginHorizontal: 10,
      padding: 5,
      borderColor: '#e5e5e5',
      borderWidth: 5,
      borderRadius: 25,
    },
    headerButtonText:{
      fontSize: 14,
      fontWeight: 'bold',
    },
});

export default CreateGroupDetail;
