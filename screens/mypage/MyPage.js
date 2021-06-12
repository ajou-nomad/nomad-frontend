/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useContext } from 'react';

import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Svg, Path } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';

import { animations, icons, COLORS, SIZES, FONTS2, images, FONTS3 } from '../../constants';
import MyPageButton from '../../components/MyPageButton';
import { AuthContext } from '../../context/AuthContextProvider';
import { createChatRoom, logout } from '../../utils/helper';
import Header from '../../components/layout/Header';
import axiosApiInstance from '../../utils/axios';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';



const MyPage = ({ navigation }) => {


  const { state, dispatch } = useContext(AuthContext);


  // {"isSignedIn": true, "member": {"email": "ajouajou@gmail.com", "memberType": "User", "nickName": "아주아주", "phoneNum": "010-1111-1111", "point": 0}}
  console.log('mypage:: ', state);

  useEffect(() => {
    // console.log('Mypage 불릴때');

    // navigation에서 올때마다 호출( 리렌더링은 제외 )
    const unsubscribe = navigation.addListener('focus', async () => {
      // console.log('Mypage 올떄마다 호출');
    });


    const getAxiosData = async () => {

      // 배달 그룹 생성
      // await axiosApiInstance.post("/groupData", {
      //   storeId: 5004, //빽다방 아주대점
      //   time: '20:00',
      //   date: '2021-05-19',
      //   groupType: 'day',
      //   maxValue: 3,
      //   latitude: 37.284525,
      //   longitude: 127.044113,
      //   address: '수원시 원천동',
      //   building: '팔달관',
      //   menu: [
      //     {
      //       menuName: 'ㅋㄱㅂ',
      //       cost: 858383,
      //       quantity: 1,
      //     },
      //   ],
      //   totalCost: 2000,
      //   payMethod: 'card',
      //   orderTime: '2021-05-15T15:30:00.480Z',
      // }).then((response) => {
      //   console.log('dddd');
      //   console.log(JSON.stringify(response.data, null, 4));
      //   // setResponseStoreData(response.data);
      // });

      // 배달 참여
      // await axiosApiInstance.post('/deliveryGroupJoin', {
      //   groupId: 6007,
      //   storeId: 5004,
      //   menuName: 'ㅋㄱㅂ',
      //   quantity: 2,
      //   paymethod: 'card',
      //   orderTime: '2021-05-15T15:45:00.480Z'
      // }).then((res) => {
      //   console.log('체크 ', JSON.stringify(res.data, null, 4));
      // });

      // 당일 그룹 생성된 그룹 (NULL값 때문에 에러뜸)
      // await axiosApiInstance.get('/dailyGroupList')
      //   .then((res) => {
      //     console.log('체크:: ', JSON.stringify(res.data, null, 4));
      //   }).catch(e => {
      //     console.log('에러:: ', e);
      //   });


    };

    getAxiosData();


    return unsubscribe;
  }, []);



	const signOutGoogle = async () => {

		logout(dispatch);
	};

	//추가적인 찜한 목록, 채팅방 등을 구현할 예정
	return (

		<ScrollView style={styles.container}>
			<Header title="마이 페이지" small='true' />
			<View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
				<View style={{ flexDirection: 'row' }}>
					<ImageBackground source={icons.highlight} style={{ minWidth: SIZES.padding * 2.5, alignItems: 'center' }} imageStyle={{ tintColor: '#339af0', opacity: 0.5 }}>
						<Text style={{ ...FONTS2.h2, }}>{state.member.nickName}</Text>
					</ImageBackground>
					{/* {state.member.nickName} */}
					<Text style={{ ...FONTS2.body2, color: COLORS.darkgray }}>님 환영합니다.</Text>
				</View>
			</View>
      
			<View style={styles.orderAndPointContainer}>
				<View style={[styles.orderAndPointBox]}>
					<Text style={{ ...FONTS2.body3 }}>찜한 매장</Text>
					<Text style={{ ...FONTS2.h2, color: '#339af0' }}>0</Text>
				</View>
				<View style={styles.orderAndPointBox}>
					<Text style={{ ...FONTS2.body3 }}>포인트</Text>
          <Text style={{ ...FONTS2.h2, color: '#339af0' }}>{state.member.point}</Text>
				</View>
			</View>

			<View style={{  height: SIZES.padding * 8,backgroundColor: 'skyblue', flexDirection: 'row' }}>
				<Image source={images.banner} resizeMode='contain' style={{ width: 180, height: SIZES.padding * 8, }} />
				<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
					<Image source={icons.ko_logo} resizeMode='contain' style={{ width: 130, height: 40, }} />
					<Text style={{ ...FONTS3.h5, marginLeft: SIZES.padding }}>로 먹고 싶은 것만 주문하세요!</Text>
				</View>
			</View>

			<MyPageButton title='채팅방' img={icons.chat} onPress={() => navigation.navigate('ChatNavigation')} />
			<MyPageButton title='리뷰 관리' img={icons.review} onPress={() => navigation.navigate('ReviewPage')} />
			<MyPageButton title='찜한 목록' img={icons.like2} onPress={() => navigation.navigate('LikeList')} />
			<MyPageButton title='로그아웃' img={icons.logout} onPress={signOutGoogle} />
      <View style={styles.version}>
        <Text style={{ ...FONTS2.body3, }}>현재 버전 0.0.1</Text>
      </View>
			{/* <MyPageButton title='정보수정' img={icons.pencil} /> */}
      
		</ScrollView>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  userInfoContainer: {
    width: responsiveWidth(85),
    height: responsiveHeight(12),
    backgroundColor: '#f1f3f5',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  userInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    paddingVertical: 10,
    borderBottomColor: '#adb5bd',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#3897f1',
    padding: 10,
    marginHorizontal: 15,
  },
  largeFont: {
    ...FONTS2.h2,
  },
  orderAndPointContainer: {
    height: SIZES.padding * 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 5,
    paddingTop: 5,
    borderTopWidth: 0.3,
    borderTopColor: '#ced4da',
  },
  orderAndPointBox: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  version: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 0.3,
    borderColor: '#ced4da',
    // flexDirection: 'row',
  },
});

export default MyPage;
