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
} from 'react-native';
import { SIZES, FONTS2, COLORS, icons } from '../../constants';
import Header from '../../components/layout/Header';
import BottomButton from '../../components/layout/BottomButton';
import AddMenu from '../../components/item/AddMenu';
import uuid from 'react-native-uuid';


const RegisterFoodDetail = ({navigation, route}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [storeInfo, setStoreInfo] = useState(route.params?.storeInfo); // 전 단계에서 넘어온 상점정보

    const [menus,setMenus] = useState([
        {
            id: 'tempasdnasldanksd',
            name: '앗!메리카노(ICED)',
            price: 2000,
            description: '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        },
        {
            id: 'tempasdnasldanks34343434d',
            name: '완전초코(ICED)',
            price: 3500,
            description: '초코에 퐁당 빠지고 싶을때~!? 진짜~! 완~전 진한 초코라떼',
        },
    ]);


    const closeModal = () => {
        setModalVisible(!modalVisible);
    };

    const addMenu = (menu) => {
        setMenus((prevMenus) => [
            ...prevMenus,
            {
              id: uuid.v4(),
              name: menu.name,
              price: menu.price,
              description: menu.description,
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
                    <Text style={{ ...FONTS2.h2 }}>{item.name}</Text>
                    <Text style={{ ...FONTS2.body2 }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
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
            <View style={{flex: 1}} >
                {/* Header */}
                <Header title="메뉴 정보" small="true" />

                {/* add Button */}
                <TouchableOpacity
                        style={styles.button}
                        onPress={()=> setModalVisible(!modalVisible)}
                >
                    <View style={styles.buttonView}>
                        <Image
                            source={icons.plus}
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                        <Text style={styles.buttonText}>메뉴 추가</Text>
                    </View>
                </TouchableOpacity>

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
                <BottomButton onPress={() => console.log('axios로 매장등록하기')} title="매장 등록하기" />
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
        marginVertical: SIZES.height * 0.02,
        width: SIZES.width * 0.3,
        alignSelf: 'flex-end',
    },
    buttonView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.tertiary,
        opacity: 0.8,
        elevation: 5,
    },
    buttonText:{
        ...FONTS2.body4,
        fontWeight: 'bold',
    },
});

export default RegisterFoodDetail;
