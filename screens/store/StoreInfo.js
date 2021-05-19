/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import MiniMap from '../../components/map/MiniMap';

import { FONTS2, } from '../../constants';


import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

function StoreInfo(props) {
  const storeInfo = props.storeInfo;

  // console.log(JSON.stringify(storeInfo,null,4));

  return (
    <View>
      {/* 지도 */}
      <View
        style={{
          width: '100%',
          height: 200,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 15,
        }}
      >
        <MiniMap location={{latitude: storeInfo.latitude, longitude: storeInfo.longitude }} />
      </View>

      {/* 영업 정보 */}
      <View style={{ marginBottom: 20 }}>
      <Text style={{ ...FONTS2.h2, marginBottom: 5 }}>&lt; 영업 정보 &gt;</Text>
      {/* 영업시간 */}
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...FONTS2.body2, fontWeight: 'bold', marginRight: 5, alignSelf: 'center' }}>영업시간</Text>
        <Text style={{ ...FONTS2.body2, alignSelf: 'center' }}>월요일 ~ 일요일: {storeInfo.openTime} ~ {storeInfo.closeTime}</Text>
      </View>

      {/* 전화변호 */}
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...FONTS2.body2, fontWeight: 'bold', marginRight: 5, alignSelf: 'center' }}>전화번호</Text>
        <Text style={{ ...FONTS2.body2, alignSelf: 'center' }}>{storeInfo.phoneNumber}</Text>
      </View>

      {/* 주소 */}
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...FONTS2.body2, fontWeight: 'bold', marginRight: 5, alignSelf: 'center' }}>주소</Text>
        <Text style={{ ...FONTS2.body2, alignSelf: 'center' }}>{storeInfo.address}</Text>
      </View>
      </View>

      {/* 가게 공지사항 */}
      <View style={{ marginBottom: 20 }}>
      <Text style={{ ...FONTS2.h2, marginBottom: 5 }}>&lt; 공지사항 &gt;</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
        <Text style={{ ...FONTS2.body2 }}>
          {`5/22부터 일주일간 앗!메리카노 1+1 행사!
      (* 1인당 한 번만 참여 가능합니다)`}
          </Text>
      </View>
      </View>

      {/* 가게 통계 */}
      <View style={{ width: '30%', marginBottom: 20 }}>
      <Text style={{ ...FONTS2.h2, marginBottom: 5 }}>&lt; 가게 통계 &gt;</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
        <Text style={{ ...FONTS2.h3 }}>주문 수</Text>
        <Text style={{ ...FONTS2.body2 }}>85건</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ ...FONTS2.h3 }}>리뷰 수</Text>
        <Text style={{ ...FONTS2.body2 }}>78개</Text>
      </View>
      </View>


    </View>
  );
}

export default StoreInfo;


