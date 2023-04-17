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
        <Stack.Screen name="Student" component={StudentPage} options={{
          title: 'Student Dashboard',
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            // fontSize: 18,
          },
                headerTitleContainerStyle: {justifyContent: 'center', alignItems: 'center'},
                headerStyle: {
                    backgroundColor: '#2F95D6',
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    height: 80
                },
                headerBackTitleStyle: {
                    color: 'transparent',
                },
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Lecturer" component={LecturerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


