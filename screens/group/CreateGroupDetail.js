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
    Pressable
} from 'react-native';

import Counter from 'react-native-counters';
import DatePicker from 'react-native-date-picker';

import { FONTS, FONTS2, SIZES } from '../../constants';
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

    const setGroupDayValue = (dateDifference) => {
      const d = new Date(todayForWeekly);
      d.setDate(d.getDate() + dateDifference);

      return ('00' + JSON.stringify(d.getDate())).slice(-2);
    };

   const weeklyDate = [
     setGroupDayValue(dateDifference[0]),
     setGroupDayValue(dateDifference[1]),
     setGroupDayValue(dateDifference[2]),
     setGroupDayValue(dateDifference[3]),
     setGroupDayValue(dateDifference[4]),
   ];


   const initalSelected = [false, false, false, false, false];
   const [selected, setSelected] = useState(initalSelected);

    const DayPicking = () =>{
        return (
          <View style={styles.calendarView}>
            {/* 날짜 버튼 */}
            {weeklyDate.map( (item, index) => (
              <View key={index} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black', ...FONTS2.body6, fontWeight: 'bold'}}>{dayArrayKorFixed[index]}</Text>
                <Pressable
                  key={index}
                  onPress={() => {
                    setSelected([
                      ...initalSelected.slice(0, index),
                      !selected[index],
                      ...initalSelected.slice(index + 1),
                    ]);
                    setGroupDate(setGroupDateValue(dateDifference[index]));
                  }}
                  style={ [
                    {
                      backgroundColor: selected[index]
                        ? '#6E99F0'
                        : 'white',
                        // opacity: selected[index]
                        // ? 0.9
                        // : 0.5,
                    },
                    styles.dateButton,
                  ]}
                  >
                  <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: selected[index] ? 'white' : 'black', ...FONTS2.h5}}>{weeklyDate[index]}</Text>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        );
      };



    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                                <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>날짜</Text>
                                {DayPicking()}
                            </View>
                            :
                            <>
                            </>
                        }

                        {
                            !params.time ?
                            <View style={{ marginBottom: 10,}}>
                                <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>시간</Text>
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
    calendarView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      marginVertical: SIZES.height * 0.02,
    },
    dateButton: {
      marginHorizontal: 10,
      marginTop: 5,
      borderRadius: 50,
    },
});

export default CreateGroupDetail;
