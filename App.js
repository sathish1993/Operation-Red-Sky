/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Keyboard, Alert} from 'react-native';
//import Message from './resources/screens/Message';
import Timeline from './resources/screens/Timeline';
import TopicsTL from './resources/screens/TopicsTL';
import MessageInfo from './resources/screens/MessageInfo';
import BootScreen from './resources/screens/BootScreen';
import LoginPage from './resources/screens/LoginPage';
import SignUpPage from './resources/screens/SignUpPage';
import SplashPage from './resources/screens/SplashPage';
import MessageInfoWebView from './resources/screens/MessageInfoWebView';
import {createBottomTabNavigator, createAppContainer, createStackNavigator,
	createSwitchNavigator } from 'react-navigation';


//start of final screen stack
const SplashNavigator = createStackNavigator({
  SplashPage: { screen: SplashPage },
});
//check for login
const MainNavigator = createStackNavigator({
  Splash: {screen: SplashNavigator},
  BootScreen: { screen: BootScreen },
  LoginPage: { screen: LoginPage },
  SignUpPage: { screen: SignUpPage },
}, {
  navigationOptions: { header: null }
});
//--- end of login check

//---- for topic screen
// const TabNavigator = createBottomTabNavigator({
//   Timeline: {screen: Timeline},
//   Message: { screen: Message },
// });

// const MessageStack = createStackNavigator({
//     MessageInfo: {screen: MessageInfo},
    
//   }, 
//   );

const TLNavigator = createStackNavigator({
  Topics: { screen: TopicsTL },
  Timeline: { screen: Timeline },
  MessageInfo: { screen: MessageInfo },
  MessageInfoWebView: {screen: MessageInfoWebView}
}, {headerMode: 'float'} );
//------ end here

//---------------------------------- old logic
const FinalNavigator = createSwitchNavigator({
  //Splash: SplashNavigator,
	Auth: MainNavigator,
	App: TLNavigator
}, {
	initialRouteName: 'Auth',
});
//end of final screen stack


// const MessageStack = createStackNavigator({
//     MessageInfo: {screen: MessageInfo},
//     MessageInfoWebView: {screen: MessageInfoWebView}
//   },
//   { mode: 'modal' } );


// const TabNavigator = createBottomTabNavigator({
//   Home: {screen: MessageStack},
//   Message: { screen: Message },
// });

const App = createAppContainer(FinalNavigator);

export default App;
