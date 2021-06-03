/* eslint-disable prettier/prettier */
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getDistance } from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from '@env';
import axiosApiInstance from './axios';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';

Geocoder.init(GOOGLE_API_KEY, {language: 'ko'});




const setMemberInfo = async (dispatch, memberInfo) => {

    const memberData = {
        memberType:  memberInfo.data.data.memberType,
        email: memberInfo.data.data.email,
        nickName: memberInfo.data.data.nickName,
        phoneNum: memberInfo.data.data.phoneNum,
        point: memberInfo.data.data.point,
        storeId: memberInfo.data.data.storeId ? memberInfo.data.data.storeId : null,
    };
    //전역 변수에 member정보 저장
    await dispatch({ type: 'SIGN_IN', member: memberData });
    Toast.show({
        type: 'info',
        position: 'top',
        text1: '로그인 성공',
        text2: memberInfo.data.data.nickName + '님 반갑습니다.',
        visibilityTime: 3000,
        autoHide: true,
    });
};

export const getAccessToken = async () => {
    const user = auth().currentUser;
    if (user) {
        const token = await user.getIdToken();

        return token;
    } else {
        console.log('현재 로그인한 유저가 없음.');
        return Promise.reject('Not found user');
    }
};

export const autoLogin = async (dispatch) => {

    const user = auth().currentUser;

    if (user) {
        return axiosApiInstance.get('/member')
                .then( async (response) => {
                    if (response.data.data === 400){
                        Alert.alert('해당하는 멤버정보가 없습니다.');
                        logout(dispatch);
                    } else {
                        return setMemberInfo(dispatch, response);
                    }
                })
                .catch((error) => {
                    Alert.alert('서버 오류');
                    logout(dispatch);
                });
    } else {
        console.log('현재 로그인한 유저가 없음.');
    }
};

export const googleLogin = async (userInfo, dispatch, navigation) => {


    const fcmToken = await messaging().getToken();

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
                setMemberInfo(dispatch, response);
            }
        })
        .catch((error) => {
            Alert.alert(error);
            logout(dispatch);
        });
};


export const emailPasswordLogin = (data, dispatch) => {

    auth()
        .signInWithEmailAndPassword(data.email, data.pw)
        .then( async () => {
            axiosApiInstance
                .get('/member')
                .then(async (response) => {
                    if (response.data.data === 400){
                        Alert.alert('해당하는 멤버정보가 없습니다.');
                        logout(dispatch);
                    } else {
                        setMemberInfo(dispatch, response);
                    }
                })
                .catch((error) => {
                    Alert.alert('서버 오류');
                });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('이미 사용중인 이메일입니다.');
            }

            if (error.code === 'auth/invalid-email') {
                Alert.alert('유효한 이메일을 적어주세요.');
            }

            if (error.code === 'auth/weak-password') {
                Alert.alert('비밀번호는 최소 6글자가 필요합니다.');
            }

            if (error.code === 'auth/wrong-password') {
                Alert.alert('비밀번호가 틀립니다.');
            }

            if (error.code === 'auth/user-not-found') {
                Alert.alert('이메일이 틀립니다.');
            }

            console.error(error);
        });
};

export const logout = async (dispatch) => {
    const googleUser = await GoogleSignin.getCurrentUser();
    const user = auth().currentUser;

    if ( user && googleUser ) {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            console.log('구글 로그아웃성공');
            await auth()
                    .signOut()
                    .then(() => {
                      console.log('파이어베이스 로그아웃성공');
                      dispatch({ type: 'SIGN_OUT'});
                    });
        } catch (error) {
            console.error(error);
        }
    } else if (user) {
        await auth()
            .signOut()
            .then(() => {
              console.log('파이어베이스 로그아웃성공');
              dispatch({ type: 'SIGN_OUT'});
            });
    } else {
        console.log('로그인 상태가 아닙니다.');
    }
};

// 장소, 명칭 -> 좌표
export const geocode = async (address) => {
    try {
        const json = await Geocoder.from(address);
        const location = json.results[0].geometry.location;

        if (location.hasOwnProperty('lat','lng')) {
            location.latitude = location.lat;
            location.longitude = location.lng;
            delete location.lat;
            delete location.lng;
        }


        location.address = address.replace('대한민국 ','').replace('서울특별시 ','');
        return location;

    } catch (e) {
        console.log(e);
    }
};


// 좌표 -> 장소, 명칭
export const reverseGeocode = async (location) => {
    try {
        const json = await Geocoder.from(location.latitude, location.longitude);
        const addressComponent = json.results[0].formatted_address.replace('대한민국 ','').replace('서울특별시 ','');
        location.address = addressComponent;

        return location;
    } catch (e) {
        console.log(e);
    }
};


// 현재위치 얻기
export const currentLocation = async () => {

    // 위치권한 요청
    const result = await requestPermission();

    // error시 팔달관 좌표 반환
    let location = {
        latitude: 37.284492,
        longitude: 127.044153,
        address: '수원시 원천동 아주대학교 팔달관',
    };


    if (result === 'granted') {
        console.log( 'You can use the ACCESS_FINE_LOCATION' );

        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                async (position) => {

                    const geometry = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    location = await reverseGeocode(geometry);
                    resolve(location);

                },
                error => {
                    // 타임아웃 시, 초기location 반환
                    console.log(error);
                    resolve(location);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 30000,
                    maximumAge: 10000,
            });
        });
    } else {
        Alert.alert('설정에서 DutchDelivery가 기기 위치에 액세스하도록 허용해주세요.');
        return location;
    }
};


// platform에 따른 위치 동의요청
export const requestPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }

      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //   {
        //     title: 'Dutch Delivery App required Location permission',
        //     message: 'Dutch Delivery App access to your location ',
        //     buttonPositive: 'ok',
        //   },
        );
      }
    } catch (e) {
        console.log(e);
    }
};


// 두 좌표간에 거리
export const calculateDistance = (origLat, origLon, markerLat, markerLon) => {
    const distance = getDistance(
        {latitude: origLat, longitude: origLon},
        {latitude: markerLat, longitude: markerLon}
    );

    return distance;
};

export const createChatRoom = async (storeName, deliveryTime, deliveryPlace, groupId) => {

    firestore()
        .collection('THREADS')
        .add({
            name: storeName + ' ' + deliveryPlace + ' ' + deliveryTime,
            latestMessage: {
                text: '주문 생성이 성공되었습니다. 👏',
                createdAt: new Date().getTime(),
            },
        })
        .then(docRef => {
            docRef.collection('MESSAGES').add({
                text: '주문 생성이 성공되었습니다. 👏',
                createdAt: new Date().getTime(),
                system: true,
            }).then((res)=>{
                axiosApiInstance.post('/chatId',{
                    chatId: JSON.stringify(docRef.id),
                    groupId: groupId,
                })
            });
        });
};

export const digitTwo = (digit) => {

    return ('00' + JSON.stringify(digit)).slice(-2);
};