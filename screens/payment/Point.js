/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { participationGroup } from '../../utils/helper';

const Point = ({ route, navigation }) => {

    const { paymentInfo, postData } = route.params;

    const today = new Date();
    const todayString = JSON.stringify(today).substr(1,10);

    const tempDay = new Date(postData.deliDate);
    tempDay.setHours(postData.time.substr(0,2) * 1 + 9);
    tempDay.setMinutes(postData.time.substr(3,4) * 1);
    console.log(tempDay);

    if (postData.groupData === undefined || postData.groupData === null){
      const creationGroupData = {
        storeId: postData.storeInfo.storeId,
        // time: postData.time,
        // date: postData.deliDate,
        deliveryDateTime: tempDay,
        maxValue: postData.maxValue,
        grouptype: (postData.deliDate === todayString) ? 'day' : 'weekly',
        latitude: postData.location.latitude,
        longitude: postData.location.longitude,
        address: postData.location.address,
        buildingName: postData.location.buildingName,
        orderData: {
          storeId: postData.storeInfo.storeId,
          storeName: postData.storeInfo.storeName,
          menu: postData.cartItems,
          totalCost: postData.totalPrice,
          payMethod: 'Point',
          orderTime: new Date(),
        },
      };
      // console.log(JSON.stringify(creationGroupData,null,4));
    } else {
      const participationGroupData = {
        groupId: postData.groupData.groupId,
        orderData: {
          storeId: postData.storeInfo.storeId,
          storeName: postData.storeInfo.storeName,
          menu: postData.cartItems,
          totalCost: postData.totalPrice,
          payMethod: 'Point',
          orderTime: new Date(),
        },
      };
      // console.log(JSON.stringify(participationGroupData,null,4));
      participationGroup(participationGroupData.groupId, participationGroupData.orderData).then((data)=>{
        // console.log("hi");
        navigation.popToTop();
      });
      // participationGroup(participationGroupData.groupId, participationGroupData.orderData);
    }

    return (
        <View>
            <Text>포인트로 지불할 예정</Text>
            <Text>{JSON.stringify(paymentInfo,null, 4)}</Text>
        </View>
    )
}

export default Point;
