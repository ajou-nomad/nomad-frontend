/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TouchableOpacity, Image, Alert } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {icons, SIZES, keys} from '../../constants';
import { searchAddress } from '../../utils/helper';


const SearchPlace = ({route, navigation}) => {

    const [place, setPlace] = useState(undefined);


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
                    resizeMode='contain'
                    style= {{
                        width: 20,
                        height: 20
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
                onPress={() => {

                    if ( place ) {
                        searchAddress(place).then( (position) => {




                            // Pass and merge params back to DayDelivery screen
                            navigation.navigate({
                                name: route.params.screen,
                                params: { post: position },
                                merge: true,
                            });
                        });
                    } else {

                        Alert.alert("장소나 주소를 선택해주세요.");
                    }

                }}             
            >
                <Image
                    source={icons.search}
                    resizeMode='contain'
                    style= {{
                        width: 20,
                        height: 20
                    }}
                />
            </TouchableOpacity>
        );
    };


    return (
        <GooglePlacesAutocomplete
            placeholder='주소를 입력하세요'
            minLength={2} // minimum length of text to search
            debounce={100} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            onPress={(data, details = null) => {

                //클릭 시 place 저장
                setPlace(data.description);
            }}
            query={{
                key: keys.GOOGLE_API_KEY,
                language: 'ko',
                components: 'country:KR'
            }}
            renderLeftButton={reftButton}
            renderRightButton={rightButton}
            styles={{
                textInputContainer: {
                    marginTop: 10,
                    alignSelf: 'center',
                    width: '100%',
                },
                description: {
                    fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                },
            }}
        />
      );
};

export default SearchPlace;
