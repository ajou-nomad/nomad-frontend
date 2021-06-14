/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useContext, useState } from 'react';

import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { icons, COLORS, SIZES, FONTS2, images, FONTS3 } from '../../constants';
import MyPageButton from '../../components/MyPageButton';
import { AuthContext } from '../../context/AuthContextProvider';
import { logout } from '../../utils/helper';
import Header from '../../components/layout/Header';
import axiosApiInstance from '../../utils/axios';




const MyPage = ({ navigation }) => {

    const { state, dispatch } = useContext(AuthContext);
    const [ likeStore, setLikeStore ] = useState([]);

    // console.log('mypage:: ', state);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            axiosApiInstance.get('/likeStore')
                .then( (res) => {
                        setLikeStore(res.data.data);
                });
        });

        return unsubscribe;
    }, []);


	const signOutGoogle = async () => {
		logout(dispatch);
	};


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
					<Text style={{ ...FONTS2.h2, color: '#339af0' }}>{likeStore.length}</Text>
				</View>
				<View style={styles.orderAndPointBox}>
					<Text style={{ ...FONTS2.body3 }}>포인트</Text>
          <Text style={{ ...FONTS2.h2, color: '#339af0' }}>{state.member.point ? state.member.point : 0 }</Text>
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
			<MyPageButton title='찜한 목록' img={icons.like2} onPress={() => navigation.navigate('LikeList', { likeStore: likeStore})} />
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
