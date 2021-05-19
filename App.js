/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import {images} from './constants';
import storage from '@react-native-firebase/storage';



// ----test-----
import { clearAll, setData, getData, addData, getDaliyGroupData, getWeeklyGroupData} from './utils/helper';
// ----test-----


const App = () => {

  useEffect(() => {

    setData('groupData', groupData);

    setData('orderData', orderData);

    setData('storeData', storeData);

    // addData('storeData', testData2);

    // getData('groupData').then( data => console.log(JSON.stringify(data, null, 4)));

    // getWeeklyGroupData().then( data => console.log(JSON.stringify(data, null, 4)));
    // getDaliyGroupData().then( data => console.log(JSON.stringify(data, null, 4)));
    // clearAll();

    // Foreground state messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(JSON.stringify(remoteMessage));
      Toast.show({
        type: 'success',
        position: 'top',
        text1: '배달 알림',
        text2: '배달모집이 완료되었습니다. 👋',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;








// dummy Data


const storeData = [
  {
    storeId: 1,
    storeName: '빽다방 아주대점',
    phoneNumber: '070-7543-3601',

    address: '경기 수원시 영통구 원천동 25-2',
    latitude: 37.2763246,
    longitude: 127.0441309,

    openTime: '09:00',
    closeTime: '22:00',
    deliveryTip: 2000,
    rate: 2.8,
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2Fpaik.png?alt=media&token=25375f0a-592d-4b66-b801-6cae5d1cfaee',
    menu:[
      {
        menuId: 1,
        menuName: '앗!메리카노(ICED)',
        cost: 2000,
        description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F04_%EC%95%97%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8_ICED-1.jpg?alt=media&token=d30d224f-53d5-4946-a943-fddc65bf4576',
      },
      {
        menuId: 2,
        menuName: '앗!메리카노(HOT)',
        cost: 1500,
        description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F03_%EC%95%97%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8_HOT.jpg?alt=media&token=529afacf-945e-46f9-b0b1-ed2d6f41103d',
      },
      {
        menuId: 3,
        menuName: '바닐라라떼(ICED)',
        cost: 3000,
        description: '부드러운 우유와 달콤하고 은은한 바닐라가 조화를 이루는 음료',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F13_%EB%B0%94%EB%8B%90%EB%9D%BC%EB%9D%BC%EB%96%BC_ICED-1.jpg?alt=media&token=3197127c-95f2-4ade-8c81-7e3a067c7815',
      },
      {
        menuId: 4,
        menuName: '바닐라라떼(HOT)',
        cost: 2500,
        description: '부드러운 우유와 달콤하고 은은한 바닐라가 조화를 이루는 음료',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F12_%EB%B0%94%EB%8B%90%EB%9D%BC%EB%9D%BC%EB%96%BC_HOT.jpg?alt=media&token=3f13af82-5b4c-416f-989e-8637d5ee6095',
      },
      {
        menuId: 5,
        menuName: '달달연유라떼(ICED)',
        cost: 2500,
        description: '달달하고 향긋한 베트남식 연유라떼',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F%EB%8B%AC%EB%8B%AC%EC%97%B0%EC%9C%A0%EB%9D%BC%EB%96%BC_%EC%95%84%EC%9D%B4%EC%8A%A4.jpg?alt=media&token=2dbb82f0-244d-44fb-b7cc-5cf6ab11df76',
      },
      {
        menuId: 6,
        menuName: '달달연유라떼(HOT)',
        cost: 2500,
        description: '달달하고 향긋한 베트남식 연유라떼',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F%EB%8B%AC%EB%8B%AC%EC%97%B0%EC%9C%A0%EB%9D%BC%EB%96%BC_%ED%95%AB.jpg?alt=media&token=a019986a-1623-4353-a0db-40ee07631b71',
      },
      {
        menuId: 7,
        menuName: '카라멜마키아또(ICED)',
        cost: 3500,
        description: '카라멜소스와 신선한 우유, 에스프레소로 맛을 낸 달콤한 빽다방 인기메뉴',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F17_%EC%B9%B4%EB%9D%BC%EB%A9%9C%EB%A7%88%ED%82%A4%EC%95%84%EB%98%90_ICED-1.jpg?alt=media&token=f3ebb79f-c62e-47c7-a045-0a2dcb965367',
      },
      {
        menuId: 8,
        menuName: '카라멜마키아또(HOT)',
        cost: 3000,
        description: '카라멜소스와 신선한 우유, 에스프레소로 맛을 낸 달콤한 빽다방 인기메뉴',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F16_%EC%B9%B4%EB%9D%BC%EB%A9%9C%EB%A7%88%ED%82%A4%EC%95%84%EB%98%90_HOT.jpg?alt=media&token=0a1d1187-bc99-4d68-b174-f2293987cf92',
      },
      {
        menuId: 9,
        menuName: '완전아이스초코',
        cost: 3500,
        description: '초코에 퐁당 빠지고 싶을때~!? 진짜~! 완~전 진한 초코라떼',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2FHOT-%EC%99%84%EC%A0%84%EC%B4%88%EC%BD%94-450x588.png?alt=media&token=273c009e-bf92-430c-b404-4ce4b588182a',
      },
      {
        menuId: 10,
        menuName: '완전핫초코',
        cost: 3000,
        description: '초코에 퐁당 빠지고 싶을때~!? 진짜~! 완~전 진한 초코라떼',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2FHOT-%EC%99%84%EC%A0%84%EC%B4%88%EC%BD%94-450x588.png?alt=media&token=273c009e-bf92-430c-b404-4ce4b588182a',
      },
    ],
  },
  {
    storeId: 2,
    storeName: '스타벅스 아주대점',
    phoneNumber: '1522-3232',

    address: '경기도 수원시 팔달구 우만동 58-32',
    latitude: 37.2783595,
    longitude: 127.046209,

    openTime: '07:00',
    closeTime: '22:00',
    deliveryTip: 2000,
    rate: 4.2,
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2Fstarbucks.png?alt=media&token=4ae10322-dab3-4511-b2a6-0bd375393260',

    menu:[
      {
        menuId: 11,
        menuName: '아이스 카페 아메리카노',
        cost: 4100,
        description: '진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F%EC%95%84%EC%9D%B4%EC%8A%A4%EC%B9%B4%ED%8E%98%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8.jpg?alt=media&token=bc38f7c8-63d8-499e-8a55-4ea29bd66ebd',
      },
      {
        menuId: 12,
        menuName: '아이스 카푸치노',
        cost: 4600,
        description: '풍부하고 진한 에스프레소에 신선한 우유와 우유 거품이 얼음과 함께 들어간 시원하고 부드러운 커피 음료',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F%EC%95%84%EC%9D%B4%EC%8A%A4%EC%B9%B4%ED%91%B8%EC%B9%98%EB%85%B8.jpg?alt=media&token=44c1759f-d899-4ddf-ac39-2528547596ee',
      },
      {
        menuId: 13,
        menuName: '스타벅스 돌체 라떼',
        cost: 5600,
        description: '스타벅스의 다른 커피 음료보다 더욱 깊은 커피의 맛과 향에 깔끔한 무지방 우유와 부드러운 돌체 시럽이 들어간 음료로 달콤하고 진한 커피 라떼',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4%20%EB%8F%8C%EC%B2%B4%20%EB%9D%BC%EB%96%BC.jpg?alt=media&token=5a28a49c-3c3c-435f-970f-52cadd420daf',
      },
      {
        menuId: 14,
        menuName: '자바 칩 프라푸치노',
        cost: 6100,
        description: '커피, 모카 소스, 진한 초콜릿 칩이 입안 가득 느껴지는 스타벅스에서만 맛볼 수 있는 프라푸치노',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F%EC%9E%90%EB%B0%94%20%EC%B9%A9%20%ED%94%84%EB%9D%BC%ED%91%B8%EC%B9%98%EB%85%B8.jpg?alt=media&token=c0ba39d4-7ff5-4126-84c6-e821ba362288',
      },
    ],
  },
  {
    storeId: 3,
    storeName: '할리스 아주대점',
    phoneNumber: '031-211-2884',

    address: '경기 수원시 영통구 중부대로 258',
    latitude: 37.2742778,
    longitude: 127.0439584,

    openTime: '08:00',
    closeTime: '22:00',
    deliveryTip: 2000,
    rate: 3.7,
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2Fhollys.jpg?alt=media&token=1dd864d1-1446-4707-a9e4-6117b28efd72',
    menu:[
      {
        menuId: 15,
        menuName: '디카페인 아메리카노',
        cost: 4100,
        description: '부드러운 풍미와 균형잡힌 바디감의 디카페인 아메리카노',
        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8%20%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8.png?alt=media&token=426037b8-bdb7-4a43-867a-40f335d42840',
      },
    ],
  },
];



const groupData = [
  {
    groupId: 1,
    storeId: 1, //빽다방 아주대점
    time: '13:00',
    date: '2021-05-18',
    groupType: 'day',
    current: 2,
    maxValue: 5,
    memberList: ['8MaepsFt67SrssZX1zxA8s96S0k1', 'Pa5C01f34nTbOJXNewvZy0APaio2'],
    latitude: 37.284525,
    longitude: 127.044113,
    address: '수원시 원천동',
    buildingName: '팔달관',
    orderStatus:  'recruiting',
  },
  {
    groupId: 2,
    storeId: 2, //스타벅스 아주대점
    time: '13:30',
    date: '2021-05-18',
    groupType: 'day',
    current: 2,
    maxValue: 5,
    memberList: ['8MaepsFt67SrssZX1zxA8s96S0k1', 'Pa5C01f34nTbOJXNewvZy0APaio2'],
    latitude: 37.284525,
    longitude: 127.044113,
    address: '수원시 원천동',
    buildingName: '팔달관',
    orderStatus:  'recruiting',
  },
  {
    groupId: 3,
    storeId: 1, //빽다방 아주대점
    time: '15:00',
    date: '2021-05-20',
    groupType: 'weekly',
    current: 2,
    maxValue: 5,
    memberList: ['8MaepsFt67SrssZX1zxA8s96S0k1', 'Pa5C01f34nTbOJXNewvZy0APaio2'],
    latitude: 37.284525,
    longitude: 127.044113,
    address: '수원시 원천동',
    buildingName: '팔달관',
    orderStatus:  'recruiting',
  },
  {
    groupId: 4,
    storeId: 2, //스타벅스 아주대점
    time: '15:30',
    date: '2021-05-20',
    groupType: 'weekly',
    current: 2,
    maxValue: 5,
    memberList: ['8MaepsFt67SrssZX1zxA8s96S0k1', 'Pa5C01f34nTbOJXNewvZy0APaio2'],
    latitude: 37.284525,
    longitude: 127.044113,
    address: '수원시 원천동',
    buildingName: '팔달관',
    orderStatus:  'recruiting',
  },
];




// get /orderDetail시 얻어올수 있는 정보들
// uid에 해당하는 유저의 주문목록
const orderData = [
  {
    orderId: 1,
    uid: '8MaepsFt67SrssZX1zxA8s96S0k1',

    storeId: 1,
    storeName: '빽다방 아주대점',


    // orederStatus도 실제로는 member_Order table에서 groupId를 이용해서 받와야함.
    orederStatus: 'deliveryDone',

    // 실제로는 storeId를 통해서 해당 storeId로 이동 후
    //  해당 store에 연결된 review Table로 가서 해당 uid를 찾아 가져와야함.
    review: {
      uid: '8MaepsFt67SrssZX1zxA8s96S0k1',
      text: '가성비가 좋아요.!!',
      imgUrl: '',
    },

    menu: [
      {
        menuId: 1,
        menuName: '앗!메리카노(ICED)',
        cost: 2000,
        quantity: 1,
      }
    ],
    totalCost: 2000,
    payMethod: 'card',
    orderTime: '2021-05-15T15:30:00.480Z',
  },
  {
    orderId: 2,
    uid: '8MaepsFt67SrssZX1zxA8s96S0k1',

    storeId: 1,
    storeName: '빽다방 아주대점',

    // orederStatus도 실제로는 member_Order table에서 groupId를 이용해서 받와야함.
    orederStatus: 'deliveryDone',

    // 실제로는 storeId를 통해서 해당 storeId로 이동 후
    //  해당 store에 연결된 review Table로 가서 해당 uid를 찾아 가져와야함.
    review: null,

    menu: [
      {
        menuId: 1,
        menuName: '앗!메리카노(ICED)',
        cost: 2000,
        quantity: 1,
      },
      {
        menuId: 9,
        menuName: '완전아이스초코',
        cost: 3500,
        quantity: 1,
      },
    ],
    totalCost: 5500,
    payMethod: 'card',
    orderTime: '2021-05-17T15:30:00.480Z',
  },
];



// 해당 uid의 채팅방리스트 얻기 get("/chatList")
const chatList = [
  {
    uid: '8MaepsFt67SrssZX1zxA8s96S0k1',
    chatIds: ['채팅방id1','채팅방id2'],
  },
];


























// 처음 넣는 데이터만 배열로 해주시면
const testData1 = [
  {
    storeId: 1,
    storeName: '빽다방 아주대점',
    menu:[
      {
        menuId: 1,
        menuName: '앗!메리카노(ICED)',
        cost: 2000,
        description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        imgUrl: '',
      },
      {
        menuId: 2,
        menuName: '앗!메리카노(HOT)',
        cost: 1500,
        description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        imgUrl: '',
      },
    ],
  },
];

// 추가되는 데이터는 객체로만 해서 넣으면 됩니다.
const testData2 = {
    storeId: 2,
    storeName: '스타벅스 아주대점',
    menu:[
      {
        menuId: 1,
        menuName: '앗!메리카노(ICED)',
        cost: 2000,
        description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        imgUrl: '',
      },
      {
        menuId: 2,
        menuName: '앗!메리카노(HOT)',
        cost: 1500,
        description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        imgUrl: '',
      },
    ],
};
