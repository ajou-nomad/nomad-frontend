/* eslint-disable prettier/prettier */
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { getDistance } from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from '@env';
import axiosApiInstance from './axios';

import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

Geocoder.init(GOOGLE_API_KEY, {language: 'ko'});


// // When a user signs in
// // When the current user signs out
// // When the current user changes
// // When there is a change in the current user's token
// export const idTokenChangedListeners = (state, dispatch) => {
//     auth().onIdTokenChanged( async (user) => {
//         if (user) {
//             const prevIdToken = state.idToken;
//             const nextIdToken = await user.getIdToken();
//             if (prevIdToken !== nextIdToken) {
//                 console.log('아이디토큰이 바뀌었다.');
//                 // 여기서 바뀐 토큰을 asyncstore에 재저장 및 reducer에 재저장
//                 await AsyncStorage.setItem('userToken', nextIdToken);
//                 await dispatch({ type: 'RESTORE_TOKEN', token: nextIdToken });
//             } else {
//                 console.log('불필요한 중복 호출');
//             }
//         } else {
//             console.log('유저 정보없음');
//         }
//     });
// };

export const getAccessToken = async () => {
    const user = auth().currentUser;
    if (user) {

        // 만료되었을 때만 refresh된 token을 줌.
        const token = await user.getIdToken();

        // true시 무조건 refresh된 token을 준다.
        // const token = await user.getIdToken(true);
        return token;
    } else {
        console.log('현재 로그인한 유저가 없음.');
        return Promise.reject('Not found user');
    }
};

export const autoLogin = async ({dispatch}) => {

    const user = auth().currentUser;

    if (user) {

        axiosApiInstance.get('/auth/user')
            .then( async (response) => {
                // 전역 변수에 token 저장
                await dispatch({ type: 'SIGN_IN', token: response.idToken });
            })
            .catch((error) => {
                console.log(error);
            });

        return "autologin";
    } else {
        console.log('현재 로그인한 유저가 없음.');
        return Promise.reject('Not found user');
    }


};

export const googleLogin = async (response, dispatch) => {

    // const currentUser = await GoogleSignin.getCurrentUser();

    // console.log(currentUser);

    // const googleCredential = auth.GoogleAuthProvider.credential(response.data.idToken);
    // await auth().signInWithCredential(googleCredential);

    Alert.alert(response.data.data[0].nickName + '님 반갑습니다.');

    const userData = {
        memberType:  response.data.data[0].memberType,
        email: response.data.data[0].email,
        nickName: response.data.data[0].nickName,
        phoneNum: response.data.data[0].phoneNum,
        point: response.data.data[0].point,
    }

    // // 전역 변수에 user 저장
    await dispatch({ type: 'SIGN_IN', member: userData });
};


export const emailPasswordLogin = (data, dispatch) => {
    // firebase에 login
    auth()
        .signInWithEmailAndPassword(data.email, data.pw)
        .then( async () => {
            const user = auth().currentUser;
            Alert.alert(user.displayName + '님 반갑습니다.');

            const idToken = await user.getIdToken();
            const fcmToken = await messaging().getToken();

            const payload = {
                idToken: idToken,
                fcmToken: fcmToken,
            };
            // // update fcmToken in DB
            // axios
            //     .post('/auth/user/:id', payload)
            //     .then( async (response) => {
            //         // STORAGE에 token 저장
            //         await AsyncStorage.setItem('userToken', response.idToken);
            //         // 전역 변수에 token 저장
            //         await dispatch({ type: 'SIGN_IN', token: response.idToken });
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });

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

// 장소, 명칭 -> 좌표
export const geocode = async (address) => {
    //Search by address
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
        latitude: 37.284696906069975,
        longitude: 127.04438918710983,
        address: '아주대학교 팔달관',
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

                    console.log('here: ', position);
                    location = await reverseGeocode(geometry);
                    resolve(location);

                },
                error => {
                    // 타임아웃 시, 초기location 반환
                    console.log(error);
                    resolve(location);
                    // reject(error);
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
