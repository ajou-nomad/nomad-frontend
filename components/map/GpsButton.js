/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { icons, COLORS, SIZES } from '../../constants';
import { currentLocation } from '../../utils/helper';

const GpsButton = ({setLocation}) => {

  const [isExecuting, setIsExecuting] = useState(false);



  return (
      <TouchableOpacity
        disabled={isExecuting}
        style={styles.gpsButton}
        onPress={ () => {
          setIsExecuting(true);
          currentLocation()
          .then((result)=> {
            console.log("현재위치 불러오기 성공");
            setIsExecuting(false);
            setLocation(result);
          })
          .catch(e => {
            console.log(e);
            setIsExecuting(false);
          });

          // // 나중에 수정해줘야 할 부분 위치 지정 후 버튼 활성화.
          // setTimeout(() => setIsExecuting(false), 2000);
        }}
      >
        <View style={[styles.gpsButtonView, isExecuting ? {opacity: 0.5} : {opacity: 0.85}]}>
          <Image
            source={icons.gps}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    gpsButton: {
      position: 'absolute',
      bottom: 10,
      right: 5,
      alignItems: 'center',
    },
    gpsButtonView: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.padding * 1,
      paddingHorizontal: SIZES.padding * 1,
      borderRadius: SIZES.radius * 0.5,
      backgroundColor: COLORS.white,
      elevation: 5,
    },
});

export default GpsButton;
