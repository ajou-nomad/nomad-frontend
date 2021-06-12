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
  Alert,
  Button,
  Image,
} from 'react-native';
import { icons, COLORS, SIZES, FONTS, FONTS2 } from '../../constants';
import { useNavigation } from '@react-navigation/native';

import AvailableDeliveryListComponent from '../../components/carrier/AvailableDeliveryListComponent'
import { AuthContext } from '../../context/AuthContextProvider';
import { responsiveHeight } from 'react-native-responsive-dimensions';

import { createChatRoom } from '../../utils/helper';


const CarrierDetail = (props) => {

	// const { state, dispatch } = useContext(AuthContext);
	const navigation = useNavigation();
	// const [deliveryInfo, setDeliveryInfo] = useState();

	let deliveryInfo = [];


	console.log('props: ', JSON.stringify(props, null, 4));



	!props.availableGroup ? console.log('Getting AvailableGroup...') :
		props.availableGroup.map((groupInfo, groupIndex) => {
			props.availableStore.map((storeInfo, storeIndex) => {
				if (groupInfo.storeId === storeInfo.storeId) {
					deliveryInfo = [...deliveryInfo, { index: groupIndex + storeIndex, groupData: groupInfo, storeData: storeInfo }];
				}
			});
		});
    
	// console.log('deliveryInfo: ' + JSON.stringify(deliveryInfo,null,4));

	const Header = () => {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: responsiveHeight(10), borderBottomWidth: 0.3, borderBottomColor: '#adb5bd', }}>
				<TouchableOpacity style={{ position: 'absolute', left: 0, marginLeft: SIZES.base * 2, }} onPress={() => navigation.openDrawer()}>
					<Image source={icons.menu} resizeMode='contain' style={{ width: SIZES.base * 2.5, height: SIZES.base * 3 }} />
				</TouchableOpacity>
				<Text style={{ ...FONTS2.h2 }} >배달 가능 목록</Text>
			</View>
		);
	};

	return (
		!props.location
			?
			<View style={styles.container}>
				<Header />
				<Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center', ...FONTS2.body2 }} >현 위치를 불러오는 중 입니다...</Text>
			</View>
			:
			deliveryInfo.length === 0
				?
				<View style={styles.container}>
					<Header />
					<Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} >참여 가능한 배달 그룹이 존재하지 않습니다!</Text>
				</View>
				:
				<View style={styles.container}>
					<Header />
					<FlatList
						data={deliveryInfo}
						renderItem={({ item }) => <AvailableDeliveryListComponent deliveryInfo={item} />}
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
