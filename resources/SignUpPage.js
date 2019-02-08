import React, {Component} from 'react';
import {StyleSheet, Text, Image,View, TextInput, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';

export default class SignUpPage extends Component {	

	static navigationOptions = {
    	headerStyle: {backgroundColor: '#FFF', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,}
  	};

  	render() {
		return (
			<View style = {styles.container}>
				

				<TextInput placeholder = 'First Name'
					placeholderTextColor= 'grey'
					style = {styles.firstNameText}
				/>
				<Text />

				<TextInput placeholder = 'Last Name'
					placeholderTextColor= 'grey'
					style = {styles.lastNameText}
				/>
				<Text />

				<TextInput placeholder = 'Phone Number'
					placeholderTextColor= 'grey'
					style = {styles.phoneNumText}
				/>
				<Text />

				<TextInput placeholder = 'Email'
					placeholderTextColor= 'grey'
					style = {styles.emailText}
				/>
				<Text />

				<TouchableHighlight style={styles.buttonLoginContainer}>
						<Text style={styles.buttonLoginText}> SIGN UP </Text>
					</TouchableHighlight>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF'
	},
	firstNameText: {
		marginTop: '50%',
		marginLeft: '12.5%',
		marginRight: '12.5%',
		height: 40,
		textAlign: 'left',
		paddingLeft: 10,
		fontSize: 20,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		width: '75%',
	},

	lastNameText: {
		//marginTop: '50%',
		marginLeft: '12.5%',
		marginRight: '12.5%',
		height: 40,
		textAlign: 'left',
		paddingLeft: 10,
		fontSize: 20,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		width: '75%',
	},

	emailText: {
		//marginTop: '50%',
		marginLeft: '12.5%',
		marginRight: '12.5%',
		height: 40,
		textAlign: 'left',
		paddingLeft: 10,
		fontSize: 20,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		width: '75%',
	},

	phoneNumText: {
		//marginTop: '50%',
		marginLeft: '12.5%',
		marginRight: '12.5%',
		height: 40,
		textAlign: 'left',
		paddingLeft: 10,
		fontSize: 20,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		width: '75%',
	},

	buttonLoginContainer: {
		backgroundColor: '#3b5998',
		padding: 10,
		alignItems: 'center',
		width:'75%',
		borderRadius: 5,
		marginLeft: '12.5%',
		
	},

	buttonLoginText: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '300',
		fontSize: 20,
		fontFamily: 'OpenSans'

	},

});