/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import { calculateDistance, currentLocation, getDaliyGroupData, getData } from '../../utils/helper';

import CarrierDetail from './CarrierDetail';
import axiosApiInstance from '../../utils/axios';


const CarrierMain = ({ route, navigation }) => {

    const [availableStore,setAvailableStore] = useState();

    const [location, setLocation] = useState(null);


    const [availableGroup, setAvailableGroup] = useState();


    const [deliveryInfo, setDeliveryInfo] = useState();

    const setCurrentLocation = (result) => {
        setLocation(result);
    };

	const checkStoreId = (groupStoreId, filteredStore) => {
		let answer = 0;
		for (let i = 0; i < filteredStore.length; i++) {
			if (filteredStore[i].storeId === groupStoreId) {
				answer = 1;
				break;
			}
		}
		return answer;
	};

	// const checkGroupId = (orderGroupId, filteredGroup) => {
	// 	let answer = 0;
	// 	for (let i = 0; i < filteredGroup.length; i++) {
	// 		if (filteredGroup[i].groupId === orderGroupId) {
	// 			answer = 1;
	// 			break;
	// 		}
	// 	}
	// 	return answer;
	// };

	const today = JSON.stringify(new Date('2021-05-21').toJSON()).substr(1, 10);
    useEffect(() => {
        // navigation에서 올때마다 최신데이터 호출( 리렌더링은 제외 )
        const unsubscribe = navigation.addListener('focus', async () => {

            currentLocation().then((currentLocation) => {

				axiosApiInstance.get('/delivery')
					.then((firstResponse) => {
						const waitingForDelivery = firstResponse.data.data;
						// console.log('waitingForDelivery: ' + JSON.stringify(waitingForDelivery));

						axiosApiInstance.get('storeList').then((secondResponse)=>{
							const storeList = secondResponse.data.data;
							// const orderList = thirdResponse.data.data;

							const filteredStore = storeList.filter((storeInfo) => {
								return calculateDistance(currentLocation.latitude, currentLocation.longitude, storeInfo.latitude, storeInfo.longitude) >= 0;
							});
							setAvailableStore(filteredStore);
							// console.log('filteredStore: ' + JSON.stringify(filteredStore,null,4));

							const filteredGroup = waitingForDelivery.filter((groupInfo) => {
								return (checkStoreId(groupInfo.storeId, filteredStore));
							});
							setAvailableGroup(filteredGroup);
							// console.log('filteredGroup: ' + JSON.stringify(filteredGroup,null,4));

							// console.log('filteredOrder: ' + JSON.stringify(filteredOrder,null,4));

							setCurrentLocation(currentLocation);
							

					}).catch(e => console.log(e));
				}).catch(e => console.log(e));
			}).catch(e => console.log(e));

		});

        //unmount 시 리스너 삭제
        return unsubscribe;
    }, []);

	// useEffect(() => {

	// 	currentLocation().then((currentLocation) => {
	// 		axiosApiInstance.get('/delivery')
	// 			.then((firstResponse) => {
	// 				const waitingForDelivery = firstResponse.data.data;

	// 				axiosApiInstance.get('storeList').then((secondResponse)=>{
	// 					const storeList = secondResponse.data.data;
	// 					// const orderList = thirdResponse.data.data;

	// 					const filteredStore = storeList.filter((storeInfo) => {
	// 						return calculateDistance(currentLocation.latitude, currentLocation.longitude, storeInfo.latitude, storeInfo.longitude) >= 0;
	// 					});
	// 					setAvailableStore(filteredStore);
	// 					// console.log('filteredStore: ' + JSON.stringify(filteredStore,null,4));

	// 					const filteredGroup = waitingForDelivery.filter((groupInfo) => {
	// 						return (checkStoreId(groupInfo.storeId, filteredStore));
	// 					});
	// 					setAvailableGroup(filteredGroup);
	// 					// console.log('filteredGroup: ' + JSON.stringify(filteredGroup,null,4));

	// 					// console.log('filteredOrder: ' + JSON.stringify(filteredOrder,null,4));

	// 					setCurrentLocation(currentLocation);

	// 			}).catch(e => console.log(e));
	// 		}).catch(e => console.log(e));
	// 	}).catch(e => console.log(e));



	// }, [route.params?.post]);

      


	return (
		<CarrierDetail
			availableGroup={availableGroup}
			availableStore={availableStore}
			location={location}
		/>
	);

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

export default CarrierMain;
