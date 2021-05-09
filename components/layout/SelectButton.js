/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FONTS2, SIZES, COLORS } from '../../constants';
import { reverseGeocode } from '../../utils/helper';

const SelectButton = ({navigation, deliveryPlace, setDeliveryPlace, setIsSelected}) => {

    return (
        <View style={styles.containerPosition}>
            <View style={styles.container}>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#1c7ed6'}]}
                    onPress={ () => {
                        const tmpLocation = {latitude: deliveryPlace.latitude, longitude: deliveryPlace.longitude}
                        if (!deliveryPlace) {
                            Alert.alert('핀을 움직여 배달 장소를 선택해주세요.');
                        } else {
                            reverseGeocode(tmpLocation).then( async (result) => {
                                await setDeliveryPlace(result);
                                await setIsSelected(true);
                            });
                        }
                    }}
                >
                    <Text style={{...FONTS2.h5, color: COLORS.white}}>선택</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: COLORS.secondary}]}
                    onPress={ () => navigation.goBack()}
                >
                    <Text style={{...FONTS2.h5, color: COLORS.white}}>취소</Text>

                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerPosition: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: SIZES.width * 0.8,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding * 1,
        borderRadius: SIZES.radius,
    },
    buttonView: {
        flexDirection: 'row',
        margin: SIZES.padding,
        justifyContent: 'space-between',
    },
    button: {
        height: 40,
        width: SIZES.width * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});


export default SelectButton;
