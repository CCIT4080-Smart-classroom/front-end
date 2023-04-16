import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import AllCoursesScreen from './CourseScreen';
import AssignmentScreen from './AssignmentScreen';
import ScheduleScreen from './ScheduleScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Courses" 
        component={AllCoursesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-book" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Assignments" 
        component={AssignmentScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-document-text" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-calendar" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
