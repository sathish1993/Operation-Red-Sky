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
		this.ref = firebase.firestore().collection('messages_check');
		this.state = {
			dataMessages: [],
			isReady: false
		}
		this._getDocumentData = this._getDocumentData.bind(this);
	}

	async _getDocumentData(topic) {
		
		const snapshot = await this.ref.where('topic', '==', topic.ref).get()
		const docData = snapshot.docs.map(doc => {
			return doc.data();
		});
		return docData
		
	}

	componentDidMount() {
		const {params} = this.props.navigation.state;
		console.log('topicName i clicked --> ', params)
		this._getDocumentData(params.topic)
		.then((docData) => {
			console.log(docData)
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
									console.log('Pressed me in Message Timeline-> ', item)
									this.props.navigation.navigate('MessageInfo',{payload: item})
								}}>
								<ListItem roundAvatar large leftAvatar={{
                                		source: { uri: item.message.urlToImage },
                                		title: item.message[0]
                                	}}

								title= {item.message.title} titleStyle={styles.listItemFullInputText} 
								//subtitle={item.message.url}
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

