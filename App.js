import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './src/screens/LoginPage';
import StudentPage from './src/screens/StudentPage';
import LecturerPage from './src/screens/LecturerPage';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage}
          options={{ headerShown: false }} />
        <Stack.Screen name="Student" component={StudentPage} options={{ headerShown: false }} />
        <Stack.Screen name="Lecturer" component={LecturerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


