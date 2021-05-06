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
 
 import WeeklyGroupInfo from '../components/weekly/WeeklyGroupListParent';
 import NewGroupButton from '../components/map/NewGroupButton';
 
 
 export default function TimeTable(props) {
   const address = props.route.params.address;
   const today = JSON.stringify(new Date().toJSON()).substr(1,10);
   const back = props.route.params.back;
   const goBack = () => {
     props.navigation.navigate(back);
   };

   const [groupDate,setGroupDate] = useState(today);

   const setGroupDateValue = (dateDifference) =>{
    const d = new Date(today);
    d.setDate(d.getDate()+dateDifference);
    return JSON.stringify(d.toJSON()).substr(1,10);
   };

   const [day, setDay] = useState('monday');
   const groupList = [
     {
       id:'time1',
       time:'08~09',
       date: groupDate,
       location: address,
      //  currentGroup:6,
     },
     {
       id:'time2',
       time:'09~10',
       date: groupDate,
       location: address,
     },
     {
       id:'time3',
       time:'10~11',
       date: groupDate,
       location: address,
     },
     {
       id:'time4',
       time:'11~12',
       date: groupDate,
       location: address,
     },
     {
       id:'time5',
       time:'12~13',
       date: groupDate,
       location: address,
     },
     {
       id:'time6',
       time:'13~14',
       date: groupDate,
       location: address,
     },
     {
       id:'time7',
       time:'14~15',
       date: groupDate,
       location: address,
     },
     {
       id:'time8',
       time:'15~16',
       date: groupDate,
       location: address,
     },
     {
       id:'time9',
       time:'16~17',
       date: groupDate,
       location: address,
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
         <Text style={styles.headerDateText}>{today}</Text>
       </View>
     );
   };

   

   const todayDate = new Date(today);
   const todayDay = todayDate.getDay();
   const dayArrayEng = ['monday','tuesday','wednesday','thursday','friday'];
   const dayArrayKor = ['월','화','수','목','금'];
   const dateDifference = [1,2,3,4];
   const lastIndex = dateDifference.length - 1;
   let todayDayIndex = (todayDay%6)-1;
   if (todayDayIndex < 0){
    todayDayIndex = 0;
   }
   for(let i = 0; i < todayDayIndex; i++){
    dateDifference[lastIndex-i] += 2;
   }
   const dayArrayEngFixed = [...dayArrayEng.slice(todayDayIndex),...dayArrayEng.slice(0,todayDayIndex)]
   const dayArrayKorFixed = [...dayArrayKor.slice(todayDayIndex),...dayArrayKor.slice(0,todayDayIndex)]
   
   const DayButtons = () =>{
    return (
      <View style={styles.headerButtons}>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[0]);
            setGroupDate(setGroupDateValue(0));
          }}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[1]);
            setGroupDate(setGroupDateValue(dateDifference[0]));
          }}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[2]);
            setGroupDate(setGroupDateValue(dateDifference[1]));
          }}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[3]);
            setGroupDate(setGroupDateValue(dateDifference[2]));
          }}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[3]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDay(dayArrayEngFixed[4]);
            setGroupDate(setGroupDateValue(dateDifference[3]));
          }}
          style={styles.headerButton}
          >
          <Text style={styles.headerButtonText}>{dayArrayKorFixed[4]}</Text>
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
             day={day}
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
 