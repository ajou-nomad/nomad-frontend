/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Keyboard, Text, View, Image, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button, ImageBackground } from 'react-native';
import { icons, SIZES, FONTS, COLORS } from '../constants';
import { GoogleSignin } from '@react-native-community/google-signin';
import { emailPasswordLogin, googleLogin, logout } from '../utils/helper';
import messaging from '@react-native-firebase/messaging';
import { AuthContext } from '../context/AuthContextProvider';
// import { FIREBASE_WEBCLIENTID } from '@env';


import auth from '@react-native-firebase/auth';
import axiosApiInstance from '../utils/axios';



const SignIn = ({router, navigation}) => {

    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: FIREBASE_WEBCLIENTID,
    //         offlineAccess: true, //if you want to access Google API on behalf of the user FROM YOUR SERVER
    //     });
    // }, []);



    const signInEmailPw = async () => {
        if ( email !== '' && password !== ''){

            const data = {
                email: email,
                pw: password,
            };

            emailPasswordLogin(data, dispatch);

            setEmail('');
            setPassword('');
        } else {
            Alert.alert('이메일과 비밀번호를 적어주세요.');
        }
    };




    // // ------------test----------

    const signOutButton = async () => {
        logout(dispatch);
    }
    // // ------------test----------


    const signInGoogle = async () => {
        try {

            const userInfo = await GoogleSignin.signIn();

            const fcmToken = await messaging().getToken();

            const { idToken } = await GoogleSignin.getTokens();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const test =await auth().signInWithCredential(googleCredential);

            axiosApiInstance
                .get('/member')
                .then( async (response) => {
                    // 멤버정보가 없을 때
                    if (response.data.data === 400){
                        Alert.alert('구글계정으로 회원가입합니다.');
                        navigation.navigate('SignUp', {
                            fcmToken: fcmToken,
                            phoneNumber: userInfo.user.phoneNumber,
                            email: userInfo.user.email,
                            nickname: userInfo.user.name,
                            IsGoogle: true,
                        });
                    } else {
                        googleLogin(response, dispatch);
                    }
                })
                .catch((error) => {
                    Alert.alert(error);
                    logout(dispatch);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.logoContainer}>
                        {/* <ImageBackground source={icons.doddle} resizeMode='contain' style={{ width: 260, height: 95, }} imageStyle={{ tintColor: '#868e96'}}>
                            <Image
                                source={icons.ko_logo}
                                resizeMode="contain"
                                style={{
                                    // width: 400,
                                    // height: 120,
                                    width: 240,
                                    height: 90,
                                    tintColor: '#f8f9fa',
                                    alignSelf: 'center',
                                }}
                                />
                        </ImageBackground> */}
                        <Image
                                source={icons.logo}
                                resizeMode="contain"
                                style={{
                                    // width: 400,
                                    // height: 120,
                                    width: 240,
                                    height: 90,
                                }}
                                />
                    </View>
                    <ScrollView style={styles.loginFormView}>

                        <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="이메일" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}/>
                        <TextInput value={password} onChangeText={setPassword} placeholder="비밀번호" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>


                        {/* 일반 로그인 */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={ signInEmailPw }
                        >
                            <Text style={{...FONTS.body2, color: COLORS.white}}>로그인</Text>
                        </TouchableOpacity>

                        {/* 회원가입 이동 */}
                        <TouchableOpacity
                            style={styles.signUpButton}
                            onPress={()=> navigation.navigate('SignUp',{
                                phoneNumber: '',
                                email: '',
                                nickname: '',
                                IsGoogle: false})}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{...FONTS.body4}}
                                >혹시, DutchDelivery가 처음이신가요? </Text>
                                <Text
                                    style={{...FONTS.body4, textDecorationLine: 'underline' }}
                                >회원가입</Text>
                            </View>
                        </TouchableOpacity>

                        {/* 구글 로그인 */}
                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={ signInGoogle }
                        >
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                                <View style={{ backgroundColor: 'white', margin: 8, marginLeft: -10}}>
                                    <Image 
                                        source={icons.google}
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            margin: 5,
                                        }}
                                    />
                                </View>

                                <Text style={{...FONTS.body4, color: COLORS.black}}>Google 계정으로 로그인</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={ signOutButton }
                        >
                            <Text style={{...FONTS.body4, color: COLORS.black}}>임시로그아웃</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    logoContainer : {
        marginVertical: SIZES.padding * 3,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginScreenContainer: {
        flex: 1,
    },
    loginFormView: {
        flex: 1,
        marginTop: SIZES.padding,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginHorizontal: 15,
        marginTop: 5,
        marginBottom: 15,

    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginHorizontal: 15,
    },
    googleButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 15,
        marginHorizontal: 50,
        borderRadius: 5,
        width: SIZES.width * 0.55,
        height: 50,
    },
    signUpButton: {
        width: SIZES.width,
        height: SIZES.height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
});

export default SignIn;
