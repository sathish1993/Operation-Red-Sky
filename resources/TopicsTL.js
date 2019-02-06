import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Keyboard, Alert,FlatList,TouchableHighlight,ActivityIndicator,Imag,
		StatusBar} from 'react-native';
import {
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
  PulseIndicator
} from 'react-native-indicators';
import {List, ListItem, SearchBar} from 'react-native-elements';
import firebase from './Firebase';
import Timeline from './Timeline';

export default class TopicsTL extends Component {

	static navigationOptions = {
    	title: 'Topic Flashes',
    	headerStyle: { backgroundColor: '#3b5998', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,},
    	headerTitleStyle: { color: '#F5F5F5' },
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
      		<View style={{ height: 1, width: "78%", backgroundColor: "#CED0CE",marginLeft: "18%"}}
      		/>
    	);
	}

	renderFooter = () => {
		return null
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
					inputContainerStyle={{backgroundColor: '#D3D3D3'}}
					containerStyle={{backgroundColor: '#F5F5F5', borderWidth: 0, borderRadius: 5,
						elevation: 0, shadowOpacity: 0, borderBottomWidth:0,}}
					placeholderTextColor={'grey'}
				 />
	          	<BarIndicator count={5} size={50} color='#3b5998'/>
	        </View>
	      );
	    }

		return (
			
			<View style={styles.container}>
    			<StatusBar backgroundColor="blue" barStyle="light-content" hidden={false}/>
				<SearchBar round placeholder="Search" lightTheme
					//inputStyle={{backgroundColor: '#dfdfdf'}}
					inputContainerStyle={{backgroundColor: '#D3D3D3'}}
					containerStyle={{backgroundColor: '#F5F5F5', borderWidth: 0, borderRadius: 5,
						borderBottomWidth:0}}
					placeholderTextColor={'grey'}
				 />
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
										containerStyle={{ borderBottomWidth: 0 , backgroundColor:'#F5F5F5'}}/>
							
									
							</TouchableHighlight>
							
						
					}
					keyExtractor={(item, index) => index.toString()} 
					ItemSeparatorComponent={this.renderSeparator}
					ListFooterComponent={this.renderFooter}
				/>
				
			</View>
			
			
		);
		
	}
}


const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0, borderBottomWidth: 0,borderBottomColor: 'red', flex:1,
    backgroundColor: '#F5F5F5'
  },
  listItemFullInputText: {
  	color: 'black', fontFamily: 'AppleSDGothicNeo-Bold', fontSize:20
  }
});