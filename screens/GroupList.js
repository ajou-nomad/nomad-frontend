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
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants';

import GroupInfo from '../components/GroupInfo';
import NewGroupButton from '../components/map/NewGroupButton';


export default function GroupList({navigation, route}) {

  const location = route.params.group.location;
  const back = route.params.back;
  const today = route.params.today;
  const groupList = route.params.group.groupList;



  const goBack = () => {
    navigation.navigate(back);
  };

  const sortPeople = () => {
    groupList.sort((prev,next)=>(prev.max-prev.current)>(next.max-next.current) ? 1 : (prev.max-prev.current) === (next.max-next.current) ? (parseInt(prev.time.replace(':','')))>(parseInt(next.time.replace(':',''))) ? 1 : -1 : -1)
    alert('인원순 정렬');
  };

  const sortTime = () => {
    groupList.sort((prev,next)=>(parseInt(prev.time.replace(':','')))>(parseInt(next.time.replace(':',''))) ? 1 : (parseInt(prev.time.replace(':',''))) === (parseInt(next.time.replace(':',''))) ? (prev.max-prev.current) > (next.max-next.current) ? 1 : -1 : -1)
    alert('시간순 정렬');
  };

  const Header = () =>{
    return (
      <View style={styles.headerText}>
        <TouchableOpacity
          onPress={() => {goBack();}}
          >
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.headerLocationText}>{location.buildingName}</Text>
        <Text style={styles.headerDateText}>{today}</Text>
      </View>
    );
  };

  const SortButtons = () =>{
    return (
      <View style={styles.headerButtons}>
        <TouchableOpacity
          onPress={() => {sortPeople();}}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>인원순</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {sortTime();}}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>시간순</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const InfoOfGroup = ({item}) =>(
          <GroupInfo
            logo={item.logo}
            rate={item.rate}
            time={item.time}
            current={item.current}
            max={item.max}
            storeInfo={item.store}
            deliDate={today}
            location={location}
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
      <View style={{marginBottom: 100}}>
        <FlatList
          data={groupList}
          renderItem={InfoOfGroup}
          keyExtractor={item => item.groupId.toString()}
        />
      </View>
    );

  return (
    <>
      {Header()}
      {SortButtons()}
      {ListOfGroup()}
      <NewGroupButton initLocation={location} deliDate={today}/>
    </>
  );
}

// react-native-linear-gradient
// 연한 블루: #EDF2FF
// 진한 블루: #364FC7
// 회색: #F1F3F5

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
    fontSize: 24,
    marginLeft: 50,
    width: '50%',
  },
  headerDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    right: 10,
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
