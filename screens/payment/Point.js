/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';

const Point = ({ route, navigation }) => {

    const { paymentInfo, postData } = route.params;

    // console.log(postData);

    if (postData.groupId === undefined){
      const today = new Date();
      const todayString = JSON.stringify(today).slice(1,10);
      const creationGroupData = {
        storeId: postData.storeInfo.storeId,
        time: postData.time,
        date: postData.deliDate,
        grouptype: (postData.deliDate === todayString) ? 'day' : 'weekly',
        latitude: postData.location.latitude,
        longitude: postData.location.longitude,
        address: postData.location.address,
        buildingName: postData.location.buildingName,
        orderData: {
          storeId: postData.storeInfo.storeId,
          menu: postData.cartItems,
          totalCost: postData.totalPrice,
          payMethod: 'Point',
          orderTime: new Date(),
        },
      };
      console.log(JSON.stringify(creationGroupData,null,4));
    } else {
  
      const participationGroupData = {
        groupId: postData.groupId,
        orderData: {
          storeId: postData.storeInfo.storeId,
          menu: postData.cartItems,
          totalCost: postData.totalPrice,
          payMethod: 'Point',
          orderTime: new Date(),
        },
      };
      console.log(JSON.stringify(participationGroupData,null,4));
    }

    return (
        <View>
            <Text>포인트로 지불할 예정</Text>
            <Text>{JSON.stringify(paymentInfo,null, 4)}</Text>
        </View>
    )
}

export default Point;
