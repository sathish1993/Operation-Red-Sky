import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Keyboard, Alert,FlatList,TouchableHighlight,ScrollView,Image} from 'react-native';
// import {createStackNavigator} from 'react-navigation';
import {List, ListItem, Avatar} from 'react-native-elements';
import firebase from './Firebase';
import MessageInfo from './MessageInfo';

export default class Timeline extends Component {

	static navigationOptions = {
    	title: 'Timeline',
    	headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth:0,},
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
      		<View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE",marginLeft: "0%"}}
      		/>
    	);
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
									this.props.navigation.navigate('MessageInfo',{payload: item})
								}}>
								<ListItem

								title= {item.message} titleStyle={styles.listItemFullInputText} 
								//subtitle={item.message}
									containerStyle={{ borderBottomWidth: 0 }}/>
							</TouchableHighlight>
					}
					keyExtractor={(item, index) => index.toString()} 
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</View>
			
		);
		
	}
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0, borderBottomWidth: 0,borderBottomColor: 'red', flex:1
  },
  listItemFullInputText: {
  	color: 'black', fontFamily: 'AppleSDGothicNeo-Bold', fontSize:20
  }
});

