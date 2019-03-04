import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Keyboard, Alert,FlatList,
		TouchableHighlight,ScrollView,Image, StatusBar} from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import {ListItem} from 'react-native-elements';
import firebase from 'react-native-firebase';
import MessageInfo from './MessageInfo';

export default class Timeline extends Component {

	static navigationOptions = {
    	title: 'Timeline',
    	headerTintColor: 'white',	
    	headerStyle: { backgroundColor: '#720e9e', elevation: 0, shadowOpacity: 0, borderBottomWidth:0,},
    	headerTitleStyle: {color: '#F5F5F5',fontFamily: 'OpenSans', fontSize:20,} ,
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

	renderSeparator = () => {
		return (
      		<View style={styles.renderSeparatorStyle}
      		/>
    	);
	}

	render() {
		console.log("Rendering data--->",this.state.dataMessages);
		
		if (!this.state.isReady) {
			return(
				<View style={styles.container}>
		        	
		        	<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>
		          	<BarIndicator count={5} size={50} color='#720e9e'/>

		        </View>
	      );
		      
	    }

		return (
			<View style={styles.container}>
			<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>
				<FlatList data = {this.state.dataMessages} scrollEnabled={true}
					renderItem = {
						({item}) =>
							<TouchableHighlight onPress={() => { 
									console.log('Pressed me -> ', item)
									this.props.navigation.navigate('MessageInfo',{payload: item})
								}}>
								<ListItem roundAvatar large leftAvatar={{
                                		source: { uri: 'data:image/jpeg;base64,' + item.photo.data },
                                		title: item.message[0]
                                	}}

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
    borderTopWidth: 0, borderBottomWidth: 0,borderBottomColor: 'red', flex:1, backgroundColor: '#F5F5F5'
  },
  renderSeparatorStyle: {
		height: 1, width: "100%", backgroundColor: "#CED0CE",marginLeft: "18%"
  },
  listItemFullInputText: {
  	color: 'black', fontFamily: 'OpenSans', fontSize:15
  }
});

