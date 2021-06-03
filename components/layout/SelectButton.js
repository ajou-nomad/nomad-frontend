/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FONTS2, SIZES, COLORS } from '../../constants';
import { reverseGeocode } from '../../utils/helper';

const SelectButton = ({deliveryPlace, setDeliveryPlace, setIsSelected}) => {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={ () => {
                if (!deliveryPlace) {
                    Alert.alert('핀을 움직여 배달 장소를 선택해주세요.');
                } else {
                    reverseGeocode({latitude: deliveryPlace.latitude, longitude: deliveryPlace.longitude})
                        .then( async (result) => {
                            await setDeliveryPlace(result);
                            await setIsSelected(true);
                        });
                }
            }}
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>{'이 위치로 장소 설정'}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        alignSelf: 'center',
    },
    button:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding ,
        borderRadius: SIZES.radius * 0.5,
        backgroundColor: '#1c7ed6',
        width: SIZES.width * 0.9,
        height: SIZES.height * 0.055,
        opacity: 0.9,
        elevation: 5,
    },
    buttonText:{
        ...FONTS2.body4,
        color: COLORS.white,
    },
});


export default SelectButton;
