/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTS2, icons, SIZES } from '../../constants';
import { AuthContext } from '../../context/AuthContextProvider';
import { logout } from '../../utils/helper';
import { useNavigation } from '@react-navigation/native';


const CarrierProfile = () => {

    const { state, dispatch } = useContext(AuthContext);

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, marginHorizontal: SIZES.base * 3, marginTop: SIZES.base * 5 }}>
            <View style={{ marginBottom: SIZES.base * 2 }}>
                <Image source={icons.avatar} resizeMode="contain" style={{ width: SIZES.width * 0.13, height: SIZES.height * 0.08, marginRight: SIZES.base, marginBottom: SIZES.base * 2 }} />


                 <View style={{ flexDirection: 'row'   }}>
                    <Text style={{ ...FONTS2.h2, textAlign: 'left', alignSelf: 'stretch' }}>{state.member.nickName}</Text>
                    <Text style={{ ...FONTS2.body3, color: 'white', alignSelf: 'center', backgroundColor: '#2f9e44', paddingHorizontal: SIZES.base, paddingVertical: SIZES.base * 0.5, borderRadius: 8, marginLeft: SIZES.base}}>배달원</Text>
                    </View>
                <Text style={{ ...FONTS2.body3, textAlign: 'left', alignSelf: 'stretch', color: '#868e96' }}>{state.member.email}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CarrierMain')} >
                <Image source={icons.checkbox} resizeMode="contain" style={{ width: SIZES.base * 3, height: SIZES.base * 3, tintColor: '#343a40' }} />
                <Text style={{ ...FONTS2.h4, color: '#343a40', marginHorizontal: SIZES.base * 3 }}>배달 가능 목록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CarrierChatList')}>
                <Image source={icons.chat} resizeMode="contain" style={{ width: SIZES.base * 3, height: SIZES.base * 3, tintColor: '#343a40' }} />
                <Text style={{ ...FONTS2.h4, color: '#343a40', marginHorizontal: SIZES.base * 3 }}>채팅방</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { logout(dispatch); }}>
                <Image source={icons.logout} resizeMode="contain" style={{ width: SIZES.base * 3, height: SIZES.base * 3, tintColor: '#343a40' }} />
                <Text style={{ ...FONTS2.h4, color: '#343a40', marginHorizontal: SIZES.base * 3 }}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.base * 4,
        paddingBottom: SIZES.base,
        // borderBottomWidth: 0.8,
        // borderBottomColor: '#f1f3f5'
    },
});

export default CarrierProfile;
