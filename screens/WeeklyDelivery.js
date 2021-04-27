/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableOpacityBase,
} from 'react-native';

import {
    icons,
    COLORS,
    SIZES,
    FONTS,
    GOOGLE_API_KEY
} from '../constants';

const WeeklyDelivery = ({route, navigation}) => {
  /*
    스케쥴러 먼저
    해당 요일 ~ 다음주 요일-1, 주말 제외 (수,목,금,월,화) 위에는 작게 날짜 표시
    1시간 텀으로 오전 6시 ~ 오후 10시까지 나눠서 칸 만들기
    해당 칸을 클릭하여 이동, 안에는 배달 시간순으로 정렬
    해당 날짜의 지도 + 그룹
  */
  return (
    <View style={{flex: 1}}>
      <Text>WeeklyDelivery</Text>
    </View>
  );
};

export default WeeklyDelivery;
