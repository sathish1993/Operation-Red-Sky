import React, {Component} from 'react';
import SwipeUpDown from 'react-native-swipe-up-down';

import Timeline from './Timeline';
import {StyleSheet, Text, Button,View, TextInput, Keyboard, Alert,FlatList,TouchableHighlight,ActivityIndicator,
	Image,StatusBar, TouchableOpacity} from 'react-native';
import { ListItem, SearchBar} from 'react-native-elements';

export default class FlatListComponent extends Component {

	constructor(props) {
		super(props);
	}

	renderSeparator = () => {
		return (
      		<View style={styles.renderSeparatorStyle}/>
    	);
	}


	render() {
		return null;
	}
}

const styles = StyleSheet.create({

	swipeUpDownTextStyle: {
		position: 'absolute', bottom: 0 , textAlignVertical: 'center',fontWeight: 'bold',
    	textAlign: 'center' , width:'95%', height: 35, fontSize: 18, backgroundColor:'#8e12c6',
    	marginLeft: '2.5%', marginRight: '2.5%', borderRadius:5, overflow:"hidden"
	},
	renderSeparatorStyle: {
		height: 1, width: "100%", backgroundColor: "#CED0CE",marginLeft: "18%"
	},
	flatListContainerStyle: {
		borderBottomWidth: 0 , backgroundColor:'#F5F5F5'
	},
	searchBarInputContainerStyle: {
		backgroundColor: '#D3D3D3'
	},
	searchBarContainerStyle: {
		backgroundColor: '#F5F5F5', borderWidth: 0, borderRadius: 5,
						elevation: 0, shadowOpacity: 0, borderBottomWidth:0,
	},
  container: {
    borderTopWidth: 0, borderBottomWidth: 0,borderBottomColor: 'red', flex:1,
    backgroundColor: '#F5F5F5'
  },
  listItemFullInputText: {
  	color: 'black', fontFamily: 'OpenSans', fontSize:15
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }

});