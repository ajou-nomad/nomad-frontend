/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Keyboard, Text, View, Image, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button } from 'react-native';
import { icons, SIZES, FONTS, COLORS, keys } from "../constants";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { emailPasswordLogin, googleLogin } from '../utils/helper';
import messaging from '@react-native-firebase/messaging';
import { AuthContext } from '../context/AuthContextProvider';

// test ----
import auth from '@react-native-firebase/auth';
// test====


const SignIn = ({router, navigation}) => {

    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: keys.FIREBASE_WEBCLIENTID,
            offlineAccess: true, //if you want to access Google API on behalf of the user FROM YOUR SERVER
        });    
    }, []);


    const signInEmailPw = async () => {
        if ( email !== '' && password !== ''){

            const data = {
                email: email,
                pw: password,
            };

            emailPasswordLogin(data, dispatch);

            setEmail("");
            setPassword("");
        } else {
            Alert.alert("이메일과 비밀번호를 적어주세요.")
        }
    }




    // ------------test----------
    const testButton = async () => {
        
        const user = auth().currentUser;

        if( user ){
            const idToken = await user.getIdToken();
            console.log("user의 정보는\n"+JSON.stringify(user,null, 4));
            console.log("토큰은\n"+JSON.stringify(idToken,null, 4));
        } else {
            console.log("로그인을 해야 볼 수 있습니다.");
        }
    }

    const signOutButton = async () => {

        const user = auth().currentUser;

        if( user && user.providerData[0].providerId === 'google.com' ) {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                console.log("구글 로그아웃성공");
                await auth()
                        .signOut()
                        .then(() => console.log('파이어베이스 로그아웃성공'));
            } catch (error) {
                console.error(error);
            }
        } else if (user) {
            await auth()
                .signOut()
                .then(() => console.log('파이어베이스 로그아웃성공'));
        } else {
            console.log("로그인 상태가 아닙니다.");
        }
    }
    // ------------test----------



    const signInGoogle = async () => {
        try {
            await GoogleSignin.signIn();

            const { idToken } = await GoogleSignin.getTokens();
            const fcmToken = await messaging().getToken();

            const payload = {
                idToken: idToken,
                fcmToken: fcmToken,
            }

            // test
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            console.log(googleCredential);
            await auth().signInWithCredential(googleCredential);
            console.log("로그인성공");
            // test



            //백엔드에서 idToken 해체해서 uid로 조회해서 없으면 에러 / 있으면 fcmToken 업데이트하고 성공
            // axios
            //     .post('/auth/user/:id', payload)
            //     .then((response) => {
            //         googleLogin(response, dispatch);
            //     })
            //     .catch((error) => {
            //         alert(error.message+"구글계정으로 회원가입");
            //         // 회원가입 페이지 이동
            //         navigation.navigate("SignUp", {
            //             idToken: idToken,
            //             fcmToken: fcmToken,
            //             provider: 'GOOGLE',
            //         });
            //     });
            
        } catch (error) {
            console.log(error);
        }
    };

    
    return (        
        <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={icons.logo}
                            resizeMode="contain"
                            style={{
                                width: 400,
                                height: 120,
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
                            onPress={()=> navigation.navigate("SignUp")}
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
                                            margin: 5
                                        }}
                                    />
                                </View>
 
                                <Text style={{...FONTS.body4, color: COLORS.black}}>Google 계정으로 로그인</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={ testButton }
                        >
                            <Text style={{...FONTS.body4, color: COLORS.black}}>임시유저정보출력</Text>    
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
        marginHorizontal: 15
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
})

export default SignIn;
