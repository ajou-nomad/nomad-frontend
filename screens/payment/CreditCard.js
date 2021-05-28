/* eslint-disable prettier/prettier */
import React from 'react';
import IMP from 'iamport-react-native';
import Loading from '../../components/payment/Loading';
import { createGroup, participationGroup } from '../../utils/helper';
import axiosApiInstance from '../../utils/axios';
import { Alert } from 'react-native';

const CreditCard = ({route, navigation}) => {

  const { paymentInfo, postData } = route.params;

  const today = new Date();
  const todayString = JSON.stringify(today).substr(1,10);

  const tempDay = new Date(postData.deliDate);
  tempDay.setHours(postData.time.substr(0,2) * 1 + 9);
  tempDay.setMinutes(postData.time.substr(3,4) * 1);
  console.log(tempDay);

  const paymentTermination = (response) => {
    console.log(response);
    if (response.imp_success === 'false') {

      // 배달 생성시 groupData는 존재x
      if (!postData.groupData) {

        axiosApiInstance.post('/groupData', {
            // groupData
            storeId: postData.storeInfo.storeId,
            // time: postData.time,
            // date: postData.deliDate,
            deliveryDateTime: tempDay,
            maxValue: postData.maxValue,
            groupType: (postData.deliDate === todayString) ? 'day' : 'weekly',
            latitude: postData.location.latitude,
            longitude: postData.location.longitude,
            address: postData.location.address,
            buildingName: postData.location.buildingName,

            // order Data
            menu: postData.cartItems,
            totalCost: postData.totalPrice,
            payMethod: 'card',
            orderTime: new Date(),
        }).then( (response) => {

            Alert.alert('배달그룹 생성완료');

            // 결제성공 페이지로 이동 후
            navigation.replace('PaymentCompleted',{
                paymentMethod: '카드',
            });
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

            Alert.alert('배달그룹 참여완료');

            // 결제성공 페이지로 이동 후
            navigation.replace('PaymentCompleted',{
                paymentMethod: '카드',
            });
        });
      }
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

export default CreditCard;
