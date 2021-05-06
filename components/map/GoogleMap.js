/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { calculateDistance } from '../../utils/helper';
import React, { useRef } from 'react';
import CustomMarker from './CustomMarker';
import {icons} from '../../constants';


const GoogleMap = ({initLocation, back}) => {

    const mapView = useRef();


    //------------------------------
    //넘어온 location값은 단지 지도에 표현할려고 하는 값일뿐 실제 그룹 데이터는 아래 데이터 내부에
    //axios를 통해 백엔드에서 생성된 배달그룹을 가져옴.
    const tempGroupData = [
    {
        location: {
            latitude: 37.284528586547374,
            longitude: 127.04435940777411,
            address:'수원시 원천동',
            buildingName: '팔달관',
        },
        // 해당 장소에 생성된 그룹 목록들
        groupList: [
            {
              id: 'shop1',
              logo: icons.donut,
              shopName:'TempName1',
              rate:3.5,
              time:'9:00',
              current:9,
              max:10,
            },
            {
              id: 'shop2',
              logo:icons.pizza,
              shopName:'TempName2',
              rate:4.5,
              time:'9:05',
              current:5,
              max:10,
            },
            {
              id: 'shop3',
              logo:icons.noodle,
              shopName:'TempName3',
              rate:4.0,
              time:'9:10',
              current:7,
              max:10,
            },
            {
              id: 'shop4',
              logo:icons.rice_bowl,
              shopName:'TempName4',
              rate:3.5,
              time:'9:15',
              current:9,
              max:10,
            },
            {
              id: 'shop5',
              logo:icons.salad,
              shopName:'TempName5',
              rate:4.5,
              time:'9:20',
              current:5,
              max:10,
            },
            {
              id: 'shop6',
              logo:icons.sushi,
              shopName:'TempName6',
              rate:4.0,
              time:'9:25',
              current:7,
              max:10,
            },
            {
              id: 'shop7',
              logo:icons.drink,
              shopName:'TempName7',
              rate:3.5,
              time:'09:30',
              current:9,
              max:10,
            },
            {
              id: 'shop8',
              logo:icons.fries,
              shopName:'TempName8',
              rate:4.5,
              time:'09:45',
              current:5,
              max:10,
            },
            {
              id: 'shop9',
              logo:icons.hamburger,
              shopName:'TempName9',
              rate:4.0,
              time:'09:50',
              current:7,
              max:10,
            },
        ],
    },
    {
        location: {
            latitude: 37.283726853365536,
            longitude: 127.0438289689633,
            address:'수원시 원천동',
            buildingName: '동관',
        },
        groupList: [
            {
              id: 'shop1',
              logo: icons.donut,
              shopName:'TempName1',
              rate:3.5,
              time:'9:00',
              current:9,
              max:10,
            },
            {
              id: 'shop2',
              logo:icons.pizza,
              shopName:'TempName2',
              rate:4.5,
              time:'9:05',
              current:5,
              max:10,
            },
            {
              id: 'shop3',
              logo:icons.noodle,
              shopName:'TempName3',
              rate:4.0,
              time:'9:10',
              current:7,
              max:10,
            },
            {
              id: 'shop4',
              logo:icons.rice_bowl,
              shopName:'TempName4',
              rate:3.5,
              time:'9:15',
              current:9,
              max:10,
            },
            {
              id: 'shop5',
              logo:icons.salad,
              shopName:'TempName5',
              rate:4.5,
              time:'9:20',
              current:5,
              max:10,
            },
            {
              id: 'shop6',
              logo:icons.sushi,
              shopName:'TempName6',
              rate:4.0,
              time:'9:25',
              current:7,
              max:10,
            },
            {
              id: 'shop7',
              logo:icons.drink,
              shopName:'TempName7',
              rate:3.5,
              time:'09:30',
              current:9,
              max:10,
            },
            {
              id: 'shop8',
              logo:icons.fries,
              shopName:'TempName8',
              rate:4.5,
              time:'09:45',
              current:5,
              max:10,
            },
            {
              id: 'shop9',
              logo:icons.hamburger,
              shopName:'TempName9',
              rate:4.0,
              time:'09:50',
              current:7,
              max:10,
            },
        ],
    },
    {
        location: {
            latitude: 37.284453045452366,
            longitude: 127.04580798024215,
            address:'수원시 원천동',
            buildingName: '기숙사식당',
        },
        groupList: [
            {
              id: 'shop1',
              logo: icons.donut,
              shopName:'TempName1',
              rate:3.5,
              time:'9:00',
              current:9,
              max:10,
            },
            {
              id: 'shop2',
              logo:icons.pizza,
              shopName:'TempName2',
              rate:4.5,
              time:'9:05',
              current:5,
              max:10,
            },
            {
              id: 'shop3',
              logo:icons.noodle,
              shopName:'TempName3',
              rate:4.0,
              time:'9:10',
              current:7,
              max:10,
            },
            {
              id: 'shop4',
              logo:icons.rice_bowl,
              shopName:'TempName4',
              rate:3.5,
              time:'9:15',
              current:9,
              max:10,
            },
            {
              id: 'shop5',
              logo:icons.salad,
              shopName:'TempName5',
              rate:4.5,
              time:'9:20',
              current:5,
              max:10,
            },
            {
              id: 'shop6',
              logo:icons.sushi,
              shopName:'TempName6',
              rate:4.0,
              time:'9:25',
              current:7,
              max:10,
            },
            {
              id: 'shop7',
              logo:icons.drink,
              shopName:'TempName7',
              rate:3.5,
              time:'09:30',
              current:9,
              max:10,
            },
            {
              id: 'shop8',
              logo:icons.fries,
              shopName:'TempName8',
              rate:4.5,
              time:'09:45',
              current:5,
              max:10,
            },
            {
              id: 'shop9',
              logo:icons.hamburger,
              shopName:'TempName9',
              rate:4.0,
              time:'09:50',
              current:7,
              max:10,
            },
        ],
    },
    {
        location: {
            latitude: 37.5000145,
            longitude: 127.0090984,
            address:'수원시 원천동',
            buildingName: '먼 곳',
        },
        groupList: [
            {
              id: 'shop1',
              logo: icons.donut,
              shopName:'TempName1',
              rate:3.5,
              time:'9:00',
              current:9,
              max:10,
            },
            {
              id: 'shop2',
              logo:icons.pizza,
              shopName:'TempName2',
              rate:4.5,
              time:'9:05',
              current:5,
              max:10,
            },
            {
              id: 'shop3',
              logo:icons.noodle,
              shopName:'TempName3',
              rate:4.0,
              time:'9:10',
              current:7,
              max:10,
            },
            {
              id: 'shop4',
              logo:icons.rice_bowl,
              shopName:'TempName4',
              rate:3.5,
              time:'9:15',
              current:9,
              max:10,
            },
            {
              id: 'shop5',
              logo:icons.salad,
              shopName:'TempName5',
              rate:4.5,
              time:'9:20',
              current:5,
              max:10,
            },
            {
              id: 'shop6',
              logo:icons.sushi,
              shopName:'TempName6',
              rate:4.0,
              time:'9:25',
              current:7,
              max:10,
            },
            {
              id: 'shop7',
              logo:icons.drink,
              shopName:'TempName7',
              rate:3.5,
              time:'09:30',
              current:9,
              max:10,
            },
            {
              id: 'shop8',
              logo:icons.fries,
              shopName:'TempName8',
              rate:4.5,
              time:'09:45',
              current:5,
              max:10,
            },
            {
              id: 'shop9',
              logo:icons.hamburger,
              shopName:'TempName9',
              rate:4.0,
              time:'09:50',
              current:7,
              max:10,
            },
        ],
    },
    ];
    //------------------------------



    // 500m 이내 마커만 표시
    const filteredMarkers = tempGroupData.filter( (marker) => {
        return calculateDistance(initLocation.latitude, initLocation.longitude, marker.location.latitude, marker.location.longitude) <= 500;
    });


    return (
        <MapView
            ref={mapView}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: initLocation.latitude,
                longitude: initLocation.longitude,
                latitudeDelta: 0.0045,
                longitudeDelta: 0.0045,
            }}
        >
            { filteredMarkers.map((item, idx) => (
                <CustomMarker key={idx} item={item} back={back} />
            ))}
            <Marker
                coordinate={initLocation}
                zIndex={-1}
            />
        </MapView>
    );
};

export default GoogleMap;
