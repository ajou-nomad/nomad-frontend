/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SIZES, FONTS, icons } from '../../constants';
import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';


const CustomMarker = ({item, back, today, items, storeData}) => {

    const navigation = useNavigation();

    return (
        back === 'DayDelivery' ? (
            <Marker
                coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }}
                onPress={() => navigation.navigate('GroupList', { back: back, group: item, today: today, storeData: storeData })}
            >
                <View style={styles.markerView}>
                    {/* marker 매장명 */}
                    <View style={styles.buildingName}>
                        <View style={{ width: 25, height: 25, backgroundColor: 'white', borderRadius: SIZES.radius * 3, justifyContent: 'center', alignItems: 'center' }}>

                            <Image
                                source={icons.cutlery}
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: '#1c7ed6',
                                }}

                            />
                        </View>
                        <Text
                            numberOfLines={1}
                            style={{
                                ...FONTS.body4,
                                marginLeft: 10,
                                color: 'white',
                            }}
                        >
                            {item.location.buildingName}
                        </Text>
                    </View>
                </View>
            </Marker>
        ) : (
            <Marker
                coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }}
                onPress={() => navigation.navigate('TimeTable', { back: back, group: item, items: items, storeData: storeData })}
            >
                 <View style={styles.markerView}>
                    {/* marker 매장명 */}
                    <View style={styles.buildingName}>
                        <Text
                            numberOfLines={1}
                            style={{
                                ...FONTS.body4,
                                // marginLeft: 10,
                                color: 'white',
                            }}
                        >
                            {item.location.buildingName}
                        </Text>
                    </View>
                </View>
            </Marker>
        )
    );
};



const styles = StyleSheet.create({

    markerView: {
        height: 30,
        width: 90,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    buildingName: {
        position: 'absolute',
        top: 0,
        height: 30,
        width: 90,
        borderRadius: SIZES.radius * 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c7ed6',
        padding: 10,
        borderColor: '#1c7ed6',
        borderWidth: 1,
        flexDirection: 'row',
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
    },
    groupList: {
        position: 'absolute',
        top: 25,
        flex: 1,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
});

export default CustomMarker;
