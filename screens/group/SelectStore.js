/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FONTS2 } from '../../constants';

function SelectStore({ navigation }) {
    return (
        <View style={styles.container, {
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            flex: 1,
        }}>
            <Text style={{ ...FONTS2.h1 }}>임시 메장 페이지</Text>
            <TouchableOpacity
                style={{
                    width: 150,
                    height: 30,
                    backgroundColor: 'red',
                }}
                onPress={() => navigation.navigate('CreateGroupDetail')}>
                <Text style={{ ...FONTS2.h1, color: 'white', }}>그룹 생성하기</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default SelectStore;
