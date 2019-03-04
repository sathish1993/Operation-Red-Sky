import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { WebView } from "react-native-webview";
import { BarIndicator } from 'react-native-indicators';

export default class MessageInfoWebView extends Component {

	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		
		headerVisible: false,
    	headerTintColor: 'white',
		headerStyle: { backgroundColor: '#720e9e', elevation: 0, shadowOpacity: 0, borderBottomWidth:0,}
  	};

  	_renderLoadingView() {
  		return (
			<BarIndicator count={5} size={50} color='#720e9e'/>
  		);
  	}

	render() {
		const {params} = this.props.navigation.state;
		let redirectURL  = params.url;
		console.log(redirectURL)
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