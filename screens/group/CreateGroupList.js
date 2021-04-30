/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { FONTS2, icons, images } from '../../constants';


function CreateGroupList({navigation,route}) {

    const [location, setLocation] = useState(route.params.CurrentLocation);
    const noLocation = () => {
        return (
            <View style={styles.container}>
                {/* Header */}
                <View style={{
                    flex: 0.5,
                    backgroundColor: 'white',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#707070',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>배달 그룹 생성</Text>
                </View>

                {/* Body */}
                <View style={{ flex: 4, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Text style={{ ...FONTS2.body2, color: '#495057' }}>
                            주문 가능한 매장 목록이 없습니다.
                </Text>
                        <Text style={{ ...FONTS2.body2, color: '#495057' }}>
                            위치 정보 사용을 허용해주세요.
                </Text>
                    </View>
                </View>

                {/* Footer */}
                <TouchableOpacity
                    style={{ flex: 0.5 }}
                    // onPress={() => navigation.navigate('CreateGroupDetail')}
                onPress={() => setLocation('로케 얻음')}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: '#EDF2FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <Image
                            source={icons.gps}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 40,
                                marginRight: 10,
                            }}
                        />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>내위치</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    const haveLocation = () => {
        const listDetail = () => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 10, }}>
                <Image
                    source={images.store_logo}
                    resizeMode='contain'
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />

                <View style={{ flex: 1, alignSelf: 'center', marginLeft: 5, }}>
                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold', }}>빽다방 아주대점</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3,}}>
                        <Image
                        source={icons.star}
                        resizeMode='contain'
                        style={{
                            width: 23,
                            height: 23,
                            marginRight: 5,
                        }}
                        />
                        <Text style={{...FONTS2.body2, }}>4.2 </Text>
                        <Text style={{...FONTS2.body2, }}>(50+)</Text> 
                    </View>
                </View>

                <TouchableOpacity style={{
                    marginRight: 15,
                    flex: 0.3,
                    padding: 5,
                    alignItems: 'center',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    borderBottomRightRadius: 20,
                    borderColor: '#707070',
                    alignSelf: 'center',
                    width: 20,
                    }}
                    onPress={() => navigation.navigate('StoreDetail')}
                >
                    <Text style={{...FONTS2.h3 }}>선택</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    const renderBody = () => {
        return (
            <View style={{flex: 4}}>
                <View style={{
                    flex: 0.8,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
                >
                    <View style={{ marginRight: 15,}}>
                        <Text style={{ color: 'red', ...FONTS2.h2 }}>내 위치</Text>
                    </View>
                    <View>
                        <Text style={{ ...FONTS2.body2, }}>경기 수원시 영통구 월드컵로 206{'\n'}아주대학교 팔달관</Text>
                    </View>
                </View>

                <View style={{ flex: 5, backgroundColor: 'white', }}>
                    <ScrollView>
                        {listDetail()}
                        {listDetail()}
                        {listDetail()}
                        {listDetail()}
                        {listDetail()}
                        {listDetail()}
                        {listDetail()}
                        {listDetail()}
                        {listDetail()}
                        {listDetail()}
                    </ScrollView>
                </View>
            </View>
        );
    };

        return (
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={{
                    flex: 0.5,
                    backgroundColor: 'white',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#707070',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>배달 그룹 생성</Text>
                </View>

                {/* Body */}
                {renderBody()}
          
                {/* Footer */}
                <TouchableOpacity
                    style={{ flex: 0.5 }}
                    onPress={() => navigation.navigate('CreateGroupDetail',{deliveryLocation:location})}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: '#EDF2FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <Image
                            source={icons.gps}
                            resizeMode='contain'
                            style={{
                                width: 35,
                                height: 35,
                                marginRight: 10,
                            }}
                        />
                        <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>내위치</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            {location !== null ? haveLocation() : noLocation() }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CreateGroupList;
