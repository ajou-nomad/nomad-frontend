/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';

import { logout } from '../../utils/helper';

import AvailableDeliveryListComponent from '../../components/carrier/AvailableDeliveryListComponent'
import { AuthContext } from '../../context/AuthContextProvider';


const CarrierDetail = (props) => {

  const { state, dispatch } = useContext(AuthContext);

    let deliveryInfo = [];
    const today = props.today;

    props.location === null ? console.log('Getting Location...') :
      props.availableGroup.map((groupInfo,groupIndex)=>{
          props.availableStore.map((storeInfo,storeIndex)=>{
            let newOne = 0;
            props.availableOrder.map((orderInfo,orderIndex)=>{
              if (groupInfo.storeId === storeInfo.storeId){
                  if (groupInfo.groupId === orderInfo.groupId ){
                    if (!newOne){
                      deliveryInfo = [...deliveryInfo, {index: groupIndex + storeIndex + orderIndex, groupData:groupInfo, storeData:storeInfo, orderArray: [orderInfo]}]
                      newOne = 1;
                    } else {
                      deliveryInfo[deliveryInfo.length - 1].orderArray = [...deliveryInfo[deliveryInfo.length-1].orderArray,orderInfo]
                    }
                }
              }
            });
          });
      });


    const Header = () =>{
        return (
          <View style={{  marginVertical: 5 , flexDirection: 'row', alignItems: 'center' }}>
            <View style={{flex:1}} >
              <TouchableOpacity
                onPress={() => {logout(dispatch);}}
                >
                <Text style={{ borderRadius: 15 ,borderWidth: 3, textAlign:'center', textAlignVertical:'center' , fontSize:17, fontWeight:'bold',width:'145%'}}>logout</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:5}} >
              <Text style={{fontSize: 28, fontWeight: 'bold' , marginLeft: 25, textAlignVertical:'center' , }} >배달 가능 그룹 목록</Text>
            </View>
            <View style={{flex:2}} >
              <Text style={{fontSize: 18, }} >{today}</Text>
            </View>
          </View>
        );
      };

    const renderAvailableGroup = ({item}) =>(
        <View style={{marginVertical: 15,borderWidth:2,borderRadius:15,}}>
            <AvailableDeliveryListComponent deliveryInfo={item} />
        </View>
    );


    return !props.availableOrder
    ? <Text style={{flex:1, textAlign:'center', textAlignVertical:'center'}} >현 위치를 불러오는 중 입니다...</Text>
    :
        <View>
            {Header()}
            <FlatList
                data={deliveryInfo}
                renderItem={renderAvailableGroup}
                keyExtractor={item => item.index.toString()}
            />
        </View>
    ;


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  destinationHeader: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
    flex: 1,
  },
  destinationHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width * 0.85,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
});

export default CarrierDetail;
