/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect } from 'react';

import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { animations, icons, COLORS, SIZES, FONTS2 } from "../../constants";
import MyPageButton from '../../components/MyPageButton';



const MyPage = ({ navigation }) => {

  useEffect(() => {
    console.log("Mypage 불릴때");

    // navigation에서 올때마다 호출( 리렌더링은 제외 )
    navigation.addListener('focus', async () => {
      console.log("Mypage 올떄마다 호출")
            
    })


  }, []);


  // 구글에서만 로그아웃한 것이라 나중에 firebase에서도 로그아웃을 처리해줘야함
  const signOutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  //추가적인 찜한 목록, 채팅방 등을 구현할 예정
  return (

    <ScrollView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoHeader}>
          <Image
            source={icons.avatar}
            style={{
              width: 55,
              height: 55,
              marginRight: 10,
            }}
            resizeMode='contain'
          />
          <Text style={styles.largeFont}>사용자 닉네임</Text>
          
      {/* <TouchableOpacity onPress={() => navigation.navigate('GroupList')}>
        <Text style={{ ...FONTS2.h1}}>dsfds임시</Text>
      </TouchableOpacity> */}
        </View>
        
      </View>
      <MyPageButton title='채팅방' img={icons.chat} onPress={() => navigation.navigate('ChatNavigation')} />
      <MyPageButton title='리뷰 관리' img={icons.review} onPress={() => navigation.navigate('ReviewPage')} />
      <MyPageButton title='찜한 목록' img={icons.like2} onPress={() => navigation.navigate('LikeList')} />
      <MyPageButton title='포인트' img={icons.point} onPress={() => navigation.navigate('MyPointPage')} />
      <MyPageButton title='정보수정' img={icons.pencil} />
      <MyPageButton title='로그아웃' img={icons.logout} onPress={signOutGoogle} />
      
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
  userInfoBody: {

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
});

export default MyPage;
