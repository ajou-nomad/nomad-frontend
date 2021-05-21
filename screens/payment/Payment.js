/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert } from 'react-native';
import IMP from 'iamport-react-native';
import Loading from '../../components/payment/Loading';
import { createGroup, participationGroup } from '../../utils/helper';

const Payment = ({route, navigation}) => {

  const { paymentInfo, postData } = route.params;

  const today = new Date();
  const todayString = JSON.stringify(today).substr(1,10);



  const paymentTermination = (response) => {
    console.log(response);
    if (response.imp_success === 'true') {



    } else {


      if (postData.groupData === undefined || postData.groupData === null){
        // const today = new Date();
        // const todayString = JSON.stringify(today).slice(1,10);
        const creationGroupData = {

          groupData: {
            storeId: postData.storeInfo.storeId,
            time: postData.time,
            date: postData.deliDate,
            maxValue: postData.maxValue,
            groupType: (postData.deliDate === todayString) ? 'day' : 'weekly',
            latitude: postData.location.latitude,
            longitude: postData.location.longitude,
            address: postData.location.address,
            buildingName: postData.location.buildingName,
          },
          orderData: {
            storeId: postData.storeInfo.storeId,
            storeName: postData.storeInfo.storeName,
            menu: postData.cartItems,
            totalCost: postData.totalPrice,
            payMethod: 'Card',
            orderTime: new Date(),
          },
        };
        console.log(JSON.stringify(creationGroupData,null,4));

        createGroup(creationGroupData.groupData, creationGroupData.orderData).then( ()=>{
          console.log("hi");
          navigation.popToTop();

        });
      } else {
        const participationGroupData = {
          groupId: postData.groupData.groupId,
          orderData: {
            storeId: postData.storeInfo.storeId,
            storeName: postData.storeInfo.storeName,
            menu: postData.cartItems,
            totalCost: postData.totalPrice,
            payMethod: 'Card',
            orderTime: new Date(),
          },
        };
        console.log(JSON.stringify(participationGroupData,null,4));
        participationGroup(participationGroupData.groupId, participationGroupData.orderData).then((data)=>{
          console.log("hi");
          navigation.popToTop();
        });
        participationGroup(participationGroupData.groupId, participationGroupData.orderData);
      }
      

      Alert.alert(response.error_msg);
      navigation.goBack();
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
