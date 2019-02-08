import React, {Component} from 'react';
import SwipeUpDown from 'react-native-swipe-up-down';

import firebase from './Firebase';
import Timeline from './Timeline';
import {StyleSheet, Text, Button,View, TextInput, Keyboard, Alert,FlatList,TouchableHighlight,ActivityIndicator,
	Image,StatusBar, TouchableOpacity} from 'react-native';
import { ListItem, SearchBar} from 'react-native-elements';

export default class FlatListComponent extends Component {

	

	renderSeparator = () => {
		return (
      		<View style={styles.renderSeparatorStyle}/>
    	);
	}


	render() {
		return (
			<View style={styles.container}>

    			<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>
				<SearchBar round placeholder="Search" lightTheme
					//inputStyle={{backgroundColor: '#dfdfdf'}}
					inputContainerStyle={styles.searchBarInputContainerStyle}
					containerStyle={styles.searchBarContainerStyle}
					placeholderTextColor={'grey'}
				 />
				<FlatList contentContainerStyle= {{paddingBottom: 50}}
					data = {this.props.dataMessages} scrollEnabled={true}
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