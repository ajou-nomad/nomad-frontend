/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Alert,
} from 'react-native';
import { SIZES, FONTS2, COLORS, icons } from '../../../constants';
import BottomButton from '../../../components/layout/BottomButton';
import AddMenu from '../../../components/item/AddMenu';
import uuid from 'react-native-uuid';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import axiosApiInstance from '../../../utils/axios';


const RegisterMenuDetail = ({navigation, route}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [storeInfo, setStoreInfo] = useState(route.params?.storeInfo); // 전 단계에서 넘어온 상점정보

    const [menus,setMenus] = useState([
        // {
        //     id: 'tempasdnasldanksd',
        //     name: '앗!메리카노(ICED)',
        //     price: 2000,
        //     description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        // },
        // {
        //     id: 'tempasdnasldanks34343434d',
        //     name: '완전초코(ICED)',
        //     price: 3500,
        //     description: '초코에 퐁당 빠지고 싶을때~!? 진짜~! 완~전 진한 초코라떼',
        // },
    ]);


    const closeModal = () => {
        setModalVisible(!modalVisible);
    };

    const addMenu = (menu) => {
        setMenus((prevMenus) => [
            ...prevMenus,
            {
                id: uuid.v4(),
                menuName: menu.name,
                cost: menu.price,
                description: menu.description,
                imgUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-fooddeliveryapp-c2ae6.appspot.com/o/tempimage%2Fpaik%2FICED-%EC%9B%90%EC%A1%B0%EC%BB%A4%ED%94%BC-450x588.png?alt=media&token=8495f7b9-8b69-4b51-aea2-41f444be69ad',
                //imgUrl: menu.imgUrl
            },
        ]);
    };

    const removeMenu = (menuId) => {
        setMenus((prevMenus) => {
          return prevMenus.filter((menu) => menu.id !== menuId);
        });
    };


    // menu_id, menu_name, menu_price, menu_description

    const renderItem = ({item}) => {
        return (
            <View style={{ margin: 15, flexDirection: 'row' }}>
                <View>
                    <Text style={{ ...FONTS2.h2 }}>{item.menuName}</Text>
                    <Text style={{ ...FONTS2.body2 }}>{item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                    <Text style={{ ...FONTS2.body4, color: '#707070' }}>{item.description}</Text>
                </View>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={()=>{
                        removeMenu(item.id);
                    }}
                >
                    <View style={styles.removeButtonView}>
                        <Text style={styles.buttonText}>삭제</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };



    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={{ flex: 1 }} >
                <View style={{
                    height: responsiveHeight(8),
                    backgroundColor: 'white',
                    borderBottomWidth: 0.5,
                    borderBottomColor: COLORS.darkgray,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>메뉴 정보</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Image
                            source={icons.plus2}
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    </TouchableOpacity>

                </View>


                {/* Body */}
                <View style={{ flex: 1 }}>
                    <AddMenu modalVisible={modalVisible} closeModal={closeModal} addMenu={addMenu} />
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <FlatList
                            data={menus}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </View>

                {/* Footer */}
                <BottomButton
                    onPress={() => {
                        axiosApiInstance.post('/menu', menus).then(function (response) {

                            //     //응답은 곧 생성완료이기 때문에 리렌더링하여 매장이 등록되어있을때의 화면으로 이동한다.
                            //     // 1. context의 user property에 dispatch하여 리렌딩
                            //응답은 곧 생성완료이기 때문에 리렌더링하여 매장이 등록되어있을때의 화면으로 이동한다.
                            // 1. context의 user property에 dispatch하여 리렌딩

                            //     console.log(response);
                            // }).catch(function (error) {
                            console.log(response);
                        }).catch(function (error) {

                            //     console.log(error);
                            // });
                            console.log(error);
                        });
                        Alert.alert('메뉴 등록이 완료되었습니다.');
                        navigation.navigate('StoreTabs');
                    }}
                    title="매장 등록하기"
                />
            </View>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    removeButton: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
    },
    removeButtonView: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.tertiary,
        opacity: 0.8,
        elevation: 5,
    },
    button: {
        // marginVertical: SIZES.height * 0.02,
        // width: SIZES.width * 0.15,
        position: 'absolute',
        right: 15,
    },
    buttonText:{
        ...FONTS2.body4,
        fontWeight: 'bold',
    },
});

export default RegisterMenuDetail;
