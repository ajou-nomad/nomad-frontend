/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert } from 'react-native';
import IMP from 'iamport-react-native';
import Loading from '../../components/payment/Loading';

const Payment = ({route, navigation}) => {

  const { paymentInfo } = route.params;

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
