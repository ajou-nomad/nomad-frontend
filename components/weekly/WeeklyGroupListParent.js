/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, ImageBackground, } from 'react-native';
import { FONTS2, COLORS, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';



export default function WeeklyGroupListParent(props) {
    // const star = require('../assets/icons/star.png');
    // const time = require('../assets/icons/pin.png');
    // const user = require('../assets/icons/user.png');
    // let logo;
    // switch (props.logo){
    //     case 'minus': logo = require('../assets/icons/pizza.png'); break;
    //     case 'home': logo = require('../assets/icons/fries.png'); break;
    //     case 'gps': logo = require('../assets/icons/noodle.png'); break;

    // }
    // const navigation = useNavigation();
    // const tableTime = props.time.slice(0,2);
    // const groupList = props.groupList.filter(
    //     ({date,time}) => (date === props.date) && (time.slice(0,2) === tableTime)
    // );
    // const extractDate = (date) =>{
    //     return JSON.stringify(new Date(date)).slice(1,10);
    // }

    // const compareDate = (itemDate,propsDate) =>{
    //     console.log(itemDate + ' === ' + propsDate)
    //     return extractDate(itemDate) === extractDate(propsDate);
    // }

    // const storeData = props.storeData;

    // const currentGroup = groupList.length;
    console.log(JSON.stringify(props.route.params,null,4));
    return (
        <ScrollView style={styles.container}>
            <Text>
                {JSON.stringify(props.route.params,null,4)}
            </Text>
            {/* <TouchableOpacity
                onPress={() => navigation.navigate('WeeklyGroupListChild', {
                    date: date,
                    time: time,
                    location: location,
                    currentGroup: groupList.length,
                    groupList: groupList,
                    storeData: storeData,
                    back: 'TimeTable',
                })}
            >

                <View style={styles.itemContainer}>
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text numberOfLines={1}
                            style={{
                                ...FONTS2.body1,
                            }}>
                            {props.time}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 10 }}>
                        <Text numberOfLines={1}
                            style={{
                                ...FONTS2.h2,
                            }}>{props.location.buildingName}</Text>
                        <Text numberOfLines={1}
                            style={{
                                ...FONTS2.body3,
                            }}>{props.date}</Text>
                        
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 20 }}>
                        <ImageBackground style={{ width: 140, height: 110, justifyContent: 'center', }} source={images.people2} resizeMode='cover'>
                            <View style={styles.createNum}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        ...FONTS2.body2,
                                    }}
                                >{currentGroup}개 생성</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    
                </View>
            </TouchableOpacity> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        margin: 10,
        borderRadius: 20,
        borderTopStartRadius: 40,
        paddingHorizontal: 10,
        borderColor: '#dee2e6',
    },
    createNum: {
        backgroundColor: COLORS.white, 
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 20,
        elevation: 3,
        borderRadius: 10,
    },
});
