/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */


import React, {useRef} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { icons } from '../../constants';
const MiniMap = ({location, onPlaceChange, prevScreen}) => {

    const mapView = useRef();


    return (
        <>
        {onPlaceChange ? (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapView}
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0033,
                        longitudeDelta: 0.0033,
                    }}
                    onRegionChangeComplete={(region)=> {
                        delete region.latitudeDelta;
                        delete region.longitudeDelta;
                        onPlaceChange(region);
                    }}
                />
                <View style={styles.markerFixed}>
                    <Image style={styles.marker} source={icons.pin} />
                </View>
            </View>

        ) : (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapView}
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0033,
                        longitudeDelta: 0.0033,
                    }}
                />
                <View style={styles.markerFixed}>
                    <Image style={styles.marker} source={icons.pin} />
                </View>
            </View>
        )}
        </>
    );
};

const styles = StyleSheet.create({
    markerFixed: {
        top: '50%',
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
    },
    marker: {
        height: 48,
        width: 48,
    },
});

export default MiniMap;
