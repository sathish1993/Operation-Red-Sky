import React, {Component} from 'react';
import {StyleSheet, Text, Image,View, TextInput, TouchableHighlight, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Prompt from 'react-native-prompt-crossplatform';
import firebase from 'react-native-firebase';

export default class SignUpPage extends Component {	

	static navigationOptions = {
    	headerStyle: {backgroundColor: '#FFF', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,}
  	};

  	constructor(props) {
  		super(props);
  		this.state = {
  			firstName: '',
  			lastName: '',
  			phoneNumText: '',
  			email: '',
  			visiblePrompt: false,
  			confirmResult: null,
  			codeInput: ''
  			
  		}
  	}

  	_handleSignUp = () => {
  		const phoneNumber = '+1' + this.state.phoneNumText;
  		Alert.alert(phoneNumber)
  		firebase.auth().signInWithPhoneNumber(phoneNumber)
      		.then((response) => {
      			console.log("Resposne", response)
      			this.setState({ confirmResult: response, visiblePrompt: true})
      		})
      		.catch(error => console.log(error));		
  	}

  	_handleCodeVerification = () => {
  		const { codeInput, confirmResult } = this.state;
  		if (confirmResult && codeInput.length) {
      		confirmResult.confirm(codeInput)
        		.then((user) => {
        			Alert.alert('Code confirmed');
        			this.props.navigation.navigate('App')          			
        		})
        		.catch(error => console.log(error));
    	}
  	} 

  	render() {
		return (
			<View style = {styles.container}>
				

				<TextInput placeholder = 'First Name'
					placeholderTextColor= 'grey'
					style = {styles.firstNameText}
					onChangeText={(firstNameText) => this.setState({firstNameText})}
					value={this.state.firstNameText}
				/>
				<Text />

				<TextInput placeholder = 'Last Name'
					placeholderTextColor= 'grey'
					style = {styles.lastNameText}
					onChangeText={(lastNameText) => this.setState({lastNameText})}
					value={this.state.lastNameText}
				/>
				<Text />

				<TextInput placeholder = 'Phone Number'
					placeholderTextColor= 'grey'
					keyboardType= 'phone-pad'
					style = {styles.phoneNumText}
					onChangeText={(phoneNumText) => this.setState({phoneNumText})}
					value={this.state.phoneNumText}
				/>
				<Text />

				<TextInput placeholder = 'Email'
					placeholderTextColor= 'grey'
					style = {styles.emailText}
					onChangeText={(emailText) => this.setState({emailText})}
					value={this.state.emailText}
				/>
				<Text />

				<TouchableHighlight style={styles.buttonLoginContainer}
					onPress={() => {
								//this.props.navigation.navigate('App')
								this._handleSignUp();
							}}>
					<Text style={styles.buttonLoginText}> SIGN UP </Text>
				</TouchableHighlight>

				<Prompt title= 'Enter the OTP you received in Message' inputPlaceholder="OTP"
					isVisible={this.state.visiblePrompt}
					onChangeText={(text) => {
						this.setState({ codeInput: text });
					}}
					onCancel={() => {
						this.setState({
							promptValue: '',
							visiblePrompt: false,
						});
					}}
					onSubmit={() => {
						this.setState({
							visiblePrompt: false,
						});
						this._handleCodeVerification();
					}}
				/>
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
		backgroundColor: '#720e9e',
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