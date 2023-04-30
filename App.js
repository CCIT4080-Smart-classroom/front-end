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
        <Stack.Screen name="Lecturer" component={LecturerPage} options={{
          headerTintColor: '#ffffff',
          headerTitleContainerStyle: { justifyContent: 'center', alignItems: 'center' },
          headerStyle: {
            backgroundColor: '#2196F3',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            height: 70,
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84,
            elevation: 15,
          },
          headerTitleAlign: 'center',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


