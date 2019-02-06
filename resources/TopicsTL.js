import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Keyboard, Alert,FlatList,TouchableHighlight,ScrollView,Image} from 'react-native';
// import {createStackNavigator} from 'react-navigation';
import {List, ListItem, SearchBar} from 'react-native-elements';
import firebase from './Firebase';
import Timeline from './Timeline';

export default class TopicsTL extends Component {

	static navigationOptions = {
    	title: 'Topic Flashes',
    	headerStyle: { backgroundColor: '#dfdfdf', elevation: 0, shadowOpacity: 0, borderBottomWidth:0,},
  	};

  	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('messages');
		this.state = {
			dataMessages: [],
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
			this.setState({dataMessages: docData})
		})
		.catch((error) => {
			console.log(error)
		})
	}

	renderSeparator = () => {
		return (
      		<View style={{ height: 1, width: "78%", backgroundColor: "#CED0CE",marginLeft: "18%"}}
      		/>
    	);
	}

	renderHeader = () => {
		return <SearchBar placeholder="Search" lightTheme
			//inputStyle={{backgroundColor: '#dfdfdf'}}
			inputContainerStyle={{backgroundColor: '#D3D3D3'}}
			containerStyle={{backgroundColor: '#dfdfdf', borderWidth: 0, borderRadius: 5,
				}}
			placeholderTextColor={'grey'}
		 />;
	}

	renderFooter = () => {
		return null
	}

	render() {
		console.log("Rendering data--->",this.state.dataMessages);
		return (
			
			<View style={styles.container}>
				<FlatList data = {this.state.dataMessages} scrollEnabled={true}
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
									containerStyle={{ borderBottomWidth: 0 , backgroundColor:'#F0F0F0'}}/>
							</TouchableHighlight>
					}
					keyExtractor={(item, index) => index.toString()} 
					ItemSeparatorComponent={this.renderSeparator}
					ListHeaderComponent={this.renderHeader}
					ListFooterComponent={this.renderFooter}
				/>
			</View>
			
		);
		
	}
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0, borderBottomWidth: 0,borderBottomColor: 'red', flex:1,
    backgroundColor: '#dfdfdf'
  },
  listItemFullInputText: {
  	color: 'black', fontFamily: 'AppleSDGothicNeo-Bold', fontSize:20
  }
});