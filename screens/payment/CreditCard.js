/* eslint-disable prettier/prettier */
import React from 'react';
import IMP from 'iamport-react-native';
import { createGroup, participationGroup } from '../../utils/helper';
import axiosApiInstance from '../../utils/axios';
import { Alert, View, Text } from 'react-native';

const CreditCard = ({route, navigation}) => {

    const { paymentInfo, postData } = route.params;

    let today = new Date();
    today.setHours(today.getHours() + 9);
    today = JSON.stringify(today).substr(1,10);

    const groupType = postData.deliDate === today ? 'day' : 'weekly';

    const tempDay = new Date(postData.deliDate);
    tempDay.setHours(postData.time.substr(0,2) * 1 + 9);
    tempDay.setMinutes(postData.time.substr(3,4) * 1);


    // console. test
    console.log({
        storeId: postData.storeInfo.storeId,
        // time: postData.time,
        // date: postData.deliDate,
        deliveryDateTime: tempDay,
        maxValue: postData.maxValue,
        groupType: groupType,
        latitude: postData.location.latitude,
        longitude: postData.location.longitude,
        address: postData.location.address,
        buildingName: postData.location.buildingName,

        // order Data
        menu: postData.cartItems,
        totalCost: postData.totalPrice,
        payMethod: 'card',

        promotion: postData.promotion ? 'On' : 'Off',
    });



    const paymentTermination = (response) => {

        // 추후 실제 결제는 true로
        if (response.imp_success === 'false') {

            const currentTime = new Date();
            currentTime.setHours(currentTime.getHours() + 9);

            if (!postData.groupData) {
                // 그룹 생성 결제성공 페이지로 이동 후
                // navigation.replace('PaymentCompleted',{
                //     paymentMethod: '카드',
                //     totalCost: postData.totalPrice,
                //     groupType: groupType,
                // });

                axiosApiInstance.post('/deliveryGroup', {
                    // groupData
                    storeId: postData.storeInfo.storeId,
                    // time: postData.time,
                    // date: postData.deliDate,
                    deliveryDateTime: tempDay,
                    maxValue: postData.maxValue,
                    groupType: groupType,
                    latitude: postData.location.latitude,
                    longitude: postData.location.longitude,
                    address: postData.location.address,
                    buildingName: postData.location.buildingName,

                    // order Data
                    menu: postData.cartItems,
                    totalCost: postData.totalPrice,
                    payMethod: 'card',
                    orderTime: currentTime,
                    promotion: postData.promotion ? 'On' : 'Off',
                }).then( (response) => {

                    console.log('배달그룹 생성완료');

                    // 결제성공 페이지로 이동 후
                    navigation.replace('PaymentCompleted',{
                        paymentMethod: '카드',
                        totalCost: postData.totalPrice,
                        groupType: groupType,
                    });
                });
            } else {
                // 그룹 참여 결제성공 페이지로 이동 후
                // navigation.replace('PaymentCompleted',{
                //     totalCost: postData.totalPrice,
                //     paymentMethod: '카드',
                //     groupType: groupType,
                // });

                let cartItems = postData.cartItems.map((item) => {
                  delete item.menuId;
                  return item;
                });
                axiosApiInstance.post('/deliveryGroupJoin', {
                  groupId: postData.groupData.groupId,

                  // order detail
                  menu: cartItems,
                  totalCost: postData.totalPrice,
                  payMethod: 'card',
                  orderTime: currentTime,
                  promotion: postData.promotion ? 'On' : 'Off',

                }).then( (response) => {

                    console.log('배달그룹 참여완료');

                    // 결제성공 페이지로 이동 후
                    navigation.replace('PaymentCompleted',{
                        totalCost: postData.totalPrice,
                        paymentMethod: '카드',
                        groupType: groupType,
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
        // <View>
        //     <Text>hello</Text>
        // </View>
        <IMP.Payment
            userCode={'imp77640589'}
            data={data}
            callback={paymentTermination} // 결제 종료 후 콜백함수 호출
        />
    );
};

export default CreditCard;

// dummy Data로 테스트 할 때,
// createGroup(creationGroupData.groupData, creationGroupData.orderData).then(() => {
//   console.log("hi");
//   navigation.popToTop();
// });

// participationGroup(participationGroupData.groupId, participationGroupData.orderData).then((data) => {
//   console.log("hi");
//   navigation.popToTop();
// });