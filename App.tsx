import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/RegisterScreen';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import HDTT from './src/HDTT';
import TTCN from './src/TTCN';
import QLVD from './src/QLVD';
import BTSK from './src/BTSK';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />  
        <Stack.Screen name="HDTT" component={HDTT} />  
        <Stack.Screen name="TTCN" component={TTCN} />  
        <Stack.Screen name="QLVD" component={QLVD} />  
        <Stack.Screen name="BTSK" component={BTSK} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
