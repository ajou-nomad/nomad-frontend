/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SIZES, FONTS, icons, FONTS2 } from '../../constants';
import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';


const CustomMarker = ({item, back, today, items, storeData}) => {

    const navigation = useNavigation();

    return (
        back === 'DayDelivery' ? (
            <Marker
                coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }}
                onPress={() => navigation.navigate('GroupList', { back: back, group: item, today: today, storeData: storeData })}
            >
            <View style={styles.markerContainer}>
                <View style={styles.arrowTop}>
                    <View style={styles.arrowView}>
                        <View style={styles.imageView}>
                            <Image
                                source={icons.flag}
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: '#1c7ed6',
                                }}

                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    ...FONTS2.body4,
                                    color: 'white',
                                }}
                            >
                                {item.location.buildingName}
                            </Text>
                        </View>
                    </View>
                </View>
                <Svg style={styles.arrowBottom} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                        d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                        fill="#1c7ed6"
                        x="0"
                        y="0"
                    />
                </Svg>
            </View>
            </Marker>
        ) : (
            <Marker
                coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }}
                onPress={() => navigation.navigate('TimeTable', { back: back, group: item, items: items, storeData: storeData })}
            >
            <View style={styles.markerContainer}>
                <View style={styles.arrowTop}>
                    <View style={styles.arrowView}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    ...FONTS.body4,
                                    color: 'white',
                                }}
                            >
                                {item.location.buildingName}
                            </Text>
                    </View>
                </View>
                <Svg style={styles.arrowBottom} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                        d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                        fill="#1c7ed6"
                        x="0"
                        y="0"
                    />
                </Svg>
            </View>
            </Marker>
        )
    );
};



const styles = StyleSheet.create({

    markerContainer: {
        flex: 1,
        height: SIZES.height * 0.06,
    },
    arrowTop: {
        flex: 1,
        height: SIZES.height * 0.05,
        width: 100,
        opacity: 0.95,
        elevation: 5,
    },
    arrowBottom: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        opacity: 0.95,
        elevation: 5,
        zIndex: -1,
    },
    arrowView: {
        position: 'absolute',
        opacity: 0.95,
        elevation: 5,
        top: 0,
        height: SIZES.height * 0.05,
        width: 100,
        borderRadius: SIZES.radius * 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#1c7ed6',
        padding: 10,
        borderColor: '#1c7ed6',
        borderWidth: 1,
        flexDirection: 'row',
    },
    imageView: {
        width: 25,
        height: 25,
        backgroundColor: 'white',
        borderRadius: SIZES.radius * 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    buildingNameWeek:{
        position: 'absolute',
        top: 0,
        height: 50,
        width: 90,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c7ed6',
        padding: 10,
    }
});

export default CustomMarker;
