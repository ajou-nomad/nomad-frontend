/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect, useContext } from 'react';

import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Svg, Path } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';

import { animations, icons, COLORS, SIZES, FONTS2 } from "../../constants";
import MyPageButton from '../../components/MyPageButton';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../context/AuthContextProvider';
import { logout } from '../../utils/helper';



const MyPage = ({ navigation }) => {


  const { state, dispatch } = useContext(AuthContext);
  
  // {"isSignedIn": true, "member": {"email": "ajouajou@gmail.com", "memberType": "User", "nickName": "아주아주", "phoneNum": "010-1111-1111", "point": 0}}
  console.log('mypage:: ', state);
  
  useEffect(() => {
    console.log("Mypage 불릴때");

    // navigation에서 올때마다 호출( 리렌더링은 제외 )
    navigation.addListener('focus', async () => {
      console.log("Mypage 올떄마다 호출")
              
    })


  }, [navigation]);



  const signOutGoogle = async () => {

    logout(dispatch);
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

      <View style={[styles.item, styles.itemOut]}>
        <View style={[styles.balloon, { backgroundColor: '#1084ff' }]}>
          <Text style={{ paddingTop: 5, color: 'white' }}>Hey! I am good. How are you?</Text>
          <View
            style={[
              styles.arrowContainer,
              styles.arrowRightContainer,
            ]}
          >
            <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
              <Path
                d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                fill="#1084ff"
                x="0"
                y="0"
              />
            </Svg>
          </View>
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
  item: {
       marginVertical: moderateScale(7, 2),
       flexDirection: 'row'
    },
    itemIn: {
        marginLeft: 20
    },
    itemOut: {
       alignSelf: 'flex-end',
       marginRight: 20
    },
    balloon: {
       maxWidth: moderateScale(250, 2),
       paddingHorizontal: moderateScale(10, 2),
       paddingTop: moderateScale(5, 2),
       paddingBottom: moderateScale(7, 2),
       borderRadius: 20,
    },
    arrowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        flex: 1
    },
    arrowLeftContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },

    arrowRightContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    arrowLeft: {
        left: moderateScale(-6, 0.5),
    },

    arrowRight: {
        right:moderateScale(-6, 0.5),
    }
});

export default MyPage;