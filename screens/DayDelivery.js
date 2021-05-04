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
import { currentLocation } from '../utils/helper';



const DayDelivery = ({ route, navigation }) => {

  const [location, setLocation] = useState(null);
  const IsWeekly = false;


  const setCurrentLocation = (result) => {

    setLocation(result);
  };

  useEffect( () => {

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

  }, [route.params?.post] );

  // 배달원 할 때 참조할 내용
  // const fetchAddress = () => {
  //   console.log('fetch 할 예정');

  //   // fetch('"https://api.mapbox.com/directions/v5/mapbox/driving/' + location.latitude + ',' + location.longitude + ";"
  //   // + "37.494371" + ',' + "127.010282"
  //   //     + '?access_token=' + 'pk.eyJ1IjoiamlzZW9uZy0iLCJhIjoiY2ttcHg3c2VzMGdmcTJ1bnNxbnhmbzdyZSJ9.JkWVnm71CZRX_eaN_SehwQ')

  //   // fetch("https://api.mapbox.com/directions/v5/mapbox/driving/127.044398,37.284547;127.043885,37.275343?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiamlzZW9uZy0iLCJhIjoiY2ttcHg3c2VzMGdmcTJ1bnNxbnhmbzdyZSJ9.JkWVnm71CZRX_eaN_SehwQ")

  //   // .then((response) => response.json())ㄴ
  //   // .then((responseJson) => {
  //   //     console.log(responseJson);
  //   // }).catch((err) => console.log( err));

  //   // Geocoder.from(location.latitude, location.longitude)
  //   // .then(json => {
  //   // 		var addressComponent = json.results[0].formatted_address;
  //   // 	console.log(addressComponent);
  //   // })
  //   // .catch(error => console.warn(error));

  //   //     fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.latitude + ',' + location.longitude
  //   //     + '&key=' + GOOGLE_API_KEY + '&language=ko')
  //   // .then((response) => response.json())
  //   // .then((responseJson) => {
  //   //     console.log('udonPeople ' + responseJson.results[0].formatted_address);
  //   // }).catch((err) => console.log("udonPeople error : " + err));

  //   // Search by address
  //   // Geocoder.from("아주대학교 팔달관")
  //   // .then(json => {
  //   //     var location = json.results[0];
  //   //     console.log(location);
  //   // })
  //   // .catch(error => console.warn(error));

  //   // // Search by address, with a biased geo-bounds
  //   // Geocoder.from("Pyramid", {
  //   // southwest: {lat: 36.05, lng: -115.25},
  //   // northeast: {lat: 36.16, lng: -115.10}})
  //   // .then(json => {
  //   //     var location = json.results[0].geometry.location;
  //   //     console.log(location);
  //   // })
  //   // .catch(error => console.warn(error));
  // };


  // 검색 창 헤더
  const renderDestinationHeader = () => {
    return (
      <TouchableOpacity
        style={styles.destinationHeader}
        onPress={() => navigation.navigate('SearchPlace', {screen: 'DayDelivery'})}
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
            <Text style={{...FONTS.body3}}>{location.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const todayYearMonthDay = JSON.stringify(new Date().toJSON()).substr(1,10);

  return (
    <View style={{flex: 1}}>
      { location ? (
        <View style={{flex: 1}}>
          <GoogleMap IsWeekly={IsWeekly} location={location} back="DayDelivery" today={todayYearMonthDay} />
          { renderDestinationHeader() }
          <GpsButton setLocation={setCurrentLocation} />
          <NewGroupButton initLocation={location} />
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
  },
});

export default DayDelivery;
