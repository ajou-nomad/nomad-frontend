import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Keyboard, Text, View, Image, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button } from 'react-native';
import { icons, SIZES, FONTS, COLORS, keys } from "../constants";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { emailPasswordLogin, googleLogin } from '../utils/helper';
import messaging from '@react-native-firebase/messaging';
import { AuthContext } from '../context/AuthContextProvider';


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
        } else {
            Alert.alert("이메일과 비밀번호를 적어주세요.")
        }
    }



    const signInGoogle = async () => {
        try {
            await GoogleSignin.signIn();

            const { idToken } = await GoogleSignin.getTokens();
            const fcmToken = await messaging().getToken();

            const payload = {
                idToken: idToken,
                fcmToken: fcmToken,
            }



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

                        <TextInput onChangeText={setEmail} keyboardType="email-address" placeholder="이메일" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}/>
                        <TextInput onChangeText={setPassword} placeholder="비밀번호" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>


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
 
                                <Text style={{...FONTS.body3, color: COLORS.white}}>Google 계정으로 로그인</Text>
                            </View>
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
        backgroundColor: '#4285F4',
        marginTop: 15,
        marginHorizontal: 50,
        borderRadius: 5,
        width: 200,
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
