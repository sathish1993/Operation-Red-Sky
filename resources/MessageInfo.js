import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';
import firebase from './Firebase';
import Lightbox from 'react-native-lightbox';

export default class MessageInfo extends Component {
	constructor(props) {
		super(props);
		console.log(props)
	}

	// static navigationOptions = ({navigation}) => ({
 //    	title: MessageInfo,
 //  	});

	render() {
		const {params} = this.props.navigation.state;
		console.log('My photo--->', params.payload.photo.uri)
		return(
			<View style = {{flex:1}}>
				<Text style = {{fontSize:20}}>{params.payload.message} </Text>
				<Lightbox>
					<Image style={{height:500, marginTop: 50}} source={{uri: 'data:image/jpeg;base64,' + params.payload.photo.data}} />
				</Lightbox>
			</View>
		);
	}
}

// export default withNavigation(MessageInfo);
