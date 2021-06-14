/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, ToastAndroid } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Header from '../../../../components/layout/Header';
import { COLORS, icons, FONTS2, SIZES } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axiosApiInstance from '../../../../utils/axios';
import { TextInput } from 'react-native-gesture-handler';

const StoreManagementMenu = ({ navigation, route }) => {

    const [storeInfo, setStoreInfo] = useState(route.params.storeInfo); /// route.params.storeInfo.menu

    const menu = route.params.storeInfo.menu;
    const [menuList, setMenuList] = useState(menu);

    const MenuItem = ({ menu, cost }) => {

        const [deleteModalVisible, setDeleteModalVisible] = useState(false);
        const [modifyModalVisible, setModifyModalVisible] = useState(false);

        const closeDeleteModal = () => {
            setDeleteModalVisible(!deleteModalVisible);
        };

        const closeModifyModal = () => {
            setModifyModalVisible(!modifyModalVisible);
        };

        const DeleteModal = () => {

            const modalBackgroundStyle = {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
            };

            const delMenu = (delMenuId) => {
                setMenuList((currentMenu) => {
                    return currentMenu.filter((menu) => menu.menuId !== delMenuId);
                });
            };
            return (
                <Modal
                    animationType='slide'
                    visible={deleteModalVisible}
                    onRequestClose={() => {
                        closeDeleteModal();
                    }}
                    transparent
                >
                    <View style={[styles.container, modalBackgroundStyle]}>
                        <View style={[styles.modal, {height: SIZES.height * 0.3}]}>
                            <Text style={{ ...FONTS2.body2, textAlign: 'center', }}>메뉴를 삭제하시겠습니까?</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: SIZES.base * 3, marginTop: SIZES.base * 3 }}>
                                <TouchableOpacity
                                    onPress={() => closeDeleteModal()}
                                >
                                    <Text style={{ ...FONTS2.body2 }}>닫기</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        axiosApiInstance.post('/deleteMenu', {
                                            menuId: menu.menuId,
                                        }).then(() => {
                                            closeDeleteModal();
                                            delMenu(menu.menuId);
                                            ToastAndroid.showWithGravity('메뉴가 삭제되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                                        }).catch((e) => {
                                            console.log(e);
                                            closeDeleteModal();
                                        });
                                    }}
                                >
                                    <Text style={{ ...FONTS2.h3 }}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        };

        const ModifyModal = () => {

            const modalBackgroundStyle = {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
            };

            const delReview = (delMenuId) => {
                setMenuList((currentMenu) => {
                    return currentMenu.filter((menu) => menu.menuId !== delMenuId);
                });
            };
            
            const [menuName, setMenuName] = useState(menu.menuName);
            const [menuPrice, setMenuPrice] = useState(menu.cost);
            const [description, setDescription] = useState(menu.description);

            console.log('cost: ', menu.cost);

            return (
                <Modal
                    animationType='slide'
                    visible={modifyModalVisible}
                    onRequestClose={() => {
                        closeModifyModal();
                    }}
                    transparent
                >
                    <View style={[styles.container, modalBackgroundStyle]}>
                        <View style={styles.modal}>

                            <Text style={{ ...FONTS2.body2, textAlign: 'center', marginBottom: 50 }}>메뉴를 수정하시겠습니까?</Text>

                            <Text style={{ ...FONTS2.h3, fontWeight: 'bold', marginHorizontal: 15 }}>메뉴 이름</Text>
                            <TextInput
                                style={[styles.textInput, {marginHorizontal: 15}]}
                                value={menuName}
                                onChangeText={setMenuName}
                            />
                            <Text style={{ ...FONTS2.h3, fontWeight: 'bold', marginHorizontal: 15 }}>메뉴 가격</Text>
                            <TextInput
                                style={[styles.textInput, {marginHorizontal: 15}]}
                                value={String(menuPrice)}
                                onChangeText={setMenuPrice}
                                keyboardType="numeric"
                            />
                            <Text style={{ ...FONTS2.h3, fontWeight: 'bold', marginHorizontal: 15 }}>메뉴 설명</Text>
                            <TextInput
                                style={[styles.textInput, {marginHorizontal: 15}]}
                                value={description}
                                onChangeText={setDescription}
                            />
            
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: SIZES.base * 3, marginTop: SIZES.base * 3 }}>
                                <TouchableOpacity
                                    onPress={() => closeModifyModal()}
                                >
                                    <Text style={{ ...FONTS2.body2 }}>닫기</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        axiosApiInstance.post('/modifyMenu', {
                                            menuId: menu.menuId,
                                            menuName: menuName,
                                            cost: menuPrice,
                                            description: description,
                                        }).then(() => {
                                            closeModifyModal();
                                            // delReview(menu.menuId);
                                            ToastAndroid.showWithGravity('메뉴가 수정되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                                        }).catch((e) => {
                                            console.log(e);
                                            closeModifyModal();
                                        });
                                    }}
                                >
                                    <Text style={{ ...FONTS2.h3 }}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        };
        
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SIZES.base * 3, paddingVertical: SIZES.base * 1.5, borderBottomWidth: 0.3 }}>
                <View>
                    <Text style={{ ...FONTS2.h4 }}>{menu.menuName}</Text>
                    <Text style={{ ...FONTS2.body2 }}> · {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={[styles.updateButton, { marginRight: SIZES.base }]}
                        onPress={() => setModifyModalVisible(!modifyModalVisible)}
                    >
                        <Text style={{ ...FONTS2.body3, color: '#495057' }}>수정</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => setDeleteModalVisible(!deleteModalVisible)}
                    >
                        <Text style={{ ...FONTS2.body3, color: '#495057' }}>삭제</Text>
                    </TouchableOpacity>
                </View>

                <ModifyModal />
                <DeleteModal />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header title='메뉴관리' small='true' />
            <ScrollView>
                <View style={styles.menuMaanagementHeader}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PromotionMenu')}
                        style={styles.menuButton}>
                        <Text style={{ ...FONTS2.h4, color: COLORS.white }}>프로모션 메뉴추가</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Menu')}
                        style={styles.menuButton}>
                        <Text style={{ ...FONTS2.h4, color: COLORS.white }}>일반메뉴 메뉴추가</Text>
                    </TouchableOpacity>
                </View>
                {menuList.map((menu, index) =>
                    <MenuItem key={index} menu={menu} cost={menu.cost} />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    menuMaanagementHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        backgroundColor: '#3897f1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 1.5,
        paddingHorizontal: SIZES.width * 0.05,
        borderRadius: 8,
        marginVertical: SIZES.base * 1.5,
        marginHorizontal: SIZES.base * 1.5,
        elevation: 5,
    },
    closeButton: {
        width: SIZES.base * 2,
        height: SIZES.base * 2,
        tintColor: COLORS.darkgray,
    },
    modal: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        height: responsiveHeight(65),
        width: responsiveWidth(85),
        alignSelf: 'center',
        marginTop: SIZES.padding,
        justifyContent: 'center',
    },
    updateButton: {
        borderColor: '#495057',
        borderWidth: 0.5,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: SIZES.base * 2,
        height: SIZES.height * 0.05,
    },
    textInput: {
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#adb5bd',
        marginVertical: SIZES.base * 0.7,
        marginHorizontal: SIZES.base * 2,
        ...FONTS2.body3,
    },
});

export default StoreManagementMenu;
