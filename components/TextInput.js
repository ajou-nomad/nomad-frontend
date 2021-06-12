/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import {TextInput} from 'react-native';

const TextInputs = (props) => {
	let Ispassword = true;
	let keyType = 'default';
	let placeholders = props.type;

	if (props.type !== 'password') {
		Ispassword = false;
	}
	if (props.type === 'PhoneNumber' || props.type === 'validation') {
		keyType = 'numeric';
	}
	else if (props.type === 'email') {
		keyType = 'email-address';
	}
	return (
		<>
			<TextInput
				value={props.value}
				style={props.style}
				onChange={props.change}
				autoCapitalize="none"
				secureTextEntry={Ispassword}
				placeholder={placeholders}
				keyboardType={keyType}
			/>
		</>
	);
};

export default TextInputs;
