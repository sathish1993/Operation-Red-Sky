import React, {Component} from 'react';
import {StyleSheet, Text, Image,View, TextInput, TouchableHighlight, Alert} from 'react-native';
import { Button, Tooltip } from 'react-native-elements';
import firebase from 'react-native-firebase';
import Prompt from 'react-native-prompt-crossplatform';

export default class BootScreen extends Component {

	static navigationOptions = {
    	headerStyle: {backgroundColor: '#FFF', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,},
  	};

  	constructor(props) {
  		super(props);
  		this.state = {
  			phoneNumText: '',
  			visiblePrompt: false,
  			confirmResult: null,
  			codeInput: ''
  		}
  	}

  	_handleSignIn = () => {
  		let phoneNumber = '+1'+this.state.phoneNumText;
  		// Alert.alert(isNaN(phoneNumber))
  		//while(isNaN(phoneNumber))
  		//	Alert.alert('Not a valid Phone Number. Ex: 919003088595')
  		//Alert.alert(phoneNumber)
  // 		let parsed = parseInt(phoneNumber, 10)
  // 		Alert.alert(parsed)
  // 		while(isNaN(parsed))
		// 	Alert.alert('Not a valid Phone Number. Ex: 919012378595')
		// phoneNumber = '+' + parsed
		// Alert.alert(phoneNumber)
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
				<TextInput placeholder = 'Phone Number'
					placeholderTextColor= 'grey'
					keyboardType= 'phone-pad'
					style = {styles.phoneNumText}
					onChangeText={(phoneNumText) => {
						this.setState({phoneNumText})
					}}
					value={this.state.phoneNumText}
				/>
				<Text /> 
				<TouchableHighlight style={styles.buttonLoginContainer}
					onPress={() => {
								this._handleSignIn();
							}}>
						<Text style={styles.buttonLoginText}> LOGIN </Text>
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
	phoneNumText: {
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