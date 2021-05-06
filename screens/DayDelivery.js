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

  // 검색 창 헤더
  const renderDestinationHeader = () => {
    return (
      <TouchableOpacity
        style={styles.destinationHeader}
        onPress={() => navigation.navigate('SearchPlace', {prevScreen: 'DayDelivery'})}
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
            <Text numberOfLines={1} style={{...FONTS.body3}}>{location.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      { location ? (
        <View style={{flex: 1}}>
          <GoogleMap initLocation={location} back="DayDelivery" />
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
