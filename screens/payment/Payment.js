/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert } from 'react-native';
import IMP from 'iamport-react-native';
import Loading from '../../components/payment/Loading';
import { participationGroup } from '../../utils/helper';

const Payment = ({route, navigation}) => {

  const { paymentInfo, postData } = route.params;
  // console.log(postData);
  if (postData.groupData === undefined || postData.groupData === null){
    const today = new Date();
    const todayString = JSON.stringify(today).slice(1,10);
    const creationGroupData = {
      storeId: postData.storeInfo.storeId,
      time: postData.time,
      date: postData.deliDate,
      maxValue: postData.maxValue,
      grouptype: (postData.deliDate === todayString) ? 'day' : 'weekly',
      latitude: postData.location.latitude,
      longitude: postData.location.longitude,
      address: postData.location.address,
      buildingName: postData.location.buildingName,
      orderData: {
        storeId: postData.storeInfo.storeId,
        menu: postData.cartItems,
        totalCost: postData.totalPrice,
        payMethod: 'CreditCard',
        orderTime: new Date(),
      },
    };
    console.log(JSON.stringify(creationGroupData,null,4));
  } else {

    const participationGroupData = {
      groupId: postData.groupData.groupId,
      orderData: {
        storeId: postData.storeInfo.storeId,
        menu: postData.cartItems,
        totalCost: postData.totalPrice,
        payMethod: 'CreditCard',
        orderTime: new Date(),
      },
    };

    console.log(JSON.stringify(participationGroupData,null,4));
    // participationGroup(participationGroupData.groupId, participationGroupData.orderData);
  }




  const paymentTermination = (response) => {
    console.log(response);
    if (response.imp_success === 'true') {
      //이미 결제완료
    } else {

      Alert.alert(response.error_msg);
      navigation.goBack();
    }
  };

  const data = {
    pg: 'inicis',
    pay_method: 'card',
    name: 'Dutch Delivery',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: paymentInfo.amount,
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
