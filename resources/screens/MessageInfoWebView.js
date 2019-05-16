import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { WebView } from "react-native-webview";
import { BarIndicator } from 'react-native-indicators';

export default class MessageInfoWebView extends Component {

	constructor(props) {
		super(props);
		this._getTitle = this._getTitle.bind(this);
	}

	static navigationOptions = ({navigation}) => ({
		title: navigation.state.params.url,
		headerVisible: false,
    	headerTintColor: 'white',
		headerStyle: { backgroundColor: '#720e9e', elevation: 0, shadowOpacity: 0, borderBottomWidth:0,}
  	});

	_getTitle(url) {
		var paths = url.split('/')
		for(index in paths) {
			var word = paths[index]
			if(word.includes('.com')) {
				return word.substring((word.indexOf('.'))+1);
			}
		}
		return 'Message View';
	}

  	_renderLoadingView() {
  		return (
			<BarIndicator count={5} size={50} color='#720e9e'/>
  		);
  	}

	render() {
		const {params} = this.props.navigation.state;
		let redirectURL  = params.url;
		
		return (
			<View style = {{ flex: 1}}>
				<WebView
					renderLoading={this._renderLoadingView}
					startInLoadingState={true}
					automaticallyAdjustContentInsets={false}
					source={{uri:redirectURL}}
					javaScriptEnabled={true}
					domStorageEnabled={true}
				/>
			</View>
		);
	}
}