/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {icons, COLORS, SIZES, FONTS, keys} from '../constants';
import GoogleMap from '../components/map/GoogleMap';
import NewGroupButton from '../components/map/NewGroupButton';
import GpsButton from '../components/map/GpsButton';
import { currentLocation } from '../utils/helper';



const Home = (props,{navigation}) => {

  const [location, setLocation] = useState();
  const IsWeekly = props.route.params.IsWeekly;

  useEffect( () => {

    //현재 위치동의 및 받아오기
    async function fetchLocation() {
      await currentLocation(setLocation);
    }

    // fetchLocation();

    //임시
    setLocation({            
      latitude: 37.284696906069975,
      longitude: 127.04438918710983
    })
  }, [])

  // 주소 검색시 사용할 예정
  const fetchAddress = () => {
    console.log('fetch 할 예정');

    // fetch('"https://api.mapbox.com/directions/v5/mapbox/driving/' + location.latitude + ',' + location.longitude + ";"
    // + "37.494371" + ',' + "127.010282"
    //     + '?access_token=' + 'pk.eyJ1IjoiamlzZW9uZy0iLCJhIjoiY2ttcHg3c2VzMGdmcTJ1bnNxbnhmbzdyZSJ9.JkWVnm71CZRX_eaN_SehwQ')

    // fetch("https://api.mapbox.com/directions/v5/mapbox/driving/127.044398,37.284547;127.043885,37.275343?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiamlzZW9uZy0iLCJhIjoiY2ttcHg3c2VzMGdmcTJ1bnNxbnhmbzdyZSJ9.JkWVnm71CZRX_eaN_SehwQ")

    // .then((response) => response.json())
    // .then((responseJson) => {
    //     console.log(responseJson);
    // }).catch((err) => console.log( err));

    // Geocoder.from(location.latitude, location.longitude)
    // .then(json => {
    // 		var addressComponent = json.results[0].formatted_address;
    // 	console.log(addressComponent);
    // })
    // .catch(error => console.warn(error));

    //     fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.latitude + ',' + location.longitude
    //     + '&key=' + GOOGLE_API_KEY + '&language=ko')
    // .then((response) => response.json())
    // .then((responseJson) => {
    //     console.log('udonPeople ' + responseJson.results[0].formatted_address);
    // }).catch((err) => console.log("udonPeople error : " + err));

    // Search by address
    // Geocoder.from("아주대학교 팔달관")
    // .then(json => {
    //     var location = json.results[0];
    //     console.log(location);
    // })
    // .catch(error => console.warn(error));

    // // Search by address, with a biased geo-bounds
    // Geocoder.from("Pyramid", {
    // southwest: {lat: 36.05, lng: -115.25},
    // northeast: {lat: 36.16, lng: -115.10}})
    // .then(json => {
    //     var location = json.results[0].geometry.location;
    //     console.log(location);
    // })
    // .catch(error => console.warn(error));
  };

  
  // 검색 창 헤더
  const renderDestinationHeader = () => {
    return (
      <TouchableOpacity style={styles.destinationHeader}>
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
            <Text style={{...FONTS.body3}}>아주대학교 팔달관</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      { location ? (
        <View style={{flex: 1}}>
          <GoogleMap IsWeekly={IsWeekly} location={location} />
          { renderDestinationHeader() }
          <GpsButton />
          <NewGroupButton item={{back:'home'}}/>
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
    width: SIZES.width * 0.8,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    elevation: 5,
  }
});

export default Home;
