/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';

import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {icons, COLORS, SIZES, FONTS, keys} from '../constants';

Geocoder.init(keys.GOOGLE_API_KEY, {language: 'ko'});

const Home = ({navigation}) => {
  //임시 location-----------------
  const [location, setLocation] = useState({
    latitude: 37.4978145,
    longitude: 127.0036984,
  });

  const tempLocation = [
    {
      coordinate: {latitude: 37.4978145, longitude: 127.0036984},
      address: '팔달관',
    },
    {
      coordinate: {latitude: 37.4973145, longitude: 127.0046984},
      address: '에너지센터',
    },
    {
      coordinate: {latitude: 37.4958145, longitude: 127.0016984},
      address: '긴경우생략으로보여집니다',
    },
  ];
  //------------------------------

  const mapView = useRef();
  // const [location, setLocation] = useState(null);

  // platform에 따른 위치 동의요청
  async function requestPermission() {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }

      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Dutch Delivery App required Location permission',
            message: 'Dutch Delivery App access to your location ',
            buttonPositive: 'ok',
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  // useEffect(() => {
  //     requestPermission().then( result => {
  //         if (result === 'granted') {
  //             console.log( "You can use the ACCESS_FINE_LOCATION" );
  //             Geolocation.getCurrentPosition(
  //                 position => {
  //                     setLocation(position.coords);

  //                 },
  //                 error => {
  //                     console.log(error);
  //                 },
  //                 {
  //                     enableHighAccuracy: true,
  //                     timeout: 30000,
  //                     maximumAge: 10000
  //             });
  //         }
  //         else {
  //             console.log( "ACCESS_FINE_LOCATION permission denied" );
  //         };
  //     });

  // }, [])

  // 주소 검색시 사용할 예정
  const fetchAddress = () => {
    console.log('fetch start');

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

  const renderMap = () => {
    const destinationMarker = () =>
      tempLocation.map((item, idx) => (
        <Marker key={idx} coordinate={item.coordinate}>
          {/* custom marker */}
          <View
            style={{
              height: 70,
              width: 90,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* marker 매장명 */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                height: 25,
                width: 90,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1c7ed6',
                padding: 10,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  ...FONTS.body4,
                  color: 'white',
                }}>
                {item.address}
              </Text>
            </View>
            {/* marker 배달그룹 상위 목록 */}
            <View
              style={{
                position: 'absolute',
                top: 25,
                height: 45,
                width: 90,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              <View style={{flex: 1, paddingHorizontal: 5}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'AirbnbCereal-Bold.ttfs',
                    fontSize: SIZES.body5,
                  }}>
                  9:00 스타벅스
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'AirbnbCereal-Bold.ttfs',
                    fontSize: SIZES.body5,
                  }}>
                  9:00 할리스커피
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'AirbnbCereal-Bold.ttfs',
                    fontSize: SIZES.body5,
                  }}>
                  9:00 파리바게트
                </Text>
              </View>
            </View>
          </View>
          {/* <View
                        style={{
                            flexDirection: 'row',
                            height: 30,
                            width: 90,
                            borderRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#3897f1',
                            padding: 10,
                        }}
                    >
                        <View>
                            <Text
                                numberOfLines={1}
                                style={{
                                    // marginLeft: 5,
                                    ...FONTS.body4,
                                    color: 'white'
                                }}
                            >{item.address}</Text>

                        </View>
                    </View>

                    // custom marker 클릭 시
                    <Callout>
                        <View
                            style={{
                                flex: 1,

                            }}
                        >
                            <Image
                                source={icons.building}
                                style={{
                                    width: 11,
                                    height: 11,
                                    tintColor: COLORS.primary
                                }}
                            />
                            <Text>매장 1111111111111111111111</Text>
                            <Image
                                source={icons.building}
                                style={{
                                    width: 11,
                                    height: 11,
                                    tintColor: COLORS.primary
                                }}
                            />
                            <Text>매장 22222222222222</Text>
                        </View>
                    </Callout> */}
        </Marker>
      ));

    return (
      <View style={{flex: 1}}>
        {location ? (
          <MapView
            ref={mapView}
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0075,
              longitudeDelta: 0.0075,
            }}>
            {/* 생성된 그룹 장소 마커 표시 */}
            {destinationMarker()}

            {/* 검색 기능으로 사용할 예정 */}
            {fetchAddress()}
          </MapView>
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
      </View>
    );
  };

  // 검색 창 헤더
  const renderDestinationHeader = () => {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          left: 0,
          right: 0,
          height: 50,
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: SIZES.width * 0.8,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            elevation: 5,
          }}>
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
            <Text style={{...FONTS.body3}}>아주대학교 에너지센터</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGpsButton = () => {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 5,
          alignItems: 'center',
          flex: 1,
        }}
        onPress={() =>
          Alert.alert('실시간위치 받아올 때 사용', 'My Alert Msg', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ])
        }>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            elevation: 5,
          }}>
          <Image
            source={icons.gps}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const searchIcon = require('../assets/icons/search.png');
  const createNewGroup = () => {
      return(
        <View style={styles.newGroupView}>
          <TouchableOpacity
            style={styles.newGroup}
            onPress={() => {
              alert('새로운 그룹');
            }}>
            <Text style={styles.newGroupText}>
              <Image style={styles.logoStyle} source={searchIcon} />
              원하는 조건이 없나요?
            </Text>
          </TouchableOpacity>
        </View>
      )
  }

  return (
    <View style={{flex: 1}}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderGpsButton()}
      {createNewGroup()}
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
    backgroundColor: '#1c7ed6',
    borderRadius: 10,
    width: 220,
    height: 40,
  },
  logoStyle:{
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  newGroupText: {
    color:'#fff',
    fontSize: 18,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
});

export default Home;
