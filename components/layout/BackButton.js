/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { icons } from '../../constants';
import { useNavigation } from '@react-navigation/native';



const BackButton = (props) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{position: 'absolute', ...props.position }}
            onPress={() => navigation.goBack()}
        >
            <View style={[{justifyContent: 'center', alignItems: 'center', height: props.imageStyle.height * 2, width: props.imageStyle.width * 2}]}>
                <Image
                    source={icons.back2}
                    resizeMode="contain"
                    style={{ ...props.imageStyle}}
                />
            </View>
        </TouchableOpacity>
    );
};

export default BackButton;
