/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useContext } from 'react';

import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { animations, icons, COLORS, SIZES, FONTS2 } from "../../constants";
import MyPageButton from '../../components/MyPageButton';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../context/AuthContextProvider';



const MyPage = ({ navigation }) => {


  const { state, dispatch } = useContext(AuthContext);
  
  // {"isSignedIn": true, "member": {"email": "ajouajou@gmail.com", "memberType": "User", "nickName": "아주아주", "phoneNum": "010-1111-1111", "point": 0}}
  console.log('mypage', state);
  
  useEffect(() => {
    console.log("Mypage 불릴때");

    // navigation에서 올때마다 호출( 리렌더링은 제외 )
    navigation.addListener('focus', async () => {
      console.log("Mypage 올떄마다 호출")
              
    })


  }, []);



  const signOutGoogle = async () => {

    const user = auth().currentUser;

    if (user && user.providerData[0].providerId === 'google.com') {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        console.log('구글 로그아웃성공');
        await auth()
          .signOut()
          .then(() => {
            console.log('파이어베이스 로그아웃성공');
            dispatch({ type: 'SIGN_OUT' });
          });
      } catch (error) {
        console.error(error);
      }
    } else if (user) {
      await auth()
        .signOut()
        .then(() => {
          console.log('파이어베이스 로그아웃성공');
          dispatch({ type: 'SIGN_OUT' });
        });
    } else {
      console.log('로그인 상태가 아닙니다.');
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
          <Text style={styles.largeFont}>{state.member.nickName}</Text>
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
