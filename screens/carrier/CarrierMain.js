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
import GoogleMap from '../../components/map/GoogleMap';
import NewGroupButton from '../../components/map/NewGroupButton';
import GpsButton from '../../components/map/GpsButton';
import { calculateDistance, currentLocation, getDaliyGroupData, getData } from '../../utils/helper';

import CarrierDetail from './CarrierDetail';


const CarrierMain = ({ route, navigation }) => {

    const [availableStore,setAvailableStore] = useState();

    const [location, setLocation] = useState(null);

    
    const [availableGroup, setAvailableGroup] = useState();
    const [availableOrder, setAvailableOrder] = useState();

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

	const checkGroupId = (orderGroupId, filteredGroup) => {
		let answer = 0;
		for (let i = 0; i < filteredGroup.length; i++) {
			if (filteredGroup[i].groupId === orderGroupId) {
				answer = 1;
				break;
			}
		}
		return answer;
	};

	const today = JSON.stringify(new Date('2021-05-21').toJSON()).substr(1, 10);


	useEffect(() => {
		currentLocation().then((currentLoction) => {
			getData('storeData').then((storeData) => {
				getData('groupData').then((groupData) => {
					getData('orderData').then((orderData) => { // orderData에 groupId가 필요함
						// console.log(JSON.stringify(orderData,null,4));
						const filteredStore = storeData.filter((storeInfo) => {
							return calculateDistance(currentLoction.latitude, currentLoction.longitude, storeInfo.latitude, storeInfo.longitude) <= 1000;
						});
						setAvailableStore(filteredStore);
						const filteredGroup = groupData.filter((groupInfo) => {
							return (checkStoreId(groupInfo.storeId, filteredStore) && groupInfo.orderStatus === 'recruiting' && groupInfo.date === today);
						});
						setAvailableGroup(filteredGroup);
						const filteredOrder = orderData.filter((orderInfo) => {
							return checkGroupId(orderInfo.groupId, filteredGroup);
						})
						setAvailableOrder(filteredOrder);
						setCurrentLocation(currentLoction);
					});
				});
			});
		});

	}, [route.params?.post]);


    

	return (
		<CarrierDetail
			availableGroup={availableGroup}
			availableStore={availableStore}
			availableOrder={availableOrder}
			location={location}
			today={today}
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
