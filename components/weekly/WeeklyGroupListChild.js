/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';
 import React, {useState} from 'react';
 import {
   SafeAreaView,
   FlatList,
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
   Image,
 } from 'react-native';
 import {icons, COLORS, SIZES, FONTS, FONTS2} from '../../constants';
 
 import GroupInfo from '../GroupInfo';
 import NewGroupButton from '../map/NewGroupButton';
 
 
 export default function GroupList(props) {
   const date = props.route.params.date;
   const time = props.route.params.time;
   const location = props.route.params.location;
   const currentGroup = props.route.params.currentGroup;
   const back = props.route.params.back;
   const groupList = props.route.params.groupList;
   const storeData = props.route.params.storeData;

   const goBack = () => {
     props.navigation.navigate(back,{
        date: props.date,
        location: props.location,
    });
   };
   const Header = () => {
     return (
       <View style={styles.headerText}>
         <TouchableOpacity
           onPress={() => { goBack(); }}
         >
           <Text style={styles.backButton}>&lt;</Text>
         </TouchableOpacity>
         <Text numberOfLines={1} style={styles.headerLocationText}>{location.buildingName}</Text>
         <Text style={styles.headerDateText}>{date}</Text>
       </View>
     );
   };

   const InfoOfGroup = ({item}) =>(
           <GroupInfo
             groupData={item}
             logo={item.logo}
             shopName={item.shopName}
             rate={item.rate}
             time={item.time}
             current={item.current}
             max={item.max}
             storeInfo={item.store}
             deliDate={date}
             location={location}
             storeData={storeData}
             styleGroupInfo={styles.groupInfo}
             styleLogoImage={styles.logoImage}
             styleShopText={styles.shopText}
             styleRating={styles.rating}
             styleStarImage={styles.starImage}
             styleRateText={styles.rateText}
             styleDeliveryTime={styles.deliveryTime}
             styleTimeImage={styles.timeImage}
             styleDeliveryTimeText={styles.deliveryTimeText}
             styleGroupNumber={styles.groupNumber}
             styleUserImage={styles.userImage}
             groupNumberText={styles.groupNumberText}
           />
     );
 
   const ListOfGroup = () => (
     <SafeAreaView style={{ marginBottom: 100 }}>
       <FlatList
         data={groupList}
         renderItem={InfoOfGroup}
         keyExtractor={item => item.groupId.toString()}
       />
     </SafeAreaView>
   );
   return (
     <View style={styles.container}>
       {Header()}
       {ListOfGroup()}
       <NewGroupButton initLocation={location} deliDate={date} storeData={storeData} />
     </View>
   );
 }
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
   },
   headerText: {
     flexDirection: 'row',
     alignItems: 'center',
   },
   backButton: {
     marginLeft: 8,
     fontSize: 42,
   },
   headerLocationText: {
     fontSize: 24,
     marginLeft: 50,
     width: '50%',
   },
   headerDateText: {
     ...FONTS2.body2,
     position: 'absolute',
     right: 12,
   },
   headerButtons: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent:'center',
     marginBottom: 5,
   },
   headerButton: {
     marginHorizontal: 10,
     padding: 5,
     borderColor: '#e5e5e5',
     borderWidth: 5,
     borderRadius: 25,
   },
   headerButtonText: {
     ...FONTS2.h2,
     fontSize: 14,
     fontWeight: 'bold',
   },
   mainView: {
     backgroundColor: '#eee',
     flex: 1,
     borderTopColor:'#000',
     borderTopWidth: 2,
     paddingTop: 10,
   },
   groupInfo:{
     flexDirection: 'row',
     marginLeft:10,
     marginVertical: 15,
     alignItems: 'center',
   },
   logoImage:{
     width: 45,
     height:45,
     marginHorizontal: 10,
   },
   shopText: {
     ...FONTS2.h3,
    //  fontSize:20,
     fontWeight:'bold',
   },
   rating:{
     flexDirection: 'row',
     alignItems:'center',
   },
   starImage:{
     width: 17,
     height:17,
     marginRight:5,
   },
   rateText:{
     fontSize: 16,
   },
   timeImage:{
     width: 17,
     height:17,
   },
   deliveryTime:{
     flexDirection: 'row',
     alignItems:'center',
   },
   deliveryTimeText:{
     fontSize:16,
   },
   userImage:{
     width: 20,
     height:20,
   },
   groupNumber:{
     flexDirection: 'row',
     alignItems:'center',
     marginLeft: 50,
     paddingHorizontal: 10,
     paddingVertical: 5,
     borderColor: '#1e1e1e',
     borderWidth: 2,
     borderRadius: 35,
     position: 'absolute',
     right: 5,
   },
   groupNumberText:{
     marginLeft:10,
     fontSize:16,
     fontWeight: 'bold',
   },
   newGroup: {
     flex: 1,
     position: 'absolute',
     bottom: 10,
     left: 0,
     right: 0,
     alignItems: 'center',
   },
   newGroupView:{
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     width: SIZES.width * 0.5,
     paddingVertical: SIZES.padding,
     paddingHorizontal: SIZES.padding * 2,
     borderRadius: SIZES.radius * 0.5,
     backgroundColor: '#364FC7',
     elevation: 5,
   },
   logoStyle:{
     width: 15,
     height: 15,
     tintColor: COLORS.white,
     marginRight: SIZES.padding,
   },
   newGroupTextView:{
     flex: 1,
     alignItems: 'center',
   },
   newGroupText:{
     ...FONTS.body4,
     color: COLORS.white,
   },
 });
 