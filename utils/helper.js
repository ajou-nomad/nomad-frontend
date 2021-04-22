import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';



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