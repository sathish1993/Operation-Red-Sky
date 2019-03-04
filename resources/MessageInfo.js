import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Image, Linking, TouchableHighlight, StatusBar} from 'react-native';

import Lightbox from 'react-native-lightbox';
import LinkPreview from 'react-native-link-preview';
import { BarIndicator } from 'react-native-indicators';
import YouTube from 'react-native-youtube'
import firebase from 'react-native-firebase';
import { createStackNavigator} from 'react-navigation';


import MessageInfoWebView from './MessageInfoWebView'

export default class MessageInfo extends Component {

	static navigationOptions = {
		title: 'Message',
		headerVisible: false,
    	headerTintColor: 'white',
		headerStyle: { backgroundColor: '#720e9e', elevation: 0, shadowOpacity: 0, borderBottomWidth:0,}
  	};

	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			previewData: '',
			gotData: false,
			likes: 0,
			youTubeVideo: false,
		}
	}

	// static navigationOptions = ({navigation}) => ({
 //    	title: MessageInfo,
 //  	});
 	_getPreview = () => {
 		
 		LinkPreview.getPreview('https://www.yahoo.com/news/trevor-noah-talks-jussie-smollett-170151784.html')
 		//LinkPreview.getPreview('https://www.youtube.com/watch?v=ruaAUbekM9Q')
    	.then(data => { console.log(data)
    			this.setState({
    				previewData: data,
    				gotData: true
    			});
    		}
    		
    		);
 	}

 	_redirectToURL = () => {
 		let url = this.state.previewData.url;
 		let youTubeCheck = 'youtube.com'
 		if(url.includes(youTubeCheck)){

 			console.log(url);
 			this.setState({youTubeVideo: true});
 			
 		} else {
 			this.props.navigation.navigate('MessageInfoWebView', {url: url})	
 		}
 		
 		

 	// 	Linking.canOpenURL(url).then(supported => {
  // 			if (!supported) {
  //   			console.log('Can\'t handle url: ' + url);
  // 			} else {
  //   			return Linking.openURL(url);
  // 			}
		// }).catch(err => console.error('An error occurred', err));
 	}

 	_handleLikes = () => {
 		console.log('Liked');
 		this.setState({likes: this.state.likes+1})
 	}

 	_checkForSource = () => {
 		if(!this.state.youTubeVideo) {
			return 	<View style = {{flex:1}}>
						<Image resizeMode={'cover'} source={{uri: this.state.previewData.images[0]}}
	            			style={styles.blogPanel}/>	        
	            		
	            	</View>
		} else {
			return <View style = {{flex:1}}>
				<YouTube
				videoId="KVZ-P-ZI6W4"   // The YouTube video ID
				apiKey='AIzaSyAvBbnU8nS5ECFJmzVraiuJspQR3R8J4mI'
				play={false}             // control playback of video with true/false
				fullscreen={true}       // control whether the video should play in fullscreen or inline
				loop={true}             // control whether the video should loop when ended
				style={styles.youTubeVideoPanel}
				/>
				

				</View>
		}
 	}

	render() {
		const {params} = this.props.navigation.state;
		//console.log('My photo--->', params.payload.photo.uri)
		console.log('previewData-->', this.state.previewData)
		if(!this.state.gotData) {
			return (
				<View style={styles.container}>
					<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>					
					{this._getPreview()}
					<BarIndicator count={5} size={50} color='#720e9e'/>
				</View>
			)
		}

		return(
			<View style = {styles.container}>
				<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>
				<Text style = {styles.title}> {this.state.previewData.title}</Text>
				<TouchableHighlight style={styles.previewImage} onPress={() => {this._redirectToURL();}}>
						{this._checkForSource()}
	            </TouchableHighlight>
	            <Text style = {styles.descriptionStyle}> {this.state.previewData.description}</Text>
	        {
	        	/*
	            <TouchableHighlight onPress = {() => {this._handleLikes()}}>
	            	<Text> {this.state.likes} Likes! </Text>
	            </TouchableHighlight>
				
			
				
					<Text style = {{fontSize:20}}>{params.payload.message} </Text>
					<Lightbox>
						<Image style={{height:500, marginTop: 50}} source={{uri: 'data:image/jpeg;base64,' + params.payload.photo.data}} />
					</Lightbox>
					
				*/
			}
				
			</View>
		);
	}
}


const styles = StyleSheet.create({
  descriptionStyle: {
  	marginTop:250, marginLeft:'10%', marginRight:'10%'
  },
  youTubeVideoPanel: {
  	alignSelf: 'stretch', height: 200
  },
  blogPanel: {
  	height: 200,
  },
  container: {
    flex:1, backgroundColor: '#F5F5F5'
  },
  title: {
  	fontFamily: 'OpenSans', fontSize:15, marginLeft: '10%', marginTop: '5%'
  },
  previewImage: {
  	borderColor: 'gray', borderWidth: 1, marginLeft: '10%', marginRight: '10%', 
  	marginTop: '10%'
  }
});
