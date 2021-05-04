/* eslint-disable prettier/prettier */


import React, {useRef} from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const MiniMap = ({location, prevScreen}) => {

    const mapView = useRef();

    return (
        <MapView
            ref={mapView}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0045,
                longitudeDelta: 0.0045,
            }}
        >
            <Marker
                draggable
                coordinate={location}
                onDragEnd={(e) => {console.log('dragEnd', e.nativeEvent.coordinate)}}
            />
        </MapView>

    );

}

export default MiniMap;
