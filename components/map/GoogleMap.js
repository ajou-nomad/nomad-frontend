/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { calculateDistance, getData } from '../../utils/helper';
import React, { useRef,useEffect, useState } from 'react';
import CustomMarker from './CustomMarker';
import {icons} from '../../constants';
import axios from 'axios';
import axiosApiInstance from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDaliyGroupData, getWeeklyGroupData} from '../../utils/helper';



const GoogleMap = ({initLocation, back, today, groupData, storeData}) => {
    
    const mapView = useRef();
    // console.log(JSON.stringify(groupData,null,4));

    const DayDeliveryData = ()=>{
      let tempGroupData_Day = [];

      groupData.map((items,index)=>{
      let InGroupData = 0;

      for (let indexOfTemp = 0; indexOfTemp < tempGroupData_Day.length; indexOfTemp++){
        if ( JSON.stringify(tempGroupData_Day[indexOfTemp].location) === JSON.stringify({
          latitude: items.latitude,
          longitude: items.longitude,
          address: items.address,
          buildingName: items.buildingName,
        })){
          InGroupData = 1;
          tempGroupData_Day[indexOfTemp].groupList.push(
            {
              groupId: items.groupId,
              logo: items.store.logoUrl,
              time: JSON.stringify(items.deliveryDateTime).substr(12,5),
              current: items.current,
              max: items.maxValue,
              store: items.store,
              promotion: items.promotion,
            });
        }
      }
      if (InGroupData === 0){
        tempGroupData_Day = [...tempGroupData_Day,{
        location:{
          latitude: items.latitude,
          longitude: items.longitude,
          address: items.address,
          buildingName: items.buildingName,
        },
        groupList:[
          {
            groupId: items.groupId,
            logo: items.store.logoUrl,
            time: JSON.stringify(items.deliveryDateTime).substr(12,5),
            current: items.current,
            max: items.maxValue,
            store: items.store,
            promotion: items.promotion,
          }
        ]
      },
      ];
    }
    });

    return tempGroupData_Day;
    };

    
    const WeekDeliveryData = ()=>{

    let tempGroupData_Week = [];

    groupData.map((items,index)=>{
      let InGroupData = 0;

      for (let indexOfTemp = 0; indexOfTemp < tempGroupData_Week.length; indexOfTemp++){
        if ( JSON.stringify(tempGroupData_Week[indexOfTemp].location) === JSON.stringify({
          latitude: items.latitude,
          longitude: items.longitude,
          address: items.address,
          buildingName: items.buildingName,
        })){
          InGroupData = 1;
          tempGroupData_Week[indexOfTemp].groupList.push(
            {
              groupId: items.groupId,
              logo: items.store.logoUrl,
              time: JSON.stringify(items.deliveryDateTime).substr(12,5),
              date: JSON.stringify(items.deliveryDateTime).substr(1,10),
              current: items.current,
              max: items.maxValue,
              store: items.store,
              promotion: items.promotion,
            });
        }
      }
      if (InGroupData === 0){
        tempGroupData_Week = [...tempGroupData_Week,{
        location:{
          latitude: items.latitude,
          longitude: items.longitude,
          address: items.address,
          buildingName: items.buildingName,
        },
        groupList:[
          {
            groupId: items.groupId,
            logo: items.store.logoUrl,
            time: JSON.stringify(items.deliveryDateTime).substr(12,5),
            date: JSON.stringify(items.deliveryDateTime).substr(1,10),
            current: items.current,
            max: items.maxValue,
            store: items.store,
            promotion: items.promotion,
          }
        ]
      },
      ];
    }
    });

    return tempGroupData_Week;
    };

    //------------------------------
    let tempGroupData;
    if (back === 'DayDelivery'){
      tempGroupData = DayDeliveryData();
    } else {
      tempGroupData = WeekDeliveryData();
    }

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
            showsUserLocation={true}
            showsMyLocationButton={false}
            toolbarEnabled={false}
        >
          { filteredMarkers.map((item, idx) => (
            <CustomMarker key={idx} item={item} back={back} today={today} storeData={storeData} />
          ))}
        </MapView>
    );
};

export default GoogleMap;
