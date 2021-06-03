/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons, FONTS2} from '../constants';

import GroupInfo from '../components/GroupInfo';
import NewGroupButton from '../components/map/NewGroupButton';


export default function GroupList({navigation, route}) {

  const location = route.params.group.location;
  const back = route.params.back;
  const today = route.params.today;
  // const groupList = route.params.group.groupList;
  const [groupList, setGroupList] = useState(route.params.group.groupList);
  const storeData = route.params.storeData;

  // console.log("여기는 groupList.js"+JSON.stringify(groupList,null,4))
  
//   groupList.sort((prev,next)=>(parseInt(prev.time.replace(':','')))>(parseInt(next.time.replace(':',''))) ? 1 : (parseInt(prev.time.replace(':',''))) === (parseInt(next.time.replace(':',''))) ? (prev.max-prev.current) > (next.max-next.current) ? 1 : -1 : -1)


	const goBack = () => {
		navigation.navigate(back);
	};

	const sortPeople = () => {
		groupList.sort((prev, next) => (prev.max - prev.current) > (next.max - next.current) ? 1 : (prev.max - prev.current) === (next.max - next.current) ? (parseInt(prev.time.replace(':', ''))) > (parseInt(next.time.replace(':', ''))) ? 1 : -1 : -1)
		setGroupList([...groupList]);
		console.log('인원순:' + JSON.stringify(groupList, null, 4));

	};

	const sortTime = () => {
		groupList.sort((prev, next) => (parseInt(prev.time.replace(':', ''))) > (parseInt(next.time.replace(':', ''))) ? 1 : (parseInt(prev.time.replace(':', ''))) === (parseInt(next.time.replace(':', ''))) ? (prev.max - prev.current) > (next.max - next.current) ? 1 : -1 : -1)
		setGroupList([...groupList]);
		console.log('시간순:' + JSON.stringify(groupList, null, 4));

	};

	const Header = () => {
		return (
			<View style={styles.headerText}>
				<TouchableOpacity
					onPress={() => { goBack(); }}
				>
					{/* <Text style={styles.backButton}>&lt;</Text> */}
					<Image source={icons.goback} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 2.5, marginLeft: 5, }} />
				</TouchableOpacity>
				<Text numberOfLines={1} style={styles.headerLocationText}>{location.buildingName}</Text>
				<Text style={styles.headerDateText}>{today}</Text>
			</View>
		);
	};

	const SortButtons = () => {
		return (
			<View style={styles.headerButtons}>
				<TouchableOpacity
					onPress={() => { sortPeople(); }}
					style={styles.headerButton}
				>
					<Text style={styles.headerButtonText}>인원순</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => { sortTime(); }}
					style={styles.headerButton}
				>
					<Text style={styles.headerButtonText}>시간순</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const InfoOfGroup = ({ item }) => (
		<GroupInfo
			groupData={item}
			logo={item.logo}
			rate={item.rate}
			time={item.time}
			current={item.current}
			max={item.max}
			storeInfo={item.store}
			deliDate={today}
      location={location}
      storeData={storeData}
			styleGroupInfo={styles.groupInfo}
			styleLogoImage={styles.logoImage}
			styleShopText={styles.shopText}
			styleRating={styles.rating}
			styleStarImage={styles.starImage}
			styleRateText={styles.rateText}
			styleDeliveryTime={styles.deliveryTime}
			styleTimeImage={styles.timeImage}
			styleDeliveryTimeText={styles.deliveryTimeText}
			styleGroupNumber={styles.groupNumber}
			styleUserImage={styles.userImage}
			groupNumberText={styles.groupNumberText}
		/>
	);

	const ListOfGroup = () => (
		<View style={{ marginBottom: 100 }}>
			<FlatList
				data={groupList}
				renderItem={InfoOfGroup}
				keyExtractor={item => item.groupId.toString()}
			/>
		</View>
	);

	return (
		<View style={styles.container}>
			{Header()}
			{SortButtons()}
			{ListOfGroup()}
			<NewGroupButton storeData={storeData} initLocation={location} deliDate={today} />
		</View>
	);
}

// react-native-linear-gradient
// 연한 블루: #EDF2FF
// 진한 블루: #364FC7
// 회색: #F1F3F5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base,
    paddingBottom: SIZES.base * 2.5,
    // borderBottomWidth: 0.3
  },
  backButton: {
    marginLeft: 8,
    fontSize: 42,
  },
  headerLocationText: {
    marginLeft: 50,
    width: '50%',
    ...FONTS2.h2,
  },
  headerDateText: {
    ...FONTS2.body2,
    marginRight: 5,
    alignSelf: 'center',
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
    paddingHorizontal: 10,
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 25,
  },
  headerButtonText: {
    ...FONTS2.body3,
  },
  mainView: {
    backgroundColor: '#eee',
    flex: 1,
    borderTopColor:'#000',
    borderTopWidth: 2,
    paddingTop: 10,
  },
  groupInfo:{
    flexDirection: 'row',
    marginLeft:10,
    marginVertical: 15,
    alignItems: 'center',
  },
  logoImage:{
    width: 45,
    height:45,
    marginHorizontal: 10,
  },
  shopText:{
    fontSize:20,
    fontWeight:'bold',
  },
  rating:{
    flexDirection: 'row',
    alignItems:'center',
  },
  starImage:{
    width: 17,
    height:17,
    marginRight:5,
  },
  rateText:{
    fontSize: 16,
  },
  timeImage:{
    width: 17,
    height:17,
  },
  deliveryTime:{
    flexDirection: 'row',
    alignItems:'center',
  },
  deliveryTimeText:{
    fontSize:16,
  },
  userImage:{
    width: 20,
    height:20,
  },
  groupNumber:{
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#1e1e1e',
    borderWidth: 2,
    borderRadius: 35,
    position: 'absolute',
    right: 5,
  },
  groupNumberText:{
    marginLeft:10,
    fontSize:16,
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
  newGroupView:{
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
  logoStyle:{
    width: 15,
    height: 15,
    tintColor: COLORS.white,
    marginRight: SIZES.padding,
  },
  newGroupTextView:{
    flex: 1,
    alignItems: 'center',
  },
  newGroupText:{
    ...FONTS.body4,
    color: COLORS.white,
  },
});
