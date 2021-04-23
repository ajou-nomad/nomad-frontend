/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {getDistance, getPreciseDistance} from 'geolib';


// When a user signs in
// When the current user signs out
// When the current user changes
// When there is a change in the current user's token
export const idTokenChangedListeners = (state, dispatch) => {
    auth().onIdTokenChanged( async (user) => {
        if (user) {
            const prevIdToken = state.idToken;
            const nextIdToken = await user.getIdToken();
            if (prevIdToken !== nextIdToken) {
                console.log("아이디토큰이 바뀌었다.")
                // 여기서 바뀐 토큰을 asyncstore에 재저장 및 reducer에 재저장
                await AsyncStorage.setItem('userToken', nextIdToken);
                await dispatch({ type: 'RESTORE_TOKEN', token: nextIdToken });
            } else {
                console.log("불필요한 중복 호출");
            }
        } else {
            console.log("유저 정보없음");
        }
    })
}

export const getAccessToken = async () => {
    const user = auth().currentUser;
    if (user) {

        // 만료되었을 때만 refresh된 token을 줌.
        const token = await user.getIdToken();

        // true시 무조건 refresh된 token을 준다.
        // const token = await user.getIdToken(true);
        return token;
    } else {
        console.log("현재 로그인한 유저가 없음.");
        return null;
    }
}

export const googleLogin = async (response, dispatch) => {
    // firebase에 login
    const googleCredential = auth.GoogleAuthProvider.credential(response.idToken);
    await auth().signInWithCredential(googleCredential);
    const user = auth().currentUser;
    Alert.alert(user.displayName + '님 반갑습니다.');

    // STORAGE에 token 저장
    await AsyncStorage.setItem('userToken', response.idToken);
    // 전역 변수에 token 저장
    await dispatch({ type: 'SIGN_IN', token: response.idToken });
};


export const emailPasswordLogin = (data, dispatch) => {
    // firebase에 login
    auth()
        .signInWithEmailAndPassword(data.email, data.pw)
        .then( async () => {
            const user = auth().currentUser;
            alert(user.displayName + '님 반갑습니다.');

            const idToken = await user.getIdToken();
            const fcmToken = await messaging().getToken();

            const payload = {
                idToken: idToken,
                fcmToken: fcmToken,
            }
            
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
                Alert.alert("이미 사용중인 이메일입니다.");
            }

            if (error.code === 'auth/invalid-email') {
                Alert.alert("유효한 이메일을 적어주세요.");
            }

            if (error.code ==='auth/weak-password') {
                Alert.alert("비밀번호는 최소 6글자가 필요합니다.");
            }

            if (error.code === 'auth/wrong-password') {
                Alert.alert("비밀번호가 틀립니다.");
            }

            if (error.code === 'auth/user-not-found') {
                Alert.alert("이메일이 틀립니다.");
            }

            console.error(error);
        });
};

// 두 좌표간에 거리
export const calculateDistance = (origLat, origLon, markerLat, markerLon) => {
    const distance = getDistance(
        {latitude: origLat, longitude: origLon},
        {latitude: markerLat, longitude: markerLon}
    );
    console.log(`Distance= ${distance} Meter OR ${distance / 1000} KM`);
    return distance;
};