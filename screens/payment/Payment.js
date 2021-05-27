/* eslint-disable prettier/prettier */
import React from 'react';
import IMP from 'iamport-react-native';
import Loading from '../../components/payment/Loading';
import { createGroup, participationGroup } from '../../utils/helper';
import axiosApiInstance from '../../utils/axios';
import { Alert } from 'react-native';

const Payment = ({route, navigation}) => {

  const { paymentInfo, postData } = route.params;

  const today = new Date();
  const todayString = JSON.stringify(today).substr(1,10);


  const paymentTermination = (response) => {
    console.log(response);
    if (response.imp_success === 'false') {

      // 배달 생성시 groupData는 존재x
      if (!postData.groupData) {

        axiosApiInstance.post('/groupData', {
          // groupData
          storeId: postData.storeInfo.storeId,
          time: postData.time,
          date: postData.deliDate,
          maxValue: postData.maxValue,
          groupType: (postData.deliDate === todayString) ? 'day' : 'weekly',
          latitude: postData.location.latitude,
          longitude: postData.location.longitude,
          address: postData.location.address,
          buildingName: postData.location.buildingName,

          // order Data
          menu: postData.cartItems,
          totalCost: postData.totalPrice,
          payMethod: 'Card',
          orderTime: new Date(),
        }).then( (response) => {

          console.log('배달그룹생성완료');
          console.log(JSON.stringify(response.data, null, 4));
          navigation.popToTop();
        });

        // createGroup(creationGroupData.groupData, creationGroupData.orderData).then(() => {
        //   console.log("hi");
        //   navigation.popToTop();
        // });
      } else {
        // participationGroup(participationGroupData.groupId, participationGroupData.orderData).then((data) => {
        //   console.log("hi");
        //   navigation.popToTop();
        // });

        let cartItems = postData.cartItems.map((item) => {
          delete item.menuId;

          return item;
        });


        axiosApiInstance.post('/participationGroup', {
          groupId: postData.groupData.groupId,

          // order detail
          menu: cartItems,
          totalCost: postData.totalPrice,
          payMethod: 'Card',
          orderTime: new Date(),
        }).then( (response) => {
          console.log('배달그룹생성완료');
          console.log(JSON.stringify(response.data, null, 4));
          navigation.popToTop();
        });
      }
    } else {

      // Alert.alert(response.error_msg);
      // navigation.goBack();
    }
  };

  const data = {
    pg: 'inicis',
    pay_method: 'card',
    name: 'Dutch Delivery',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: postData.totalPrice,
    buyer_name: paymentInfo.buyerName,
    buyer_tel: paymentInfo.buyerTel,
    buyer_email: paymentInfo.buyerEmail,
    app_scheme: 'example',
  };

  return (
    <IMP.Payment
      userCode={'imp77640589'}
      data={data}
      callback={paymentTermination} // 결제 종료 후 콜백함수 호출
    />
  );
};

export default Payment;
