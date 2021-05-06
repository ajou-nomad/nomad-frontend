/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';

import {Button, StyleSheet, Text, View } from 'react-native';

import {animations, icons, COLORS, SIZES, FONTS} from "../constants";

import { GoogleSignin } from '@react-native-community/google-signin';



const MyPage = ({ navigation }) => {

    useEffect( () => {
        console.log("Mypage 불릴때");

        // navigation에서 올때마다 호출( 리렌더링은 제외 )
        navigation.addListener('focus', async() => {
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

    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 50 }}>

      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...FONTS.body2 }}>마이페이지 화면</Text>
      </View>
      <Button
        onPress={() => navigation.navigate('ChatNavigation')}
        title="임시채팅룽"
        color="skyblue"
      />
      <Button
        onPress={signOutGoogle}
        title="임시로그아웃창"
        color="red"
      />
    </View>
  );
};


const styles = StyleSheet.create({

  loginButton: {
    alignItems: "center",
    backgroundColor: "#3897f1",
    padding: 10,
    marginHorizontal: 15,
  }
})

export default MyPage;
