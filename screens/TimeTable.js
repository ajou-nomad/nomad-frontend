/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
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

import WeeklyGroupInfo from '../components/weekly/WeeklyGroupListParent';
import NewGroupButton from '../components/map/NewGroupButton';

const TimeContainer = ({ startTime, color }) => (
	<View style={{ flexDirection: 'row', marginTop: SIZES.base * 2 }}>
		<Text style={{ ...FONTS3.h2, color: COLORS.darkgray }}>{startTime}</Text>
		<TouchableOpacity style={{ width: responsiveWidth(74), minHeight: responsiveHeight(8), backgroundColor: '#f1f3f5', marginLeft: SIZES.base * 2, borderRadius: 15, justifyContent: 'space-evenly', paddingLeft: SIZES.base * 2.5 }}>
			{/* Flatlist로 */}
			<View style={{ flexDirection: 'row' }}>
				<Image source={icons.check} resizeMode='contain' style={{ width: SIZES.base * 2, height: SIZES.base * 2, tintColor: '#fa5252', marginRight: SIZES.base }} />
				<Text style={{ ...FONTS2.h4 }}>아주대 팔달관 08:15</Text>
			</View>
		</TouchableOpacity>
	</View>
);

const MondayRoute = ({ route }) => (
	<ScrollView>
	</ScrollView>
);

const TuesdayRoute = ({ route }) => (
	<ScrollView>
	</ScrollView>
);

const WednesdayRoute = ({ route }) => (
	<ScrollView style={{ marginHorizontal: SIZES.base * 2, marginBottom: SIZES.base * 2.5 }} contentContainerStyle={{ flexGrow: 1 }} 
  showsVerticalScrollIndicator={false}>
		<TimeContainer startTime='08:00' color='#FFE2D4' />
		<TimeContainer startTime='09:00' color='#FFEED4' />
		<TimeContainer startTime='10:00' color='#D4FFD6' />
		<TimeContainer startTime='11:00' color='#D4FFF3' />
		<TimeContainer startTime='12:00' color='#E5E8FF' />
		<TimeContainer startTime='13:00' color='#FFEED4' />
		<TimeContainer startTime='14:00' color='#FFEED4' />
		<TimeContainer startTime='15:00' color='#FFEED4' />
		<TimeContainer startTime='16:00' color='#FFEED4' />
	</ScrollView>
);

const ThursdayRoute = ({ route }) => (
	<ScrollView>
	</ScrollView>
);

const FridayRoute = ({ route }) => (
	<ScrollView>
	</ScrollView>
);

const renderScene = SceneMap({
  first: MondayRoute,
  second: TuesdayRoute,
  third: WednesdayRoute,
  fourth: ThursdayRoute,
  fifth: FridayRoute,
});
 
const TimeTable = (props) => {
  const location = props.route.params.group.location;
  const groupList = props.route.params.group.groupList;
  const storeData = props.route.params.storeData;
  const todayFullDate = new Date();
  const todayHeader = JSON.stringify(new Date().toJSON()).substr(1, 10);
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

  const timeTableList = [
    {
      id: 'time1',
      time: '08~09',
      date: groupDate,
      location: location,
      //  currentGroup:6,
    },
    {
      id: 'time2',
      time: '09~10',
      date: groupDate,
      location: location,
    },
    {
      id: 'time3',
      time: '10~11',
      date: groupDate,
      location: location,
    },
    {
      id: 'time4',
      time: '11~12',
      date: groupDate,
      location: location,
    },
    {
      id: 'time5',
      time: '12~13',
      date: groupDate,
      location: location,
    },
    {
      id: 'time6',
      time: '13~14',
      date: groupDate,
      location: location,
    },
    {
      id: 'time7',
      time: '14~15',
      date: groupDate,
      location: location,
    },
    {
      id: 'time8',
      time: '15~16',
      date: groupDate,
      location: location,
    },
    {
      id: 'time9',
      time: '16~17',
      date: groupDate,
      location: location,
    },
  ];

  const Header = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: SIZES.base, backgroundColor: 'white' }}>
        <TouchableOpacity
          onPress={() => { goBack(); }}
        >
          <Image source={icons.goback} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 2.5, marginLeft: SIZES.base, }} />
        </TouchableOpacity>
			<Text numberOfLines={1} style={{ ...FONTS2.h2, }}>{location.buildingName}</Text>
        <Text style={{ ...FONTS2.body2, alignSelf: 'center', position: 'absolute', right: SIZES.base * 2 }}>{todayHeader}</Text>
      </View>
    );
  };

  const todayDate = new Date(today);
  const todayDay = todayDate.getDay();
  const dayArrayEng = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const dayArrayKor = ['월', '화', '수', '목', '금'];
  const dateDifference = [1, 2, 3, 4];
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

  const DayButtons = () => {
    return (
      <View style={styles.headerButtons}>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[0]);
            setGroupDate(setGroupDateValue(0));
          }}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[1]);
            setGroupDate(setGroupDateValue(dateDifference[0]));
          }}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[2]);
            setGroupDate(setGroupDateValue(dateDifference[1]));
          }}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[3]);
            setGroupDate(setGroupDateValue(dateDifference[2]));
          }}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[3]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[4]);
            setGroupDate(setGroupDateValue(dateDifference[3]));
          }}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[4]}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const InfoOfWeeklyGroup = ({ item }) => (
    <WeeklyGroupInfo
      time={item.time}
      date={item.date}
      location={item.location}
      groupList={groupList}
      day={day}
      storeData={storeData}
    />
  );
 
  const ListOfWeeklyGroup = () => (
    <SafeAreaView style={{ marginBottom: 100 }}>
      <FlatList
        data={timeTableList}
        renderItem={InfoOfWeeklyGroup}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
  
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '월', num: 11 },
    { key: 'second', title: '화', num: 12 },
    { key: 'third', title: '수', num: 13 },
    { key: 'fourth', title: '목', num: 14 },
    { key: 'fifth', title: '금', num: 15 },
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
			pressColor='white'
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
      {/* <NewGroupButton storeData={storeData} initLocation={location} deliDate={null} items={{ datePicker: [dayArrayKorFixed, dateDifference] }} /> */}
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
