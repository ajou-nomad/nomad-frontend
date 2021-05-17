/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { FONTS2, } from '../../constants';

function StoreInfo({ item }) {
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
        }}>
        <Text style={{ ...FONTS2.h1, }}>지도</Text>
      </View>

      {/* 영업 정보 */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ ...FONTS2.h2, marginBottom: 5 }}>&lt; 영업 정보 &gt;</Text>
        {/* 영업시간 */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...FONTS2.body2, fontWeight: 'bold', marginRight: 5, alignSelf: 'center' }}>영업시간</Text>
          <Text style={{ ...FONTS2.body2, alignSelf: 'center' }}>{item.openTime} ~ {item.closeTime}</Text>
        </View>

        {/* 전화변호 */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...FONTS2.body2, fontWeight: 'bold', marginRight: 5, alignSelf: 'center' }}>전화번호</Text>
          <Text style={{ ...FONTS2.body2, alignSelf: 'center' }}>{item.phoneNumber}</Text>
        </View>

        {/* 주소 */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...FONTS2.body2, fontWeight: 'bold', marginRight: 5, alignSelf: 'center' }}>주소</Text>
          <Text style={{ ...FONTS2.body2, alignSelf: 'center' }}>{item.address}</Text>
        </View>
      </View>

      {/* 가게 공지사항 */}
      {/* <View style={{ marginBottom: 20 }}>
        <Text style={{ ...FONTS2.h2, marginBottom: 5 }}>&lt; 공지사항 &gt;</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={{ ...FONTS2.body2 }}>공지사항 공지사항공지사항 공지사항공지사항공지사항공지사항공지사항공지사항</Text>
        </View>
      </View> */}

      {/* 가게 통계 */}
      {/* <View style={{ width: '30%', marginBottom: 20 }}>
        <Text style={{ ...FONTS2.h2, marginBottom: 5 }}>&lt; 가게 통계 &gt;</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={{ ...FONTS2.h3 }}>주문 수</Text>
          <Text style={{ ...FONTS2.body2 }}>85건</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...FONTS2.h3 }}>리뷰 수</Text>
          <Text style={{ ...FONTS2.body2 }}>35개</Text>
        </View>
      </View> */}
    </View>
  );
}

export default StoreInfo;
