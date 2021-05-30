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
  Image,
} from 'react-native';
import { icons, COLORS, SIZES, FONTS, FONTS2 } from '../../constants';
import { useNavigation } from '@react-navigation/native';

import AvailableDeliveryListComponent from '../../components/carrier/AvailableDeliveryListComponent'
import { AuthContext } from '../../context/AuthContextProvider';
import { responsiveHeight } from 'react-native-responsive-dimensions';


const CarrierDetail = (props) => {

	const { state, dispatch } = useContext(AuthContext);
	const navigation = useNavigation();

	let deliveryInfo = [];
	const today = props.today;

	props.location === null ? console.log('Getting Location...') :
		props.availableGroup.map((groupInfo, groupIndex) => {
			props.availableStore.map((storeInfo, storeIndex) => {
				let newOne = 0;
				props.availableOrder.map((orderInfo, orderIndex) => {
					if (groupInfo.storeId === storeInfo.storeId) {
						if (groupInfo.groupId === orderInfo.groupId) {
							if (!newOne) {
								deliveryInfo = [...deliveryInfo, { index: groupIndex + storeIndex + orderIndex, groupData: groupInfo, storeData: storeInfo, orderArray: [orderInfo] }]
								newOne = 1;
							} else {
								deliveryInfo[deliveryInfo.length - 1].orderArray = [...deliveryInfo[deliveryInfo.length - 1].orderArray, orderInfo]
							}
						}
					}
				});
			});
		});


	const Header = () => {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: responsiveHeight(10), borderBottomWidth: 0.3, borderBottomColor: '#adb5bd',}}>
				<TouchableOpacity  style={{ position: 'absolute', left: 0, marginLeft: SIZES.base * 2, }} onPress={() => navigation.openDrawer()}>
					<Image source={icons.menu} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 3  }} />
				</TouchableOpacity>
				<Text style={{ ...FONTS2.h2 }} >배달 가능 목록</Text>
			</View>
		);
	};

	return (
		!props.availableOrder
			? <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} >현 위치를 불러오는 중 입니다...</Text>
			:
			<View style={styles.container}>
				<Header />
				<FlatList
					data={deliveryInfo}
					renderItem={({item}) => <AvailableDeliveryListComponent deliveryInfo={item} />}
					keyExtractor={item => item.index.toString()}
				/>
			</View>
	);


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
