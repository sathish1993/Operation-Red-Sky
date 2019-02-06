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
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';


const TLNavigator = createStackNavigator({
  Topics: { screen: TopicsTL },
  Timeline: { screen: Timeline },
  MessageInfo: { screen: MessageInfo },
} );

// const MainNavigator = createStackNavigator({
//   Timeline: { screen: TLNavigator },
//   MessageInfo: { screen: MessageInfo },
// } );

// const TabNavigator = createBottomTabNavigator({
//   Home: {screen: MainNavigator},
//   Message: { screen: Message },
// });

const App = createAppContainer(TLNavigator);

export default App;
