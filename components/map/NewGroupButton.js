/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { icons, COLORS, SIZES, FONTS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import {getData} from '../../utils/helper';

const NewGroupButton = ({ initLocation, deliLocation, deliDate, datePicker, storeData }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.newGroup}
      onPress={() => navigation.navigate('CreateGroupList', { initLocation: initLocation, deliLocation: deliLocation, deliDate: deliDate, datePicker: datePicker, storeData: storeData })}
    >
      <View style={styles.newGroupView}>
        <Image
          source={icons.search}
          style={styles.logoStyle}
        />
        <View
          style={styles.newGroupTextView}>
          <Text style={styles.newGroupText}>원하는 조건이 없나요?</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    newGroup: {
      position: 'absolute',
      bottom: 25,
      width: SIZES.width * 0.55,
      alignSelf: 'center',
    },
    newGroupView:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.padding,
      paddingHorizontal: SIZES.padding * 2,
      borderRadius: SIZES.radius * 0.5,
      backgroundColor: '#1c7ed6',
      opacity: 0.9,
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

export default NewGroupButton;
