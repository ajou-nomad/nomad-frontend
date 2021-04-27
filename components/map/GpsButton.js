import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Alert } from 'react-native';
import { icons, COLORS, SIZES } from '../../constants';

const GpsButton = () => {
    return (
        <TouchableOpacity 
          style={styles.gpsButton}
          onPress={() =>
            Alert.alert('실시간위치 받아올 때 사용', 'My Alert Msg', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ])
          }
        >
          <View style={styles.gpsButtonView}>
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
      paddingVertical: SIZES.padding * 1.6,
      paddingHorizontal: SIZES.padding * 1.6,
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.white,
      opacity: 0.85,
      elevation: 5,
    },  
});

export default GpsButton;
