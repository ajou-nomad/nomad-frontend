/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { icons, SIZES, FONTS } from "../constants";

const SignUp = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>SignUp page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})

export default SignUp;
