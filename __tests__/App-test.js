/* eslint-disable prettier/prettier */
/**
 * @format
 */

import 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import renderer from 'react-test-renderer';

const axiosDefault = axios.create({
  baseURL: 'http://3.36.251.255:8080',
});

test('server test', () => {
  return axiosDefault.get('/test').then(data => {
    //console.log(data.data)
    expect(data.data).toBe(1);
  });
});
