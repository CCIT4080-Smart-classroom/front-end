import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './src/screens/LoginPage';
import HomePage from './src/screens/HomePage';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">  
        <Stack.Screen name="Login" component={LoginPage} />  
        <Stack.Screen name="Homepage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


