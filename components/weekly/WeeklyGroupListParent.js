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
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { icons, FONTS2, COLORS, images } from '../../constants';
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
    const navigation = useNavigation();
    const tableTime = props.time.slice(0,2);
    // const extractDate = (date) =>{
    //     return JSON.stringify(new Date(date)).slice(1,10);
    // }

    // const compareDate = (itemDate,propsDate) =>{
    //     console.log(itemDate + ' === ' + propsDate)
    //     return extractDate(itemDate) === extractDate(propsDate);
    // }
    const groupList = props.groupList.filter(
        ({date,time}) => (date === props.date) && (time.slice(0,2) === tableTime)
    );

    const storeData = props.storeData;

    const currentGroup = groupList.length;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('WeeklyGroupListChild', {
                    date: props.date,
                    time: props.time,
                    location: props.location,
                    currentGroup: currentGroup,
                    groupList: groupList,
                    storeData: storeData,
                    back: 'TimeTable',
                })}
            >

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
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
                        <View
                        // style={{ backgroundColor: '#ffc078', borderRadius: 20, paddingHorizontal: 5 }}
                        >
                            <Text
                                numberOfLines={1}
                                style={{
                                    ...FONTS2.body2,
                                }}>{currentGroup}개 생성</Text>
                        </View>
                    </View>
                    {
                        currentGroup === 0 ? (
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 20, opacity: 0.2 }}>
                                <Image style={{ width: 140, height: 110, }} source={images.people2} resizeMode='cover' />
                            </View>
                        ) : (
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 20 }}>
                                <Image style={{ width: 140, height: 110, }} source={images.people2} resizeMode='cover' />
                            </View>
                        )
                    }
                    
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});
