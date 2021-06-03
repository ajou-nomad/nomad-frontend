/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
    Image,
} from 'react-native';
import {  COLORS, SIZES, FONTS, FONTS2, icons, FONTS3 } from '../constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { useNavigation } from '@react-navigation/core';
import NewGroupButton from '../components/map/NewGroupButton';



const TimeContainer = ({ startTime, groupList, location, storeData, color }) => {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row' }}>
            
            {/* Flatlist로 */}
            {groupList.length ?
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ ...FONTS3.h2, color: COLORS.darkgray }}>{startTime}</Text>
                    <TouchableOpacity
                        style={{
                            width: responsiveWidth(74),
                            minHeight: responsiveHeight(8),
                            backgroundColor: '#EFF3FF',
                            // borderWidth: 1,
                            // borderColor: '#e9ecef',
                            marginLeft: SIZES.base * 2,
                            borderRadius: 3,
                            justifyContent: 'space-evenly',
                            paddingLeft: SIZES.base * 2.5,
                        }}
                        onPress={() => navigation.navigate('WeeklyGroupListChild', {
                            date: groupList[0].date,
                            time: groupList[0].time,
                            location: location,
                            currentGroup: groupList.length,
                            groupList: groupList,
                            storeData: storeData,
                            back: 'TimeTable',
                        })}
                    >
                        <View style={{ flexDirection: 'row', marginHorizontal: SIZES.base, alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* <Image source={icons.check} resizeMode="contain" style={{ width: SIZES.base * 2, height: SIZES.base * 2, tintColor: '#fa5252', marginRight: SIZES.base }} /> */}
                            {/* <Text style={{ ...FONTS2.h4 }}>{location.buildingName} |</Text>
                        <Text style={{ ...FONTS2.h4 }}> {groupList[0].date}  |</Text> */}
                            <View style={{ flexDirection: 'column',  }}>
                                <Text style={{ ...FONTS3.h2, alignSelf: 'center', color: '#495057' }}>{location.buildingName}</Text>
                                <Text style={{ ...FONTS2.body3, alignSelf: 'center', color: '#495057' }}>{groupList.length}개 생성</Text>
                            </View>
                            <TouchableOpacity style={{ borderRadius: 10, borderWidth: 1, backgroundColor: '#6E99F0', borderColor: '#6E99F0', justifyContent: 'center', alignItems: 'center', paddingHorizontal: SIZES.base * 0.8, height: SIZES.base * 3, marginRight: SIZES.base }}>
                                <Text style={{ alignSelf: 'center', ...FONTS2.body4, color: 'white',  }}>모집중</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                (null)
            }
        </View>
    );
};

const FirstRoute = ({ route }) => {
    return (
        <ScrollView style={{flex: 1, marginHorizontal: SIZES.base * 2, marginVertical: SIZES.base * 2.5 }} contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>

            {route.hourSchedule.map( ({hour, color}) =>
                <TimeContainer key={hour} color={color} startTime={`${hour}:00`} groupList={route.groupList.filter(({ time }) => (time.substr(0, 2) === hour))} location={route.location} storeData={route.storeData} />
            )}
        </ScrollView>
    );
};

const SecondRoute = ({ route }) => {
    return (
        <ScrollView style={{flex: 1, marginHorizontal: SIZES.base * 2, marginVertical: SIZES.base * 2.5 }} contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>

            {route.hourSchedule.map( ({hour, color}) =>
                <TimeContainer key={hour} color={color} startTime={`${hour}:00`} groupList={route.groupList.filter(({ time }) => (time.substr(0, 2) === hour))} location={route.location} storeData={route.storeData} />
            )}
        </ScrollView>
    );
};

const ThirdRoute = ({ route }) => {
    return (
        <ScrollView style={{flex: 1, marginHorizontal: SIZES.base * 2, marginVertical: SIZES.base * 2.5 }} contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>

            {route.hourSchedule.map( ({hour, color}) =>
                <TimeContainer key={hour} color={color} startTime={`${hour}:00`} groupList={route.groupList.filter(({ time }) => (time.substr(0, 2) === hour))} location={route.location} storeData={route.storeData} />
            )}
        </ScrollView>
    );
};

const FourthRoute = ({ route }) => {
    return (
        <ScrollView style={{flex: 1, marginHorizontal: SIZES.base * 2, marginVertical: SIZES.base * 2.5 }} contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>

            {route.hourSchedule.map( ({hour, color}) =>
                <TimeContainer key={hour} color={color} startTime={`${hour}:00`} groupList={route.groupList.filter(({ time }) => (time.substr(0, 2) === hour))} location={route.location} storeData={route.storeData} />
            )}
        </ScrollView>
    );
};

