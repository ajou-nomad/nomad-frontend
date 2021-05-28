/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React, {useState} from 'react';
import {View, Text,Alert, TouchableOpacity, FlatList, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import DetailedOrder from './DetailedOrder';


export default function DetailedDelivery(props) {
        const navigation = useNavigation();
        const deliveryInfo = props.deliveryInfo;
        const [visibility,setVisibility] = useState(false);

        const renderDetailedDelivery = ({item}) =>{
            return (
            <View>
                <View>
                    <Text> 출발 장소 ( 매장 위치 ) : </Text>
                    <Text> {item.storeData.storeName} ({item.storeData.address}) </Text>
                </View>
                <View>
                    <Text> 도착 장소 ( 배달 위치 ) : </Text>
                    <Text> {item.groupData.buildingName} ({item.groupData.address}) </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text> 배달 시간 : </Text>
                    <Text> {item.groupData.time} 까지 </Text>
                </View>
                <DetailedOrder orderArray={item.orderArray} />
            </View>
        )}

        const button = () => {
            Alert.alert(
                '해당 배달을 선택하시겠습니까?',
                '',
                [
                  {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                  {text: 'YES', onPress: () => {
                    setVisibility(!visibility);
                    alert('post: change to 배달 중');
                    navigation.navigate('ChatScreen',{thread: {'_id': 'GommT2R6HnHV5Ky34Ars', 'latestMessage': {'createdAt': 1621420397090, 'text': '사진을 보냈습니다.'}, 'name': '빽다방 아주대점 팔달관 20:30'}});
                }},
                ]
            );
        }

        return (
            <View>
                <Modal
                    visible={visibility}
                    animationType="slide"
                    transparent= {true}
                >
                    <View style={{flex: 1}}>
                        <View style={{
                            width:'80%',
                            height: '90%',
                            backgroundColor: '#fefefe',
                            alignSelf: 'center',
                            borderWidth: 5,
                            borderColor:'#e0e0e0',
                            borderRadius: 4
                            }}>
                            <TouchableOpacity
                                onPress={()=>setVisibility(!visibility)}
                            >
                                <Text style={{fontSize:50,}} >X</Text>
                            </TouchableOpacity>
                            <FlatList
                                data={[deliveryInfo]}
                                renderItem={renderDetailedDelivery}
                                keyExtractor={item => item.groupData.groupId.toString()}
                            />
                            <TouchableOpacity
                                onPress={()=>{ button();}}
                                >
                                <Text style={{fontSize:24, marginTop:5, borderWidth:2, borderRadius:5, borderColor:'#22ff22', height:60 , textAlign:'center', textAlignVertical:'center'}} >선택</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                        onPress={()=>setVisibility(!visibility)}
                    >
                        <Text style={{fontSize:24, marginBottom:5 ,borderWidth:2, borderRadius:5, borderColor:'#22ff22'}} >상세 정보</Text>
                </TouchableOpacity>
            </View>

        );
}
