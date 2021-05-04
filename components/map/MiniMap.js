/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */


import React, {useRef} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const MiniMap = ({location, setDeliveryPlace, prevScreen}) => {

    const mapView = useRef();

    return (
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
        >
            <Marker
                draggable
                coordinate={location}
                onDragEnd={(e) => setDeliveryPlace(e.nativeEvent.coordinate)}
            />
        </MapView>

    );
};

export default MiniMap;
