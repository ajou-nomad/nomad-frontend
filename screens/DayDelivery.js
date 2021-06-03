/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS, FONTS2} from '../constants';
import GoogleMap from '../components/map/GoogleMap';
import { currentLocation, getDaliyGroupData, getData } from '../utils/helper';
import PlusButton from '../components/map/PlusButton';
import axiosApiInstance from '../utils/axios';
import GpsButton from '../components/map/GpsButton';
import NewGroupButton from '../components/map/NewGroupButton';



const DayDelivery = ({ route, navigation }) => {

  const [responseDailyData,setResponseDailyData] = useState([]);
  const [responseStoreData,setResponseStoreData] = useState([]);

  const [location, setLocation] = useState(null);

  let today = new Date();
  today.setHours(today.getHours() + 9);
  today = JSON.stringify(today).substr(1,10);


  const setCurrentLocation = (result) => {
    setLocation(result);
  };

  const getAxiosData = async () => {

    //  async Data 받아올 때
    // await getDaliyGroupData().then((reponse) =>
    //   setResponseDailyData(reponse)
    // );
    // await getData('storeData').then( (response) =>
    //   setResponseStoreData(response)
    // );

    await axiosApiInstance.get('/dailyGroupList').then((res) => {
        // console.log(JSON.stringify(res.data,null,4));

        if (res.data.groupData.length !== 0) {
            let groupData = res.data.groupData.map((group) => {
                // 해당 group안에 storeData insert
                let storeData = res.data.storeData.filter((store) => store.storeId === group.storeId);
                group.store = storeData[0];

                return group;
            });

            setResponseDailyData(groupData);
        } else {
            console.log('get /dailyGroupData가 아직 없습니다.');
            setResponseDailyData([]);
        }

        // console.log('체크:: ', JSON.stringify(res.data, null, 4));
    }).catch(e => {
        console.log('에러:: ', e);
    });

    await axiosApiInstance.get('storeList').then((response) => {

        // console.log(JSON.stringify(response.data.data, null, 4));
        setResponseStoreData(response.data.data);
    }).catch( error => console.log("스토어리스트"+error));
  };



  useEffect(() => {

    // 해당 화면 올때마다 최신 데이터 불러오기
    const unsubscribe = navigation.addListener('focus', async () => {
        getAxiosData().then((data) => {
            console.log('axiosData들은 받아왔고');
        });
    });

    if (route.params?.post) {
        console.log('검색한 위치 저장 완료');
        setLocation(route.params.post);
    } else {
        currentLocation().then((result)=> {
            console.log('현재위치 저장 완료');
            setCurrentLocation(result);
        }).catch(
            e => console.log(e)
        );
    }

    // //장소 고정 테스트용
    // let location = {
    // latitude: 37.284696906069975,
    // longitude: 127.04438918710983,
    // address: '아주대학교 팔달관',
    // };
    // setCurrentLocation(location);

    return unsubscribe;
  }, [route.params?.post] );

  // 검색 창 헤더
  const renderDestinationHeader = () => {
    return (
      <TouchableOpacity
        style={styles.destinationHeader}
        onPress={() => navigation.navigate('SearchPlace', {prevScreen: 'DayDelivery'})}
      >
        <View style={styles.destinationHeaderView}>
          <View style={{position: 'absolute',  left: 15}}>
            <Image
              source={icons.google_marker}
              style={{
                width: 25,
                height: 25,
                marginRight: SIZES.padding,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginHorizontal:  30,
            }}>
            <Text numberOfLines={1} style={{...FONTS2.body4}}>{location.address}</Text>
          </View>
          <View style={{position: 'absolute',  right: 10}}>
            <Image
              source={icons.mic}
              style={{
                width: 20,
                height: 20,
                marginRight: SIZES.padding,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={{flex: 1}}>
      { (location) ? (
        <View style={{flex: 1}}>
          <GoogleMap initLocation={location} back="DayDelivery" today={today} groupData = {responseDailyData} storeData= {responseStoreData} />
          { renderDestinationHeader() }
          <PlusButton
            style={{ bottom: SIZES.height * 0.08, right:  SIZES.width * 0.08 }}
            setLocation={setCurrentLocation}
            initLocation={location}
            deliDate={today}
            storeData={responseStoreData}
          />
          <NewGroupButton initLocation={location} deliDate={today} storeData={responseStoreData} />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  destinationHeader: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
    flex: 1,

  },
  destinationHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width * 0.85,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    elevation: 5,
    opacity: 0.9,
  },
});

export default DayDelivery;
