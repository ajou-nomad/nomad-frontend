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
import {icons, COLORS, SIZES, FONTS} from '../constants';
import GoogleMap from '../components/map/GoogleMap';
import NewGroupButton from '../components/map/NewGroupButton';
import GpsButton from '../components/map/GpsButton';
import { currentLocation, getWeeklyGroupData, getData } from '../utils/helper';

const ItemsForCreateGroupDetailDayPicker = () => {
    const todayFullDate = new Date();
    todayFullDate.setDate(todayFullDate.getDate() + 1);
    if (todayFullDate.getDay() === 0) {
      todayFullDate.setDate(todayFullDate.getDate() + 1);
    } else if (todayFullDate.getDay() === 6) {
      todayFullDate.setDate(todayFullDate.getDate() + 2);
    }
    const todayDay = todayFullDate.getDay();
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
    const dayArrayKorFixed = [...dayArrayKor.slice(todayDayIndex), ...dayArrayKor.slice(0, todayDayIndex)]

    return [dayArrayKorFixed, dateDifference]

};

const WeeklyDelivery = ({ route, navigation }) => {

  const [location, setLocation] = useState();

  const [responseWeeklyData,setResponseWeeklyData] = useState();
  const [responseStoreData,setResponseStoreData] = useState();


  const setCurrentLocation = (result) => {
    setLocation(result);
  };

  useEffect(() => {

    const getAxiosData = async () => {

      await getWeeklyGroupData().then((reponse)=>
        setResponseWeeklyData(reponse)
      );
      // await getData('storeData').then( (response) =>
      //   setResponseStoreData(response)
      // );
      // await axiosApiInstance.get("storeList").then((response) => {
      //   console.log(response);
      // });
    };

    getAxiosData().then((data) => {
      console.log("axiosData들은 받아왔고");
      // navigation.goBack()에서 params 넘길 때 안넘길 때 구분
      if (route.params?.post) {
        setLocation(route.params.post);
      } else {

        currentLocation()
        .then((result)=> {
          setCurrentLocation(result);
          console.log('현재위치 저장 완료');
        })
        .catch(e => console.log(e));
      }
    });
  }, [route.params?.post]);

  // 검색 창 헤더
  const renderDestinationHeader = () => {
    return (
      <TouchableOpacity
        style={styles.destinationHeader}
        onPress={() => navigation.navigate('SearchPlace', { prevScreen: 'WeeklyDelivery' })}
      >
        <View style={styles.destinationHeaderView}>
          <Image
            source={icons.search}
            style={{
              width: 20,
              height: 20,
              marginRight: SIZES.padding,
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Text style={{ ...FONTS.body3 }}>{location.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  const [dayArrayKorFixed, dateDifference] = ItemsForCreateGroupDetailDayPicker()



  return (
    <View style={{ flex: 1 }}>
      { location ? (
        <View style={{flex: 1}}>
          <GoogleMap initLocation={location} back="WeeklyDelivery" groupData={responseWeeklyData} storeData={responseStoreData} />
          { renderDestinationHeader() }
          <GpsButton setLocation={setCurrentLocation} />
          <NewGroupButton storeData={responseStoreData} initLocation={location} deliDate={null} datePicker={[dayArrayKorFixed,dateDifference]} />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
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
  },
});

export default WeeklyDelivery;
