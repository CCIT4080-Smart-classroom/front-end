import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import AllCoursesScreen from './CourseScreen';
import AssignmentScreen from './AssignmentScreen';
import ScheduleScreen from './ScheduleScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

const StudentPage = ({route }) => {
  const { username, password } = route.params;
  return (
    <Tab.Navigator
      sceneAnimationEnabled={true}
    >
      <Tab.Screen 
        name="Courses" 
        component={AllCoursesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-book" size={24} color={color} />
          ),
        }}
        initialParams={{ 
          username: username
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
        initialParams={{ 
          username: username,
          password: password
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

export default StudentPage;
