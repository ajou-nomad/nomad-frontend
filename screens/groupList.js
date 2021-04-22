/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import GroupInfo from '../components/groupInfo';


export default function GroupList(props) {


  const goBack = () => {
    alert('뒤로가기');
  };

  const sortPeople = () => {
    alert('인원순 정렬');
  };

  const sortTime = () => {
    alert('시간순 정렬');
  };

  const logo_image = require('../assets/icons/search.png');
  return (
    <>
      <View style={styles.headerText}>
        <TouchableOpacity
          onPress={() => {goBack();}}
          >
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.headerLocationText}>{/*props.location*/{location:'아주대학교 팔달관'}.location}</Text>
        <Text style={styles.headerDateText}>{/*props.date*/{date:'2021.04.21'}.date}</Text>
      </View>
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
      <ScrollView style={styles.mainView}>
        <View>
          <GroupInfo
            logo={'gps'}
            shopName={'GranPa\'s Stakehouse'}
            rate={4.5}
            time={'9:00'}
            current={6}
            max={10}
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
          <GroupInfo
            logo={'minus'}
            shopName={'Min&Us'}
            rate={3.0}
            time={'9:00'}
            current={2}
            max={5}
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
          <GroupInfo
            logo={'home'}
            shopName={'HomeSweetHome'}
            rate={4.0}
            time={'9:00'}
            current={2}
            max={10}
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
          <GroupInfo
            logo={'gps'}
            shopName={'GranPa\'s Stakehouse'}
            rate={4.5}
            time={'9:00'}
            current={6}
            max={10}
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
          <GroupInfo
            logo={'minus'}
            shopName={'Min&Us'}
            rate={3.0}
            time={'9:00'}
            current={2}
            max={5}
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
          <GroupInfo
            logo={'home'}
            shopName={'HomeSweetHome'}
            rate={4.0}
            time={'9:00'}
            current={2}
            max={10}
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
          <GroupInfo
            logo={'gps'}
            shopName={'GranPa\'s Stakehouse'}
            rate={4.5}
            time={'9:00'}
            current={6}
            max={10}
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
          <GroupInfo
            logo={'minus'}
            shopName={'Min&Us'}
            rate={3.0}
            time={'9:00'}
            current={2}
            max={5}
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
          <GroupInfo
            logo={'home'}
            shopName={'HomeSweetHome'}
            rate={4.0}
            time={'9:00'}
            current={2}
            max={10}
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
          <GroupInfo
            logo={'gps'}
            shopName={'GranPa\'s Stakehouse'}
            rate={4.5}
            time={'9:00'}
            current={6}
            max={10}
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
          <GroupInfo
            logo={'minus'}
            shopName={'Min&Us'}
            rate={3.0}
            time={'9:00'}
            current={2}
            max={5}
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
          <GroupInfo
            logo={'home'}
            shopName={'HomeSweetHome'}
            rate={4.0}
            time={'9:00'}
            current={2}
            max={10}
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
        </View>
      </ScrollView>
      <View style={styles.newGroupView}>
        <TouchableOpacity
          style={styles.newGroup}
          onPress={() => {
            alert('새로운 그룹');
          }}>
          <Text style={styles.newGroupText}>
            <Image style={styles.logoStyle} source={logo_image} />
            원하는 조건이 없나요?
          </Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: 'bold',
    marginLeft: 50,
  },
  headerDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
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
  newGroupView:{
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
  },
  newGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#364FC7',
    borderRadius: 10,
    width: 220,
    height: 40,
  },
  logoStyle:{
    width: 25,
    height: 25,
  },
  newGroupText: {
    color:'#fff',
    fontSize: 18,
  },
});
