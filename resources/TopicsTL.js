import React, {Component} from 'react';
import {StyleSheet, Text, Button,View, TextInput, Keyboard, Alert,FlatList,TouchableHighlight,ActivityIndicator,
	Image,StatusBar, TouchableOpacity} from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { ListItem, SearchBar} from 'react-native-elements';
import SwipeUpDown from 'react-native-swipe-up-down';

import firebase from 'react-native-firebase';

import Timeline from './Timeline';
import FlatListComponent from './FlatListComponent';


export default class TopicsTL extends Component {

	static navigationOptions = {
    	title: 'Topics',
    	headerStyle: {backgroundColor: '#720e9e', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,},
    	headerTitleStyle: {color: '#F5F5F5',fontFamily: 'OpenSans-ExtraBold', fontSize:20,} ,
    	headerLeft: null,
    	headerRight: (
    		<Button
        		onPress={() => {
        			firebase.auth().signOut()
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

	_renderData = () => {
		return null;
	}

	render() {
		console.log("Rendering data--->",this.state.isReady);

		if (!this.state.isReady) {
	      //Loading View while data is loading
	      	return (
	        <View style={styles.container}>
	        	<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>
				{	        
	    //     	<SearchBar round placeholder="Search" lightTheme
					// //inputStyle={{backgroundColor: '#dfdfdf'}}
					// inputContainerStyle={styles.searchBarInputContainerStyle}
					// containerStyle={styles.searchBarContainerStyle}
					// placeholderTextColor={'grey'}
				 // /> 
				}
	          	<BarIndicator count={5} size={50} color='#720e9e'/>

	        </View>
	      );
	    }

		return (
			
			
			<View style = {styles.container}>
			
				<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>
					<SearchBar round placeholder="Search" lightTheme
						//inputStyle={{backgroundColor: '#dfdfdf'}}
						inputContainerStyle={styles.searchBarInputContainerStyle}
						containerStyle={styles.searchBarContainerStyle}
						placeholderTextColor={'grey'}
					 />
					<FlatList contentContainerStyle= {{paddingBottom: 50}}
						data = {this.state.dataMessages} scrollEnabled={true}
						renderItem = {
							({item}) =>
								

								<TouchableHighlight onPress={() => { 
										console.log('Pressed me -> ', item)
										this.props.navigation.navigate('Timeline')
									}}>
									
									
								<ListItem roundAvatar large leftAvatar={{
	                                source: { uri: 'data:image/jpeg;base64,' + item.photo.data },
	                                title: item.message[0]
	                                }}

								title= {item.message} titleStyle={styles.listItemFullInputText} 
								//subtitle={item.message}
								containerStyle={styles.flatListContainerStyle}/>
								
										
								</TouchableHighlight>
								
							
						}
						keyExtractor={(item, index) => index.toString()} 
						ItemSeparatorComponent={this.renderSeparator}
						ListFooterComponent={this.renderFooter}
					/>
					
						<Text style={styles.swipeUpDownTextStyle} onPress={() => this.swipeUpDownRef.showFull()}>
		          			{' '}
		          			
		        		</Text>
						<SwipeUpDown
							hasRef={ref => (this.swipeUpDownRef = ref)}
							// itemMini={
							//   <Text style={styles.welcome}>Welcome to React Native!</Text>
							// }
							itemFull={
								<Text style={styles.instructions}>
								Welcome to component {'\n'} Swipe Up Down on React Native
								</Text>
							}
							onShowMini={() => console.log('mini')}
							onShowFull={() => console.log('full')}
							disablePressToShow={false}
							style={{ backgroundColor: 'yellow' }}
							animation="easeInEaseOut"
							swipeHeight={100}
						/>
	    			
					
			</View>
			
		);
		
	}
}


const styles = StyleSheet.create({

	swipeUpDownTextStyle: {
		position: 'absolute', bottom: 0 , textAlignVertical: 'center',fontWeight: 'bold',
    	textAlign: 'center' , width:'95%', height: 25, fontSize: 18, backgroundColor:'#8e12c6',
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