import React, {Component} from 'react';
import {StyleSheet, Text, Image,View, TextInput, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';

export default class BootScreen extends Component {

	static navigationOptions = {
    	headerStyle: {backgroundColor: '#FFF', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,}
  	};

	render() {
		return (
			<View style = {styles.container}>

				<View style={styles.logoContainer}>
					<Image style={styles.logo}
						source = {require('./images/flash1.png')}
					/>
					{//<Text style={styles.title}> Voice of Madras from Austin </Text>
					}
				</View>	

				<View style={styles.formContainer}>
					<TouchableHighlight style={styles.buttonLoginContainer}>
						<Text style={styles.buttonLoginText}> LOGIN </Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.buttonSignUpContainer}>
						<Text style={styles.buttonSignUpText}> SIGN UP </Text>
					</TouchableHighlight>
					
					
				</View>				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonLoginContainer: {
		backgroundColor: '#3b5998',
		padding: 10,
		alignItems: 'center',
		width:'75%',
		marginLeft: '12.5%',
		marginRight: '12.5%',
		marginBottom: '2%',
		borderRadius: 5

	},

	buttonLoginText: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '300',
		fontSize: 20,
		fontFamily: 'OpenSans'

	},

	buttonSignUpContainer: {
		backgroundColor: '#3b5998',
		padding: 10,
		alignItems: 'center',
		width:'75%',
		marginLeft: '12.5%',
		marginRight: '12.5%',
		marginBottom: '15%',
		borderRadius: 5
	},

	buttonSignUpText: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '300',
		fontSize: 20,
		fontFamily: 'OpenSans'
	},

	container: {
		flex: 1,
		backgroundColor: '#FFF'
	},
	logo: {
		height: 200,
		width: 200,
		backgroundColor: 'transparent'
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	title: {
		color: '#FFF',
		textAlign: 'center',
		fontSize: 15,
		fontFamily: 'OpenSans'
	}
});