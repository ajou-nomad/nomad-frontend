/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import TextInputs from '../components/TextInput';

import PhoneNumber from '../components/login/PhoneNumber';
import PhoneValid from '../components/login/PhoneValid';
import UserInfo from '../components/login/UserInfo';

export default function SignUpScreen(props) {
  const [userType, setUserType] = useState('User');
  const [phoneNumber, setPhoneNumber] = useState(props.route.params.phoneNumber);
  const googlePhoneUnique = props.route.params.phoneNumber !== '';
  const [phoneUnique, setPhoneUnique] = useState(googlePhoneUnique);
  const [validCode, setValidCode] = useState('');
  const [phoneValid, setPhoneValid] = useState(props.route.params.phoneNumber !== '');
  const [email, setEmail] = useState(props.route.params.email);
  const [emailValid, setEmailValid] = useState(props.route.params.email !== '');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState(props.route.params.nickname);
  const [IsUser, setIsUser] = useState(true);
  const [IsShop, setIsShop] = useState(false);
  const [IsDeli, setIsDeli] = useState(false);
  const [ShopIdNumber,setShopIdNumber] = useState();
  const [DeliIdNumber,setDeliIdNumber] = useState();
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const IsGoogle = props.route.params.IsGoogle;
  

  const onChangePhoneNumber = event => {
    setPhoneNumber(event.nativeEvent.text);
  };
  const onChangeEmail = event => {
    setEmail(event.nativeEvent.text);
  };

  const onChangePassword = event => {
    setPassword(event.nativeEvent.text);
  };

  const onChangeNickname = event => {
    setNickname(event.nativeEvent.text);
  };

  const onChangeValidCode = event => {
    setValidCode(event.nativeEvent.text);
  };

  const onChangeShopIdNumber = event => {
    setShopIdNumber(event.nativeEvent.text);
  }

  const onChangeDeliIdNumber = event => {
    setDeliIdNumber(event.nativeEvent.text);
  }

  const emailCheckDuplicated = () => {
    if (
      email.split('@').length !== 2 ||
      email.split('.').length !== 2 ||
      email.split('@')[0].length === 0 ||
      email.split('@')[1].length === 0 ||
      email.split('@')[1].split('.')[0].length === 0 ||
      email.split('@')[1].split('.')[1].length === 0
    ) {
      alert('올바르지 않은 이메일!');
    } else if (email === 'example@gmail.com') {
      return alert('이메일 중복');
    } else {
      alert('사용가능한 이메일!');
      setEmailValid(true);
    }
  };

  const termSelected = where => {
    switch (where) {
      case 'all': {
        if (term1 && term2) {
          setTerm1(false);
          setTerm2(false);
        } else {
          setTerm1(true);
          setTerm2(true);
        }
        break;
      }
      case 'term1': {
        setTerm1(!term1);
        break;
      }
      case 'term2': {
        setTerm2(!term2);
        break;
      }
    }
  };

  const getInfo = typeOfUser => {
    switch (typeOfUser) {
      case 'User':
        setUserType('User');
        setIsUser(true);
        setIsShop(false);
        setIsDeli(false);
        break;
      case 'Shop':
        setUserType('Shop');
        setIsUser(false);
        setIsShop(true);
        setIsDeli(false);
        break;
      case 'Deli':
        setUserType('Deli');
        setIsUser(false);
        setIsShop(false);
        setIsDeli(true);
        break;
    }
  };

  const checkEmptyExist = () => {
    if (
      phoneValid &&
      // emailValid &&
      // password.length > 0 &&
      nickname.length > 0 &&
      term1
    ) {
      alert('회원가입이 완료되었습니다.');
      props.navigation.navigate('SignIn');
      setUserType('User');
      setPhoneNumber('');
      setPhoneUnique(false);
      setValidCode('');
      setPhoneValid(false);
      setEmail('');
      setEmailValid(false);
      setPassword('');
      setNickname('');
      setIsUser(true);
      setIsShop(false);
      setIsDeli(false);
      setTerm1(false);
      setTerm2(false);
      setConfirm(null);
    } else {
      alert('필요한 정보를 모두 입력해주세요!');
    }
  };

  const signInWithPhoneNumber = () => {
    const validPhoneNumber = '+82 ' + phoneNumber.substr(1);
    auth().signInWithPhoneNumber(validPhoneNumber).then(
        (confirmation) => {
            setConfirm(confirmation);
            setPhoneUnique(true);
        }).catch(error =>{
        console.log(error);
    });
  };
  const confirmCode = () => {

    //   user.delete().then(function() {
    //     // User deleted.
    //   }).catch(function(error) {
    //     // An error happened.
    //   }); 
    confirm.confirm(validCode).then( ()=>{
      // let user = auth().currentUser;
      auth().currentUser.delete().then(()=>{
        setPhoneValid(true);
      }).catch(error =>  console.log('Delete Failed.'));

    }).catch(error =>  console.log('Invalid code.'));
  };
  

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignIn');
            setUserType('User');
            setPhoneNumber('');
            setPhoneUnique(false);
            setValidCode('');
            setPhoneValid(false);
            setEmail('');
            setEmailValid(false);
            setPassword('');
            setNickname('');
            setIsUser(true);
            setIsShop(false);
            setIsDeli(false);
            setTerm1(false);
            setTerm2(false);
            setConfirm(null);
          }}>
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>회원가입</Text>
      </View>
      <ScrollView style={styles.mainView}>
        {googlePhoneUnique ||
        <>
          <PhoneNumber
            phoneNumber={phoneNumber}
            inputStyle={styles.input}
            mainTxtStyle={styles.mainText}
            userBtnSyle={styles.userTypeButton}
            userTxtStyle={styles.userTypeText}
            changePhoneNumber={onChangePhoneNumber}
            duplicated={signInWithPhoneNumber}
          />
          <PhoneValid
            validCode={validCode}
            inputStyle={styles.input}
            phoneUnique={phoneUnique}
            mainTxtStyle={styles.mainText}
            changeValidCode={onChangeValidCode}
            validation={confirmCode}
          />
        </>
        }
        <UserInfo
          phoneValid={phoneValid}
          IsGoogle={IsGoogle}
          email={email}
          password={password}
          nickname={nickname}
          userType={{IsUser:IsUser,IsShop:IsShop,IsDeli:IsDeli}}
          term1={term1}
          term2={term2}
          inputStyle={styles.input}
          mainTxtStyle={styles.mainText}
          normalTxtStyle={styles.normText}
          subTxtStyle={styles.subText}
          userBtnSyle={styles.userTypeButton}
          userTxtStyle={styles.userTypeText}
          confirmBtnStyle={styles.confirmButton}
          confirmTxtStyle={styles.confirmText}
          btnIdle={styles.btnIdle}
          subBtnIdle={styles.subBtnIdle}
          btnSelected={styles.btnSelected}
          subBtnSelected={styles.subBtnSelected}
          getInfo={getInfo}
          changeEmail={onChangeEmail}
          changePassword={onChangePassword}
          changeNickname={onChangeNickname}
          changeShopIdNumber={onChangeShopIdNumber}
          changeDeliIdNumber={onChangeDeliIdNumber}
          duplicated={emailCheckDuplicated}
          termSelected={termSelected}
          checkEmptyExist={checkEmptyExist}
        />
        {/* <TextInputs style={styles.input} change={this.onChangeEmail} value={this.state.email} type='email'  />
                    <TextInputs style={styles.input} change={this.onChangePassword} value={this.state.password} type='password'  />
                    <TextInputs style={styles.input} change={this.onChangeNickname} value={this.state.nickname} type='nickname'  />
                    <View style={{
                      flexDirection:'row',
                      marginTop: 5,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress = {()=>{this.getInfo("User");}}
                      style={styles.userTypeButton}

                    >
                      <Text style={styles.userTypeText}>User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress = {()=>{this.getInfo("Shop"); }}
                     style={styles.userTypeButton}
                    >
                      <Text style={styles.userTypeText} >Shop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress = {()=>{this.getInfo("Deli"); }}
                     style={styles.userTypeButton}
                    >
                      <Text style={styles.userTypeText} >Deli</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={ ()=>{
                          alert(JSON.stringify(this.state))
                          // this.props.navigation.navigate('Login')
                        }
                        }
                        style={styles.confirmButton}
                    >
                       <Text style={styles.confirmText}>회원가입 하기</Text>
                    </TouchableOpacity> */}
      </ScrollView>
    </>
  );
}

