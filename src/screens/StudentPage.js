import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AllCoursesScreen from './CourseScreen';
import AssignmentScreen from './AssignmentScreen';
import ScheduleScreen from './ScheduleScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const StudentPage = ({ route }) => {
  const { username, password } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1976D2",
        tabBarInactiveTintColor: "#64B5F6",
        tabBarStyle: {
          backgroundColor: '#FFF',
          height: 64,
          margin: 'auto'
        },
        tabBarItemStyle: {
          height: 54,
          backgroundColor: '#FFF',
          borderRadius: 16,
          top: 4,
          marginHorizontal: 3,
          width: 117,

        },
        tabBarLabelStyle: {
          fontSize: 14,
        }
      }}
      initialRouteName='Schedule'
    >
      <Tab.Screen
        name="Courses"
        component={AllCoursesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-book" size={24} color={color} />
          ),
          headerShown: false
        }}
        initialParams={{
          username: username
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-calendar" size={24} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Assignments"
        component={AssignmentScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-document-text" size={24} color={color} />
          ),
          headerShown: false
        }}
        initialParams={{
          username: username,
          password: password
        }}
      />
    </Tab.Navigator>

  );
};

export default StudentPage;
