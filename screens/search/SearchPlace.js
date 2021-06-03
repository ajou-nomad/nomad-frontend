/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text, ImageBackground, Platform, Keyboard } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {FONTS, icons, SIZES} from '../../constants';
import { geocode } from '../../utils/helper';
import { GOOGLE_API_KEY } from '@env';

const SearchPlace = ({route, navigation}) => {

    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        let keyboardEventListeners;
        if (Platform.OS === 'android') {
            keyboardEventListeners = [
                Keyboard.addListener('keyboardDidShow', () => setIsSearch(true)),
                Keyboard.addListener('keyboardDidHide', () => setIsSearch(false)),
            ];
        }

        return () => {
            if (Platform.OS === 'android') {
                keyboardEventListeners &&
                keyboardEventListeners.forEach((eventListener) =>
                    eventListener.remove(),
                );
            }
        };
    }, []);


    const reftButton = () => {
        return (
            <TouchableOpacity
                style={{
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => navigation.goBack()}
            >
                <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                    <Image
                        source={icons.back2}
                        resizeMode = "contain"
                        style= {{
                            width: 17,
                            height: 17,
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1, backgroundColor: 'white' }}>
            <View style={{flex: 1}}>
                <GooglePlacesAutocomplete
                    placeholder="예) 아주대 팔달관"
                    minLength={2} // minimum length of text to search
                    debounce={100} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    onPress={(data, details = null) => {

                        geocode(data.description).then( (position) => {

                            // Pass and merge params back to DayDelivery screen
                            navigation.navigate({
                                name: route.params.prevScreen,
                                params: { post: position },
                                merge: true,
                            });
                        });

                    }}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'ko',
                        components: 'country:KR',
                    }}
                    renderLeftButton={reftButton}
                    styles={{
                        textInputContainer: {
                            marginTop: SIZES.height * 0.03,
                            marginRight: SIZES.padding,
                            alignSelf: 'center',
                            width: '95%',
                        },
                        textInput: {
                            borderWidth: 0.5,
                            borderColor: '#e9ecef',
                            backgroundColor: '#f1f3f5',
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                    }}
                    enablePoweredByContainer={false}
                />
            </View>
            {isSearch ? (
                <>
                </>
            ) : (
                <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
                    <ImageBackground
                            source={icons.logo_search}
                            resizeMode="contain"
                            style={{
                                height: 400,
                                width: 350,
                            }}
                    />
                    <Text style={{...FONTS.h2}}>
                        장소를 검색해주세요.
                    </Text>
                </View>
            )}
        </View>
      );
};

export default SearchPlace;
