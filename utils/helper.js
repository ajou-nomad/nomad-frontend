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
import firestore from '@react-native-firebase/firestore';

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


const setMemberInfo = async (dispatch, memberInfo) => {


    Alert.alert(memberInfo.data.data.nickName + '님 반갑습니다.');

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
};

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

export const autoLogin = async (dispatch) => {

    const user = auth().currentUser;

    if (user){
        return axiosApiInstance
            .get('/member')
            .then( async (response) => {

                if (response.data.data === 400){
                    Alert.alert('해당하는 멤버정보가 없습니다.');
                    logout(dispatch);
                } else {
                    return setMemberInfo(dispatch, response);
                }
            })
            .catch((error) => {
                Alert.alert(error);
                logout(dispatch);
            });
    } else {
        console.log('현재 로그인한 유저가 없음.');
        // return Promise.reject('Not Found User');
    }
};

export const googleLogin = async (response, dispatch) => {

    setMemberInfo(dispatch, response);
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
                    Alert.alert(error);
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



// -----------------------------------------------------------------------------------------

export const setData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log(key + '저장완료');
    } catch (e) {
        console.log(e);
        // saving error
    }
};

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
        // error reading value
    }
};

// 배열에 추가시
export const addData = async (key, value) => {
    try {
        let jsonValue = await AsyncStorage.getItem(key);

        jsonValue = JSON.parse(jsonValue).concat(value);

        //재저장
        const addedJsonValue = JSON.stringify(jsonValue);
        await AsyncStorage.setItem(key, addedJsonValue);
        console.log(key + '추가완료');

    } catch (e) {
        console.log(e);
    }
};

// 전체 삭제
export const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
};



export const getDaliyGroupData = async () => {

    const storeData =  await getData('storeData');

    return getData('groupData').then( (data) => {
        let dailyData = data.filter((goal) => goal.groupType === 'day');

        dailyData = dailyData.map( (groupDatum) => {

            let storeInfo = storeData.filter((store) => store.storeId === groupDatum.storeId);

            groupDatum.store = storeInfo[0];

            return groupDatum;

        });

        return dailyData;
    });
};



export const getWeeklyGroupData = async () => {

    const storeData =  await getData('storeData');

    return getData('groupData').then( (data) => {
        let weeklyData = data.filter((goal) => goal.groupType === 'weekly');

        weeklyData = weeklyData.map( (groupDatum) => {

            let storeInfo = storeData.filter((store) => store.storeId === groupDatum.storeId);

            groupDatum.store = storeInfo[0];

            return groupDatum;

        });

        return weeklyData;
    });
};

// post "participationGroup"
export const participationGroup = async (groupId, orderData) => {

    await getData('groupData').then( async (data) => {

        //object merge가 안되어서
        //해당 그룹만 가져온 후
        let seletedGroup = data.filter((goal) => goal.groupId === groupId);
        // 나머지 그룹
        let exceptedGroup = data.filter((goal) => goal.groupId !== groupId);

        let curr = seletedGroup[0].current + 1;
        //모집완료일 때
        if ( (curr) == (seletedGroup[0].maxValue) ){
            console.log('---', curr, seletedGroup[0].maxValue);

            console.log('모집완료시');
            // 위에서 count 증가 완료
            // 모집완료 상태 변경
            //참가하는 uid 추가
            seletedGroup[0].memberList.push('참가하는Uid');
            seletedGroup[0].orderStatus = 'recruitmentDone';

            orderData.orderStatus = 'recruitmentDone';
            orderData.orderId = 'orderId';
            orderData.uid = '8MaepsFt67SrssZX1zxA8s96S0k1';
            orderData.review = null;

            exceptedGroup.push(seletedGroup[0]);
            await setData('groupData',exceptedGroup);
            console.log('추가완료');

            // console.log(JSON.stringify(exceptedGroup,null,4));

            // await setData('groupData',exceptedGroup);
            // console.log('추가완료');
        } else {
            console.log('---', curr, seletedGroup[0].maxValue);
            console.log('아직 모집완료 x');
            // 위에서 count 증가 완료
            //참가하는 uid 추가
            seletedGroup[0].memberList.push('참가하는Uid');

            orderData.orderStatus = 'recruiting';
            orderData.orderId = 'orderId';
            orderData.uid = '8MaepsFt67SrssZX1zxA8s96S0k1';
            orderData.review = null;

            exceptedGroup.push(seletedGroup[0]);
            await setData('groupData',exceptedGroup);
            console.log('추가완료');
        }
    });

    console.log(JSON.stringify(orderData,null,4));
    await addData('orderData', orderData);
    console.log('최종적인 배달참가완성');
    Alert.alert("그룹에 참여가 완료되었습니다.");

    return 'complete';


    // {
    //     orderId: 1,
    //     uid: '8MaepsFt67SrssZX1zxA8s96S0k1',
    
    //     storeId: 1,
    //     storeName: '빽다방 아주대점',
    
    
    //     // orederStatus도 실제로는 member_Order table에서 groupId를 이용해서 받와야함.
    //     orederStatus: 'deliveryDone',
    
    //     // 실제로는 storeId를 통해서 해당 storeId로 이동 후
    //     //  해당 store에 연결된 review Table로 가서 해당 uid를 찾아 가져와야함.
    //     review: {
    //       uid: '8MaepsFt67SrssZX1zxA8s96S0k1',
    //       text: '가성비가 좋아요.!!',
    //       imgUrl: '',
    //     },
    
    //     menu: [
    //       {
    //         menuId: 1,
    //         menuName: '앗!메리카노(ICED)',
    //         cost: 2000,
    //         quantity: 1,
    //       }
    //     ],
    //     totalCost: 2000,
    //     payMethod: 'card',
    //     orderTime: '2021-05-15T15:30:00.480Z',
    //   },
};

export const createGroup = async (groupData, orderData) => {
    groupData.groupId = 5;
    groupData.current = 1;
    groupData.orderStatus = 'recruiting';
    orderData.orderId = 1000;
    orderData.uid = '생성한사람의UID';
    groupData.memberList = [
        "생성한사람의UID",
    ];

    await addData('groupData', groupData);

    await addData('orderData', orderData);

    return 'success';
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