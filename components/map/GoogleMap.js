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

    
    //------------------------------
    //넘어온 location값은 단지 지도에 표현할려고 하는 값일뿐 실제 그룹 데이터는 아래 데이터 내부에
    //axios를 통해 백엔드에서 생성된 배달그룹을 가져옴.
    // axiosApiInstance.get('/GroupData').then((response)=>{
    //   console.log('Get GroupData Response.Data: ' + JSON.stringify(response.data))
    // }).catch((error)=>{
    //   console.log('Get GroupData Error: ' + JSON.stringify(error))
    // })

    // axiosApiInstance.get('/dailyGroupData).then((response)=>{
    //  console.log(response.data)
    // }).catch((error)=>{
    //  console.log(error);
    // })

    // axiosApiInstance.post('/participationGroup',{
    //   groupId: 5,
    //   orderData: {
    //     storeId: 'storeId',
    //     menu:[
    //       {
    //       menuName: '엄청 비싼 아메리카노',
    //       cost: 72000,
    //       quantity: 3,
    //       detail: [
    //         {
    //           option: '사이즈 업',
    //           price: 500,
    //         },
    //         {
    //           option: '샷 추가',
    //           price: 500,
    //         },
    //       ]
    //     },
    //   ],
    //     totalCost: 12700,
    //     payMethod: 'point',
    //     orderTime: new Date(),
    //   },
    // }).then((response)=>{
    //   console.log(JSON.stringify(response));
    // }).catch((error)=>{
    //   console.log(error);
    // });

    // axiosApiInstance.post('/groupData',{}).then((response)=>{
    //   console.log('response: ' + JSON.stringify(response));
    // }).catch((error)=>{
    //   console.log('error: ' + error);
    // });

    // const getData = async (key) =>{
    //   try {
    //     const jsonValue = await AsyncStorage.getItem(key);
    //     return jsonValue !== null ? JSON.parse(jsonValue) : null;
    //   } catch (e){
    //     console.log(e);
    //   }
    // };

  // "2021-05-28T19:45:00Z"
  // console.log(JSON.stringify(deliveryDateTime).substr(1,10)); //2021-05-28
  // console.log(JSON.stringify(deliveryDateTime).substr(12,5)); //19:45

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
              time: JSON.stringify(items.deliveryDateTime).substr(12,4),
              date: JSON.stringify(items.deliveryDateTime).substr(1,10),
              current: items.current,
              max: items.maxValue,
              store: items.store,
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
            time: JSON.stringify(items.deliveryDateTime).substr(12,4),
            date: JSON.stringify(items.deliveryDateTime).substr(1,10),
            current: items.current,
            max: items.maxValue,
            store: items.store,
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
        >
          { filteredMarkers.map((item, idx) => (
            <CustomMarker key={idx} item={item} back={back} today={today} storeData={storeData} />
          ))}
        </MapView>
    );
};

export default GoogleMap;
