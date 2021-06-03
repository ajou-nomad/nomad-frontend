/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, ScrollView, Image } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import Header from '../../../../components/layout/Header';
import { COLORS, SIZES, FONTS2, icons } from '../../../../constants';
import { launchImageLibrary } from 'react-native-image-picker';
import axiosApiInstance from '../../../../utils/axios';


const Button = ({ title, color, backColor, onPress }) => (
    <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: backColor }]}
        onPress={onPress}
    >
        <Text style={{ ...FONTS2.h4, color: color }}>{title}</Text>
    </TouchableOpacity>
);

const InputBox = ({ title, placeholder, description, state, setState }) => (
    <View style={{ marginBottom: SIZES.base * 2 }}>
        <Text style={{ ...FONTS2.h3, color: '#495057', }}>{title}</Text>
        <TextInput
            style={[styles.textInput, { minHeight: description ? responsiveHeight(15) : (null) }]}
            placeholder={placeholder}
            value={state}
            onChangeText={(text)=> setState(text)}
        />
    </View>
);

const Menu = () => {
    const navigation = useNavigation();
    const [menuName, setMenuName] = useState('');
    const [menuPrice, setMenuPrice] = useState('');
    const [description, setDescription] = useState('');
    const [promotionDescription, setPromotionDescription] = useState('');
    const [uploadImage, setUploadImage] = useState('https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2Fediya%2FIMG_1510820763649.png?alt=media&token=7aa455aa-202d-4de7-b440-7cee6911c3fc');

    const handleImage = () => {
        launchImageLibrary({}, (res) => {
            const source = { uri: res.uri };
            setUploadImage(res.uri);
            console.log(res.uri);
        });
    };


    return (
        <ScrollView style={styles.container} >
            <Header title="프로모션 메뉴추가" small="true" />

            <View style={{ padding: SIZES.base * 2, }}>
                <Text style={{ ...FONTS2.h2, marginBottom: SIZES.base * 3 }}>메뉴 정보</Text>
                <InputBox title="메뉴 이름" placeholder="메뉴 이름을 입력해주세요." state={menuName} setState= {setMenuName} />
                <InputBox title="메뉴 가격" placeholder="숫자만 입력해주세요." state={menuPrice} setState= {setMenuPrice} />
                <InputBox title="메뉴 설명" placeholder="메뉴에 대해 설명해주세요." description="true" state={description} setState= {setDescription}/>
                {/* 사진첨부 부분 */}
                {
                    uploadImage ? (
                        <View style={{ marginBottom: SIZES.base * 2 }}>
                            <Text style={{ ...FONTS2.h3, color: '#495057' }}>메뉴 사진</Text>
                            <View style={[styles.imgInput, { minHeight: responsiveHeight(15)  }]}>
                                <Image
                                    source={{ uri: uploadImage}}
                                    resizeMode='contain'
                                    style={{ width: 100, height: 100
                                    }}
                                />
                            </View>
                        </View>

                    ) : (
                        <View style={{ marginBottom: SIZES.base * 2 }}>
                            <Text style={{ ...FONTS2.h3, color: '#495057' }}>메뉴 사진</Text>
                            <View style={[styles.imgInput, { minHeight: responsiveHeight(15)  }]}>
                                <Image
                                    source={icons.cancel}
                                    resizeMode='contain'
                                    style={{ width: 100, height: 100
                                    }}
                                />
                            </View>
                        </View>
                    )
                }
                <TouchableOpacity
                    onPress={handleImage}
                >
                    <View style={{width: SIZES.width * 0.35, alignItems: 'center', marginBottom: 15}}>
                        <Text style={{ ...FONTS2.h4, fontWeight: 'bold', paddingBottom: 10 }}>사진 첨부</Text>
                    </View>
                </TouchableOpacity>
                <InputBox title="프로모션 설명" placeholder="프로모션에 대해 설명해주세요." description="true" state={promotionDescription} setState= {setPromotionDescription}/>
            </View>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.padding * 5 }}>
                <Button
                    title="취소하기"
                    color="#495057"
                    backColor="#f1f3f5"
                    onPress={() => navigation.goBack()}
                />
                <Button
                    title="등록하기"
                    color="white"
                    backColor="#3897f1" onPress={() => {

                        // console.log({
                        //     promotionMenuName: menuName,
                        //         cost: menuPrice,
                        //         description: description,
                        //         promotionDescription: promotionDescription,
                        // })
                        axiosApiInstance.post('promotionMenu',{
                            promotionMenuName: menuName,
                            cost: menuPrice,
                            description: description,
                            promotionDescription: promotionDescription,
                            // imgUrl: uploadImage,
                            imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2F04_%EC%95%97%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8_ICED-1.jpg?alt=media&token=d30d224f-53d5-4946-a943-fddc65bf4576',
                        }).then((response) => {
                            console.log(response)
                            navigation.goBack();
                            ToastAndroid.showWithGravity('메뉴가 등록되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        });
                    }} 
                />
            </View>
        </ScrollView>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    menuButton: {
        backgroundColor: '#3897f1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 1.5,
        borderRadius: 8,
        marginVertical: SIZES.base * 1.5,
        paddingHorizontal: SIZES.width * 0.1,
    },
    textInput: {
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#adb5bd',
        marginVertical: SIZES.base,
        textAlignVertical: 'top',
        padding: 10,
        ...FONTS2.body3,
    },
    imgInput: {
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#adb5bd',
        marginTop: SIZES.base * 2,
        textAlignVertical: 'top',
        padding: 10,
        ...FONTS2.body3,
        width: SIZES.width * 0.35,
        alignItems: 'center',
    }
})