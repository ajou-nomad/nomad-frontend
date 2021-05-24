/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import { TouchableOpacity, Image, Alert, View, Text, ImageBackground } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {COLORS, FONTS, FONTS2, icons, SIZES} from '../../constants';
import { geocode } from '../../utils/helper';
import { GOOGLE_API_KEY } from '@env';

const SearchPlace = ({route, navigation}) => {

    const [place, setPlace] = useState(undefined);
    const [isSearch, setIsSearch] = useState(false);


    const reftButton = () => {
        return (
            <TouchableOpacity
                style={{
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'center',
                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.back}
                    resizeMode = "contain"
                    style= {{
                        width: 17,
                        height: 17,
                    }}
                />
            </TouchableOpacity>
        );
    };

    const rightButton = () => {
        return (
            <TouchableOpacity
                style={{
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'center',
                }}
                onPress={() => Alert.alert('장소나 주소를 입력해주세요.')}
            >
                <Image
                    source={icons.search}
                    resizeMode="contain"
                    style= {{
                        width: 20,
                        height: 20,
                    }}
                />
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
                        // setPlace(data.description);
                    }}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'ko',
                        components: 'country:KR',
                    }}
                    renderLeftButton={reftButton}
                    // renderRightButton={rightButton}
                    textInputProps={{ 
                        onFocus: () => setIsSearch(true),
                    }}
                    styles={{
                        textInputContainer: {
                            marginTop: 10,
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
                    {/* <Text style={{...FONTS2.body2}}>
                        장소를 검색해주세요.
                    </Text> */}
                </View>
            )}
        </View>
      );
};

export default SearchPlace;
