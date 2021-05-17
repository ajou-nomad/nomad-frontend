/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES, FONTS } from '../../constants';
import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';


const CustomMarker = ({item, back, today, items}) => {

    const navigation = useNavigation();

    return (
        back === 'DayDelivery' ? (
            <Marker
                coordinate={{ latitude : item.location.latitude, longitude : item.location.longitude }}
                onPress={() => navigation.navigate('GroupList',{back: back, group: item, today: today})}
            >
                <View style={styles.markerView}>
                    {/* marker 매장명 */}
                    <View style={styles.buildingName}>
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
                    {/* marker 배달그룹 상위 목록 */}
                    {/* <View style={styles.groupList}>
                        <View style={{flex: 1, paddingHorizontal: 5, justifyContent: 'center'}}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'AirbnbCereal-Bold.ttfs',
                                    fontSize: SIZES.body5,
                                }}
                            >
                            9:00 스타벅스
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'AirbnbCereal-Bold.ttfs',
                                    fontSize: SIZES.body5,
                                }}
                            >
                            9:00 할리스커피
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'AirbnbCereal-Bold.ttfs',
                                    fontSize: SIZES.body5,
                                }}
                            >
                            9:00 파리바게트
                            </Text>
                        </View>
                    </View> */}
                </View>
            </Marker>
        ) : (
            <Marker
                coordinate={{ latitude : item.location.latitude, longitude : item.location.longitude }}
                onPress={() => navigation.navigate('TimeTable',{back:back, group: item, items: items})}
            >
                <View style={styles.markerView}>
                    {/* marker 매장명 */}
                    <View style={styles.buildingNameWeek}>
                        <Text
                            numberOfLines={1}
                            style={{
                            ...FONTS.body3,
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
        height: 75,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buildingName: {
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
