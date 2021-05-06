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
 import {icons, COLORS, SIZES, FONTS} from '../constants';
 
 import GroupInfo from '../components/GroupInfo';
 
 
 export default function GroupList(props) {
    const address = props.route.params.address;
    const back = props.route.params.back;
   const goBack = () => {
    props.navigation.navigate(back);
   };
 
   const sortPeople = () => {
     alert('인원 정렬');
   };
 
   const sortTime = () => {
     alert('시간 정렬');
   };
 
   const groupList = [
     {
       id: 'shop1',
       logo:icons.donut,
       shopName:'TempName1',
       rate:3.5,
       time:'9:00',
       current:9,
       max:10,
     },
     {
       id: 'shop2',
       logo:icons.pizza,
       shopName:'TempName2',
       rate:4.5,
       time:'9:10',
       current:5,
       max:10,
     },
     {
       id: 'shop3',
       logo:icons.noodle,
       shopName:'TempName3',
       rate:4.0,
       time:'9:20',
       current:7,
       max:10,
     },
     {
       id: 'shop4',
       logo:icons.rice_bowl,
       shopName:'TempName4',
       rate:3.5,
       time:'9:30',
       current:9,
       max:10,
     },
     {
       id: 'shop5',
       logo:icons.salad,
       shopName:'TempName5',
       rate:4.5,
       time:'9:40',
       current:5,
       max:10,
     },
     {
       id: 'shop6',
       logo:icons.sushi,
       shopName:'TempName6',
       rate:4.0,
       time:'9:50',
       current:7,
       max:10,
     },
     {
       id: 'shop7',
       logo:icons.drink,
       shopName:'TempName7',
       rate:3.5,
       time:'10:00',
       current:9,
       max:10,
     },
     {
       id: 'shop8',
       logo:icons.fries,
       shopName:'TempName8',
       rate:4.5,
       time:'10:10',
       current:5,
       max:10,
     },
     {
       id: 'shop9',
       logo:icons.hamburger,
       shopName:'TempName9',
       rate:4.0,
       time:'10:20',
       current:7,
       max:10,
     },
   ];
   const Header = () =>{
     return (
       <View style={styles.headerText}>
         <TouchableOpacity
           onPress={() => {goBack();}}
           >
           <Text style={styles.backButton}>&lt;</Text>
         </TouchableOpacity>
         <Text numberOfLines={1} style={styles.headerLocationText}>{address}</Text>
         <Text style={styles.headerDateText}>{/*props.date*/{date:'2021.04.23'}.date}</Text>
       </View>
     );
   };
 
   const SortButtons = () =>{
     return (
       <View style={styles.headerButtons}>
         <TouchableOpacity
           onPress={() => {sortPeople();}}
           style={styles.headerButton}
           >
           <Text style={styles.headerButtonText}>인원순</Text>
         </TouchableOpacity>
         <TouchableOpacity
           onPress={() => {sortTime();}}
           style={styles.headerButton}
         >
           <Text style={styles.headerButtonText}>시간순</Text>
         </TouchableOpacity>
       </View>
     );
   };
 
   const InfoOfGroup = ({item}) =>(
           <GroupInfo
             logo={item.logo}
             shopName={item.shopName}
             rate={item.rate}
             time={item.time}
             current={item.current}
             max={item.max}
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
       <SafeAreaView style={{marginBottom: 100}}>
         <FlatList
           data={groupList}
           renderItem={InfoOfGroup}
           keyExtractor={item => item.id}
         />
       </SafeAreaView>
     )
 
   const createNewGroup = () => {
     return (
       <TouchableOpacity style={styles.newGroup} onPress={()=>alert("여긴데요?")}>
           <View style={styles.newGroupView}>
               <Image
                   source={icons.search}
                   style={styles.logoStyle}
               />
               <View
                   style={styles.newGroupTextView}>
                   <Text style={styles.newGroupText}>새로운 그룹 만들기 페이지</Text>
               </View>
           </View>
     </TouchableOpacity>
     );
   };
 
   return (
     <>
       {Header()}
       {SortButtons()}
       {ListOfGroup()}
       {createNewGroup()}
     </>
   );
 }
 
 // react-native-linear-gradient
 // 연한 블루: #EDF2FF
 // 진한 블루: #364FC7
 // 회색: #F1F3F5
 
 const styles = StyleSheet.create({
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
     fontSize: 20,
     fontWeight: 'bold',
     position: 'absolute',
     right: 10,
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
   headerButtonText:{
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
   shopText:{
     fontSize:20,
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
     color: COLORS.white
   },
 });
 