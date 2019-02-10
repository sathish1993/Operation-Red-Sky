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
import Message from './resources/Message';
import Timeline from './resources/Timeline';
import TopicsTL from './resources/TopicsTL';
import MessageInfo from './resources/MessageInfo';
import BootScreen from './resources/BootScreen';
import LoginPage from './resources/LoginPage';
import SignUpPage from './resources/SignUpPage';
import SplashPage from './resources/SplashPage';
import {createBottomTabNavigator, createAppContainer, createStackNavigator,
	createSwitchNavigator } from 'react-navigation';


//check for login
const MainNavigator = createStackNavigator({
  
  BootScreen: { screen: BootScreen },
  LoginPage: { screen: LoginPage },
  SignUpPage: { screen: SignUpPage },
});
//--- end of login check

//---- for topic screen
const TabNavigator = createBottomTabNavigator({
  Timeline: {screen: Timeline},
  Message: { screen: Message },
});

const TLNavigator = createStackNavigator({
  Topics: { screen: TopicsTL },
  Timeline: { screen: TabNavigator },
  MessageInfo: { screen: MessageInfo },
} );
//------ end here

//---------------------------------- old logic
const FinalNavigator = createSwitchNavigator({
  Splash: SplashPage,
	Auth: MainNavigator,
	App: TLNavigator
}, {
	initialRouteName: 'Splash',
});

// const TabNavigator = createBottomTabNavigator({
//   Home: {screen: MainNavigator},
//   Message: { screen: Message },
// });

const App = createAppContainer(FinalNavigator);

export default App;
