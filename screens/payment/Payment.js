/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert } from 'react-native';
import IMP from 'iamport-react-native';
import Loading from '../../components/payment/Loading';
import { createGroup, participationGroup } from '../../utils/helper';
import axiosApiInstance from '../../utils/axios';

const Payment = ({route, navigation}) => {

  const { paymentInfo, postData } = route.params;

  const today = new Date();
  const todayString = JSON.stringify(today).substr(1,10);



  const paymentTermination = (response) => {
    console.log(response);
    if (response.imp_success === 'false') {
      if (postData.groupData === undefined || postData.groupData === null) {
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
        console.log(JSON.stringify(creationGroupData, null, 4));

        // 배달 그룹 생성
      axiosApiInstance.post("/groupData", {
        storeId: creationGroupData.groupData.storeId, //빽다방 아주대점
        time: creationGroupData.groupData.time,
        date: creationGroupData.groupData.date,
        groupType: creationGroupData.groupData.groupType,
        maxValue: creationGroupData.groupData.maxValue,
        latitude: creationGroupData.groupData.latitude,
        longitude: creationGroupData.groupData.longitude,
        address: creationGroupData.groupData.address,
        buildingName: creationGroupData.groupData.buildingName,
        menu: creationGroupData.orderData.menu,
        totalCost: creationGroupData.orderData.totalCost,
        payMethod: creationGroupData.orderData.payMethod,
        orderTime: creationGroupData.orderData.orderTime,
      }).then((response) => {
        console.log('배달그룹생성완료');
        console.log(JSON.stringify(response.data, null, 4));
        navigation.popToTop();
        // setResponseStoreData(response.data);
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

        // const temp = {
        //   groupId: postData.groupData.groupId,

        //   // order detail
        //   menu: cartItems,
        //   totalCost: postData.totalPrice,
        //   payMethod: 'Card',
        //   orderTime: new Date(),
        // };

        // console.log(temp);

        axiosApiInstance.post("/participationGroup", {
          groupId: postData.groupData.groupId,

          // order detail
          menu: cartItems,
          totalCost: postData.totalPrice,
          payMethod: 'Card',
          orderTime: new Date(),
        }).then((response) => {
          console.log('배달그룹생성완료');
          console.log(JSON.stringify(response.data, null, 4));
          navigation.popToTop();
        });
      }
     
      //이미 결제완료
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
