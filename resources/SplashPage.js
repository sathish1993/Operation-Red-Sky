import React, {Component} from 'react';
import {StyleSheet, Text, Image,View, TextInput, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import BootScreen from './BootScreen';
import firebase from 'react-native-firebase';

export default class SplashPage extends Component {

	static navigationOptions = {
    	headerStyle: {backgroundColor: '#FFF', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,},
    	gesturesEnabled: false,
  	};

  	constructor(props) {
  		super(props);
    	this.unsubscribe = null;
  	}

  	componentDidMount() {
  		this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
  			console.log("Current User-------->", user);
  			this.props.navigation.navigate(user ? 'App' : 'BootScreen')
  		})
  	}

  	componentWillUnmount() {
    	 if(this.unsubscribe) this.unsubscribe();
  	}

	render() {
		return (
			<View style = {styles.container}>
				<View style={styles.logoContainer}>
					<Image style={styles.logo}
						source = {require('./images/flash2.png')}
					/>
					{//<Text style={styles.title}> Voice of Madras from Austin </Text>
					}
				</View>	
			</View>

		);
	}
}

const styles = StyleSheet.create({
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
});