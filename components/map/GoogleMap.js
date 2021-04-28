/* eslint-disable prettier/prettier */

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { calculateDistance } from '../../utils/helper';
import React, { useRef } from 'react';
import CustomMarker from './CustomMarker';


const GoogleMap = ({IsWeekly, location}) => {

    const mapView = useRef();

    const tempLocation = [
    {
        coordinate: { latitude: 37.284528586547374, longitude: 127.04435940777411},
        address: '팔달관',
    },
    {
      coordinate: {latitude: 37.283726853365536, longitude: 127.0438289689633},
        address: '동관',
    },
    {
        coordinate: {latitude: 37.284453045452366, longitude: 127.04580798024215},
        address: '기숙사식당',
    },
    {
        coordinate: {latitude: 37.5000145, longitude: 127.0090984},
        address: '먼 곳',
    },
    ];
    //------------------------------



    // 500m 이내 마커만 표시
    const filteredMarkers = tempLocation.filter( (marker) => {
        return calculateDistance(location.latitude, location.longitude, marker.coordinate.latitude, marker.coordinate.longitude) <= 500;
    });


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
            { filteredMarkers.map((item, idx) => (
                <CustomMarker key={idx} item={item} IsWeekly={IsWeekly} />
            ))}
        </MapView>
    );
};

export default GoogleMap;
