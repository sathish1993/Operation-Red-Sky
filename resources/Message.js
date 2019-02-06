import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Keyboard, Alert, Image, TouchableWithoutFeedback} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import firebase from './Firebase';

export default class Message extends Component {

	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('messages');
		this.state = {
			text: '',
			photoSource: {},
			clearInput: false
		};
	}

	

	_onButtonPress = () => {
		const text = this.state.text.trim()
		const photo = this.state.photoSource
		this.setState({text: ''});
		this.setState({photoSource: {}});
		this.ref.add({
			message: text,
			photo: photo
		}).then(() => {
			Alert.alert("Message sent")
			console.log("text is --->", this.state.text.trim())
			
		}).catch((error) => {
			console.log(error);
		});

		
	}

	_onImageSelectButton = () => {
		const options = {
			title: 'Pick a photo',
			customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  			storageOptions: {
    			skipBackup: true,
    			path: 'images',
  			},
		};

		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response -->', response);
			if (response.didCancel) {
			    console.log('User cancelled image picker');
			} else if (response.error) {
			    console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
			    console.log('User tapped custom button: ', response.customButton);
			} else {
			    const source = response;

			    // You can also display the image using data:
    			// const source = { uri: 'data:image/jpeg;base64,' + response.data };

    			this.setState({photoSource: source});
  			}
		});
	}

	render() {
	    return (
		    //<DismissKeyboard>
		      <View style={styles.container}>
		      
		        <TextInput style={styles.textInput} placeholder='Write your messsage'
		       
					multiline={true} numberOfLines= {4}
					blurOnSubmit={true}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}/>
				<Image style={styles.welcome} source={{ uri: 'data:image/jpeg;base64,' + this.state.photoSource.data,}}
	            	style={{ width: 100, height: 100 }}/>

				<Button style={styles.welcome} title="Select Photo" onPress={this._onImageSelectButton}/>
		        <Button title="Send Message" onPress={this._onButtonPress}/>
		        
		      </View>
		    //</DismissKeyboard>
		    
	    );
  	}
}

const DismissKeyboard = ({children}) => {
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			{children}
		</TouchableWithoutFeedback>
	)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {flex:1, marginTop: 50, marginLeft: 15, fontSize: 20, borderColor: 'gray', borderWidth: 1,
				marginRight: 15, marginBottom: 300},
  welcome: {flex:1, marginTop: 50, marginLeft: 15, fontSize: 20, marginBottom: 20},
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});