const FifthRoute = ({ route }) => {
    return (
        <ScrollView style={{flex: 1, marginHorizontal: SIZES.base * 2, marginVertical: SIZES.base * 2.5 }} contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>

            {route.hourSchedule.map( ({hour, color}) =>
                <TimeContainer key={hour} color={color} startTime={`${hour}:00`} groupList={route.groupList.filter(({ time }) => (time.substr(0, 2) === hour))} location={route.location} storeData={route.storeData} />
            )}
        </ScrollView>
    );
};
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute,
});

const TimeTable = (props) => {
    const location = props.route.params.group.location;
    const groupList = props.route.params.group.groupList;
    const storeData = props.route.params.storeData;
    const todayFullDate = new Date();
    todayFullDate.setHours(todayFullDate.getHours() + 9);
    const todayHeader = JSON.stringify(todayFullDate.toJSON()).substr(1, 10);
    todayFullDate.setDate(todayFullDate.getDate() + 1);
    if (todayFullDate.getDay() === 0) {
        todayFullDate.setDate(todayFullDate.getDate() + 1);
    } else if (todayFullDate.getDay() === 6) {
        todayFullDate.setDate(todayFullDate.getDate() + 2);
    }
    const today = JSON.stringify(todayFullDate.toJSON()).substr(1, 10);
    const back = props.route.params.back;
    const goBack = () => {
        props.navigation.navigate(back);
    };

    const [groupDate, setGroupDate] = useState(today);

    const setGroupDateValue = (dateDifference) => {
        const d = new Date(today);
        d.setDate(d.getDate() + dateDifference);
        return JSON.stringify(d.toJSON()).substr(1, 10);
    };

    const hourSchedule = [{hour: '08', color: '#f1f3f5'}, {hour: '09', color: '#e5dbff'}, {hour: '10', color: '#c5f6fa'}, {hour: '11', color: '#f1f3f5'}, {hour: '12', color: '#5c7cfa'}, {hour: '13', color: '#f1f3f5'}, {hour: '14', color: '#94d82d'}, {hour: '15', color: '#f1f3f5'}, {hour: '16', color: '#5c7cfa'}, {hour: '17', color: '#5c7cfa'}, {hour: '18', color: '#5c7cfa'}, {hour: '19', color: '#f1f3f5'}, {hour: '20', color: '#5c7cfa'}, {hour: '21', color: '#f1f3f5'}, {hour: '22', color: '#f1f3f5'}];



    const Header = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: SIZES.base, backgroundColor: 'white' }}>
                <TouchableOpacity
                    onPress={() => { goBack(); }}
                >
                    <Image source={icons.goback} resizeMode="contain" style={{ width: SIZES.base * 2.5, height: SIZES.base * 2.5, marginLeft: SIZES.base, }} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={{ ...FONTS2.h2, }}>{location.buildingName}</Text>
                <Text style={{ ...FONTS2.body2, alignSelf: 'center', position: 'absolute', right: SIZES.base * 2 }}>{todayHeader}</Text>
            </View>
        );
    };


    const todayDate = new Date(today);
    todayDate.setTime(todayDate.getTime() + 9);
    const todayDay = todayDate.getDay();
    const dayArrayEng = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const dayArrayKor = ['월', '화', '수', '목', '금'];
    const dateDifference = [0, 1, 2, 3, 4];
    const lastIndex = dateDifference.length - 1;

    let todayDayIndex = (todayDay % 6) - 1;
    if (todayDayIndex < 0) {
        todayDayIndex = 0;
    }
    for (let i = 0; i < todayDayIndex; i++) {
        dateDifference[lastIndex - i] += 2;
    }
    const dayArrayEngFixed = [...dayArrayEng.slice(todayDayIndex), ...dayArrayEng.slice(0, todayDayIndex)]
    const dayArrayKorFixed = [...dayArrayKor.slice(todayDayIndex), ...dayArrayKor.slice(0, todayDayIndex)]
    const [day, setDay] = useState(dayArrayEngFixed[0]);

    const weeklyDate = [
        setGroupDateValue(dateDifference[0]),
        setGroupDateValue(dateDifference[1]),
        setGroupDateValue(dateDifference[2]),
        setGroupDateValue(dateDifference[3]),
        setGroupDateValue(dateDifference[4]),
    ]

    const DayButtons = () => {
        return (
            <View style={styles.headerButtons}>
                <TouchableOpacity
                    onPress={() => {
                        setDay(dayArrayEngFixed[0]);
                        setGroupDate(setGroupDateValue(dateDifference[0]));
                    }}
                    style={styles.headerButton}
                >
                    <Text style={styles.headerButtonText}>{dayArrayKorFixed[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDay(dayArrayEngFixed[1]);
                        setGroupDate(setGroupDateValue(dateDifference[1]));
                    }}
                    style={styles.headerButton}
                >
                    <Text style={styles.headerButtonText}>{dayArrayKorFixed[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDay(dayArrayEngFixed[2]);
                        setGroupDate(setGroupDateValue(dateDifference[2]));
                    }}
                    style={styles.headerButton}
                >
                    <Text style={styles.headerButtonText}>{dayArrayKorFixed[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDay(dayArrayEngFixed[3]);
                        setGroupDate(setGroupDateValue(dateDifference[3]));
                    }}
                    style={styles.headerButton}
                >
                    <Text style={styles.headerButtonText}>{dayArrayKorFixed[3]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDay(dayArrayEngFixed[4]);
                        setGroupDate(setGroupDateValue(dateDifference[4]));
                    }}
                    style={styles.headerButton}
                >
                    <Text style={styles.headerButtonText}>{dayArrayKorFixed[4]}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: dayArrayKorFixed[0], num: weeklyDate[0].substr(8, 2), groupList: groupList.filter(({ date, time }) => (date === weeklyDate[0])), location: location, storeData: storeData , hourSchedule: hourSchedule},
        { key: 'second', title: dayArrayKorFixed[1], num: weeklyDate[1].substr(8, 2), groupList: groupList.filter(({ date, time }) => (date === weeklyDate[1])), location: location, storeData: storeData, hourSchedule: hourSchedule },
        { key: 'third', title: dayArrayKorFixed[2], num: weeklyDate[2].substr(8, 2), groupList: groupList.filter(({ date, time }) => (date === weeklyDate[2])), location: location, storeData: storeData, hourSchedule: hourSchedule },
        { key: 'fourth', title: dayArrayKorFixed[3], num: weeklyDate[3].substr(8, 2), groupList: groupList.filter(({ date, time }) => (date === weeklyDate[3])), location: location, storeData: storeData, hourSchedule: hourSchedule },
        { key: 'fifth', title: dayArrayKorFixed[4], num: weeklyDate[4].substr(8, 2), groupList: groupList.filter(({ date, time }) => (date === weeklyDate[4])), location: location, storeData: storeData, hourSchedule: hourSchedule },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: 'white',
            }}
            style={{
                backgroundColor: 'white',
                elevation: 0,
                borderBottomColor: '#e9ecef',
                borderBottomWidth: 0.5,
            }}
            inactiveColor={COLORS.darkgray}
            activeColor={COLORS.black}
            renderLabel={({ route, focused, color }) => (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...FONTS2.body6, color: 'black', fontWeight: 'bold' }}>{route.title}</Text>
                    <View style={{
                        backgroundColor: focused ? '#6E99F0' : 'white',
                        // opacity: 0.8,
                        width: SIZES.base * 5, height: SIZES.base * 5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: SIZES.base * 0.3
                    }}>
                        <Text style={{ ...FONTS2.h3, color: focused ? 'white' : 'black' }}>{route.num}</Text>
                    </View>
                </View>
            )}
            pressColor="white"
        />
    );

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            {Header()}
            {/* {DayButtons()} */}
            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
            {/* {ListOfWeeklyGroup()} */}
            <NewGroupButton storeData= {storeData} initLocation={location} deliDate={null} datePicker= {[dayArrayKorFixed,dateDifference]} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginLeft: 8,
        fontSize: 42,
    },
    headerLocationText: {
        ...FONTS2.h2,
        marginLeft: 50,
        width: '50%',
    },
    headerDateText: {
        ...FONTS2.body2,
        position: 'absolute',
        right: 12,
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 5,
    },
    headerButton: {
        marginHorizontal: 8,
        padding: 5,
        width: 55,
        borderColor: '#f1f3f5',
        borderWidth: 2,
        borderRadius: 70,
        backgroundColor: '#f1f3f5',
        alignItems: 'center',
    },
    headerButtonText: {
        ...FONTS2.body3,
    },
    mainView: {
        backgroundColor: '#eee',
        flex: 1,
        borderTopColor: '#000',
        borderTopWidth: 2,
        paddingTop: 10,
    },
    groupInfo: {
        flexDirection: 'row',
        marginLeft: 10,
        marginVertical: 15,
        alignItems: 'center',
    },
    logoImage: {
        width: 45,
        height: 45,
        marginHorizontal: 10,
    },
    shopText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starImage: {
        width: 17,
        height: 17,
        marginRight: 5,
    },
    rateText: {
        fontSize: 16,
    },
    timeImage: {
        width: 17,
        height: 17,
    },
    deliveryTime: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryTimeText: {
        fontSize: 16,
    },
    userImage: {
        width: 20,
        height: 20,
    },
    groupNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#1e1e1e',
        borderWidth: 2,
        borderRadius: 35,
        position: 'absolute',
        right: 5,
    },
    groupNumberText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    newGroup: {
        flex: 1,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    newGroupView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width * 0.5,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding * 2,
        borderRadius: SIZES.radius * 0.5,
        backgroundColor: '#364FC7',
        elevation: 5,
    },
    logoStyle: {
        width: 15,
        height: 15,
        tintColor: COLORS.white,
        marginRight: SIZES.padding,
    },
    newGroupTextView: {
        flex: 1,
        alignItems: 'center',
    },
    newGroupText: {
        ...FONTS.body4,
        color: COLORS.white,
    },
});

export default TimeTable;