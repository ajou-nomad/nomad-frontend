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
 import {icons, COLORS, SIZES, FONTS, keys} from '../constants';
 
 import WeeklyGroupInfo from '../components/weekly/WeeklyGroupListParent';
 import NewGroupButton from '../components/map/NewGroupButton';
 
 
 export default function TimeTable(props) {
   const address = props.route.params.address;
   const back = props.route.params.back;
   const goBack = () => {
     props.navigation.navigate(back);
   };
 
   const groupList = [
     {
       time:'08~09',
       date:'2021-04-23',
       location: address,
       currentGroup:6,
     },
     {
       time:'09~10',
       date:'2021-04-23',
       location: address,
       currentGroup:4,
     },
     {
       time:'10~11',
       date:'2021-04-23',
       location: address,
       currentGroup:2,
     },
     {
       time:'11~12',
       date:'2021-04-23',
       location: address,
       currentGroup:7,
     },
     {
       time:'12~13',
       date:'2021-04-23',
       location: address,
       currentGroup:8,
     },
     {
       time:'13~14',
       date:'2021-04-23',
       location: address,
       currentGroup:5,
     },
     {
       time:'14~15',
       date:'2021-04-23',
       location: address,
       currentGroup:1,
     },
     {
       time:'15~16',
       date:'2021-04-23',
       location: address,
       currentGroup:9,
     },
     {
       time:'16~17',
       date:'2021-04-23',
       location: address,
       currentGroup:3,
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

   const DayButtons = () =>{
    return (
      <View style={styles.headerButtons}>
        <TouchableOpacity
          onPress={() => {console.log("Monday");}}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>월</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {console.log("Tuesday");}}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>화</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {console.log("Wednesday");}}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>수</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {console.log("Thursday");}}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>목</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {console.log("Friday");}}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>금</Text>
        </TouchableOpacity>
      </View>
    );
  };
   const InfoOfWeeklyGroup = ({item}) =>(
           <WeeklyGroupInfo
             time={item.time}
             date={item.date}
             location={item.location}
             currentGroup={item.currentGroup}
           />
     );
 
     const ListOfWeeklyGroup = () => (
       <SafeAreaView style={{marginBottom: 100}}>
         <FlatList
           data={groupList}
           renderItem={InfoOfWeeklyGroup}
           keyExtractor={item => item.id}
         />
       </SafeAreaView>
     );

   return (
     <>
       {Header()}
       {DayButtons()}
       {ListOfWeeklyGroup()}
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
     color: COLORS.white,
   },
 });
 