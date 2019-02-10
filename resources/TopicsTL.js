import React, {Component} from 'react';
import {StyleSheet, Text, Button,View, TextInput, Keyboard, Alert,FlatList,TouchableHighlight,ActivityIndicator,
	Image,StatusBar, TouchableOpacity} from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { ListItem, SearchBar} from 'react-native-elements';
import SwipeUpDown from 'react-native-swipe-up-down';

import firebase1 from 'react-native-firebase';
import firebase from './Firebase';
import Timeline from './Timeline';
import FlatListComponent from './FlatListComponent';


export default class TopicsTL extends Component {

	static navigationOptions = {
    	title: 'Topics',
    	headerStyle: {backgroundColor: '#3b5998', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,},
    	headerTitleStyle: {color: '#F5F5F5',fontFamily: 'OpenSans-ExtraBold', fontSize:20,} ,
    	headerLeft: null,
    	headerRight: (
    		<Button
        		onPress={() => {
        			firebase1.auth().signOut()
        		}}
        		title="Sign Out"
        		color="#F5F5F5"
      		/>
    	),
  	};

  	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('messages');
		this.state = {
			dataMessages: [],
			isReady: false
		}
		this._getDocumentData = this._getDocumentData.bind(this);
	}


	async _getDocumentData () {
		const snapshot = await this.ref.get()
		const docData = snapshot.docs.map(doc => doc.data());
		return docData
		
	}

	componentDidMount() {

		console.log('Checkign for tab change')
		this._getDocumentData()
		.then((docData) => {
			//temp = docData.map(docData => docData.message)

			this.setState({isReady:true, dataMessages: docData})
		})
		.catch((error) => {
			console.log(error)
		})

	}

	

	render() {
		console.log("Rendering data--->",this.state.dataMessages);

		if (!this.state.isReady) {
	      //Loading View while data is loading
	      	return (
	        <View style={styles.container}>
	        	<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>
	        	<SearchBar round placeholder="Search" lightTheme
					//inputStyle={{backgroundColor: '#dfdfdf'}}
					inputContainerStyle={styles.searchBarInputContainerStyle}
					containerStyle={styles.searchBarContainerStyle}
					placeholderTextColor={'grey'}
				 />
	          	<BarIndicator count={5} size={50} color='#3b5998'/>

	        </View>
	      );
	    }

		return (
			
			<FlatListComponent dataMessages={this.state.dataMessages} navigation={this.props.navigation}/>
			
			
		);
		
	}
}


const styles = StyleSheet.create({

	swipeUpDownTextStyle: {
		position: 'absolute', bottom: 0 , textAlignVertical: 'center',fontWeight: 'bold',
    	textAlign: 'center' , width:'95%', height: 25, fontSize: 18, backgroundColor:'#3b5998',
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