// react-native-linear-gradient
// 연한 블루: #EDF2FF
// 진한 블루: #364FC7
// 회색: #F1F3F5

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 8,
    fontSize: 42,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  mainView: {
    backgroundColor: '#eee',
    flex: 1,
  },
  mainText: {
    color: '#111',
    fontSize: 24,
    padding: 5,
  },
  normText: {
    color: '#222',
    fontSize: 20,
    padding: 5,
  },
  subText: {
    color: '#333',
    fontSize: 16,
    padding: 5,
  },
  input: {
    backgroundColor: '#fff',
    marginVertical: 5,
    marginLeft: 10,
    fontSize: 14,
    padding: 10,
    width: 200,
  },
  btnIdle: {
    width: 20,
    height: 20,
    backgroundColor: '#e1e1e1',
    alignSelf: 'center',
  },
  subBtnIdle: {
    width: 15,
    height: 15,
    backgroundColor: '#e1e1e1',
    alignSelf: 'center',
  },
  btnSelected: {
    width: 20,
    height: 20,
    backgroundColor: '#1e1e1e',
    borderColor: '#e1e1e1',
    borderWidth: 4,
    alignSelf: 'center',
  },
  subBtnSelected: {
    width: 15,
    height: 15,
    backgroundColor: '#1e1e1e',
    borderColor: '#e1e1e1',
    borderWidth: 3,
    alignSelf: 'center',
  },
  userTypeButton: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 25,
    alignSelf: 'center',
  },
  userTypeText: {
    fontSize: 17,
    color: '#000',
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    // backgroundColor: '#21ff54',
    alignSelf: 'center',
  },
  confirmText: {
    fontSize: 25,
    color: '#21ff54',
    fontWeight: 'bold',
  },
});
